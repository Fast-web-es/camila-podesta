import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';

const githubApi = 'https://api.github.com';

function unauthorized() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

function getConfig(request: NextRequest, portfolio: string) {
  const expectedToken = process.env.PORTFOLIO_ADMIN_TOKEN;
  const receivedToken = request.headers.get('x-admin-token');
  const session = getSession(request);
  const sessionAuthorized = session?.portfolio === portfolio || session?.portfolio === '*';

  if ((!expectedToken || !receivedToken || receivedToken !== expectedToken) && !sessionAuthorized) {
    return null;
  }

  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const token = process.env.GITHUB_TOKEN;
  const branch = process.env.GITHUB_BRANCH || 'main';

  if (!owner || !repo || !token) return null;
  return { owner, repo, token, branch };
}

function contentPath(request: NextRequest) {
  const portfolio = request.nextUrl.searchParams.get('portfolio') || 'marcos';
  if (!/^[a-z0-9-]+$/.test(portfolio)) return null;
  return `content/${portfolio}/content.json`;
}

async function githubRequest(
  config: NonNullable<ReturnType<typeof getConfig>>,
  path: string,
  init?: RequestInit
) {
  return fetch(`${githubApi}/repos/${config.owner}/${config.repo}/contents/${path}`, {
    ...init,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${config.token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      ...(init?.headers || {}),
    },
    cache: 'no-store',
  });
}

export async function GET(request: NextRequest) {
  const path = contentPath(request);
  const portfolio = request.nextUrl.searchParams.get('portfolio') || 'marcos';
  const config = getConfig(request, portfolio);
  if (!config || !path) return unauthorized();

  const response = await githubRequest(config, `${path}?ref=${config.branch}`);
  if (!response.ok) {
    return NextResponse.json({ error: 'Content file not found' }, { status: response.status });
  }

  const file = await response.json();
  const content = Buffer.from(file.content.replace(/\n/g, ''), 'base64').toString('utf8');
  return NextResponse.json({ content: JSON.parse(content), sha: file.sha });
}

export async function PUT(request: NextRequest) {
  const path = contentPath(request);
  const portfolio = request.nextUrl.searchParams.get('portfolio') || 'marcos';
  const config = getConfig(request, portfolio);
  if (!config || !path) return unauthorized();

  const body = await request.json();
  if (!body.content || typeof body.content !== 'object') {
    return NextResponse.json({ error: 'Invalid content' }, { status: 400 });
  }

  const current = await githubRequest(config, `${path}?ref=${config.branch}`);
  const currentFile = current.ok ? await current.json() : null;
  const encoded = Buffer.from(`${JSON.stringify(body.content, null, 2)}\n`).toString('base64');

  const response = await githubRequest(config, path, {
    method: 'PUT',
    body: JSON.stringify({
      message: `Update ${path}`,
      content: encoded,
      branch: config.branch,
      ...(currentFile?.sha ? { sha: currentFile.sha } : {}),
    }),
  });

  if (!response.ok) {
    return NextResponse.json({ error: 'Could not save content' }, { status: response.status });
  }

  return NextResponse.json({ ok: true });
}

