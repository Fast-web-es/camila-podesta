import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { randomUUID } from 'node:crypto';

export const runtime = 'nodejs';

function authorized(request: NextRequest, portfolio: string) {
  const legacy = process.env.PORTFOLIO_ADMIN_TOKEN;
  const session = getSession(request);
  return Boolean(
    (legacy && request.headers.get('x-admin-token') === legacy) ||
    session?.portfolio === portfolio ||
    session?.portfolio === '*'
  );
}

export async function PUT(request: NextRequest) {
  const portfolio = request.nextUrl.searchParams.get('portfolio') || 'marcos';
  if (!/^[a-z0-9-]+$/.test(portfolio) || !authorized(request, portfolio)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { content, files = [], removedImages = [] } = await request.json();
  if (!content || !Array.isArray(content.projects) || !Array.isArray(files) || !Array.isArray(removedImages)) {
    return NextResponse.json({ error: 'Invalid publish payload' }, { status: 400 });
  }

  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const token = process.env.GITHUB_TOKEN;
  const branch = process.env.GITHUB_BRANCH || 'main';
  if (!owner || !repo || !token) return NextResponse.json({ error: 'GitHub is not configured' }, { status: 503 });

  const api = `https://api.github.com/repos/${owner}/${repo}`;
  const headers = {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${token}`,
    'X-GitHub-Api-Version': '2022-11-28',
    'Content-Type': 'application/json',
  };
  const github = (path: string, init?: RequestInit) => fetch(`${api}${path}`, { ...init, headers, cache: 'no-store' });

  const refResponse = await github(`/git/ref/heads/${branch}`);
  if (!refResponse.ok) return NextResponse.json({ error: 'Could not read GitHub branch' }, { status: refResponse.status });
  const ref = await refResponse.json();
  const commitResponse = await github(`/git/commits/${ref.object.sha}`);
  const commit = await commitResponse.json();

  const safeFiles = files.filter((file: { projectId?: string; filename?: string; content?: string }) =>
    /^[a-z0-9-]+$/.test(String(file.projectId)) &&
    typeof file.content === 'string' && /^data:image\/(jpeg|png|webp|gif);base64,/.test(file.content)
  );
  if (safeFiles.some((file: { content: string }) => file.content.split(',')[1].length > 14_000_000)) {
    return NextResponse.json({ error: 'Image is too large' }, { status: 400 });
  }

  const tree: Array<{ path: string; mode: '100644'; type: 'blob'; sha: string | null }> = [];
  const publishedProjects = content.projects.map((project: { id: string; images: string[] }) => ({ ...project, images: [...project.images] }));

  for (const file of safeFiles) {
    const safeName = String(file.filename || 'image.jpg').toLowerCase().replace(/[^a-z0-9.]+/g, '-');
    const filePath = `public/images/${portfolio}/${file.projectId}/${randomUUID()}-${safeName}`;
    const blobResponse = await github('/git/blobs', {
      method: 'POST',
      body: JSON.stringify({ content: file.content.split(',')[1], encoding: 'base64' }),
    });
    if (!blobResponse.ok) return NextResponse.json({ error: 'Could not upload image' }, { status: blobResponse.status });
    const blob = await blobResponse.json();
    tree.push({ path: filePath, mode: '100644', type: 'blob', sha: blob.sha });
    const project = publishedProjects.find((candidate: { id: string }) => candidate.id === file.projectId);
    if (project) {
      project.images = project.images.map((image: string) => image === file.placeholder ? `/images/${portfolio}/${file.projectId}/${filePath.split('/').pop()}` : image);
    }
  }

  for (const image of removedImages) {
    if (typeof image !== 'string' || !image.startsWith(`/images/${portfolio}/`)) continue;
    tree.push({ path: `public${image}`, mode: '100644', type: 'blob', sha: null });
  }

  const contentBlob = await github('/git/blobs', {
    method: 'POST',
    body: JSON.stringify({ content: `${JSON.stringify({ ...content, projects: publishedProjects }, null, 2)}\n`, encoding: 'utf-8' }),
  });
  if (!contentBlob.ok) return NextResponse.json({ error: 'Could not prepare content' }, { status: contentBlob.status });
  const contentBlobData = await contentBlob.json();
  tree.push({ path: `content/${portfolio}/content.json`, mode: '100644', type: 'blob', sha: contentBlobData.sha });

  const treeResponse = await github('/git/trees', { method: 'POST', body: JSON.stringify({ base_tree: commit.tree.sha, tree }) });
  const newTree = await treeResponse.json();
  const newCommitResponse = await github('/git/commits', { method: 'POST', body: JSON.stringify({ message: `Update ${portfolio} portfolio`, tree: newTree.sha, parents: [ref.object.sha] }) });
  const newCommit = await newCommitResponse.json();
  const updateResponse = await github(`/git/refs/heads/${branch}`, { method: 'PATCH', body: JSON.stringify({ sha: newCommit.sha, force: false }) });
  if (!updateResponse.ok) return NextResponse.json({ error: 'Could not publish changes' }, { status: updateResponse.status });

  return NextResponse.json({ ok: true, content: { ...content, projects: publishedProjects } });
}

