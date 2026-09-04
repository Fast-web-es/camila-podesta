'use client';

import { useEffect, useMemo, useState } from 'react';
import { editableProjects as initialProjects, settings as initialSettings } from '@/content/portfolio';
import { portfolioId, portfolioName } from '@/config/portfolio';
import { dashboardCategories } from '@/config/dashboard';
import type { EditableProject, PortfolioSettings } from '@/types';

const STORAGE_KEY = `${portfolioId}-portfolio-admin-projects`;
const SETTINGS_STORAGE_KEY = `${portfolioId}-portfolio-admin-settings`;
type PendingUpload = { projectId: string; filename: string; content: string; placeholder: string };

export default function AdminPage() {
  const [projects, setProjects] = useState<EditableProject[]>(initialProjects);
  const [portfolioSettings, setPortfolioSettings] = useState<PortfolioSettings>(initialSettings);
  const [selectedId, setSelectedId] = useState(initialProjects[0]?.id ?? '');
  const [hasChanges, setHasChanges] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [pendingUploads, setPendingUploads] = useState<PendingUpload[]>([]);
  const [removedImages, setRemovedImages] = useState<string[]>([]);
  const [saveError, setSaveError] = useState('');
  const [showPublishConfirm, setShowPublishConfirm] = useState(false);
  const [showPublishedNotice, setShowPublishedNotice] = useState(false);

  const authenticate = async (loginEmail: string, loginPassword: string) => {
    setAuthError('');
    try {
      const login = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword }),
      });
      if (!login.ok) throw new Error('Invalid email or password');
      const response = await fetch(`/api/admin/content?portfolio=${portfolioId}`);
      if (!response.ok) throw new Error('Could not load portfolio');
      const result = await response.json();
      const remoteProjects = Array.isArray(result.content?.projects) && result.content.projects.length
        ? result.content.projects
        : initialProjects;
      const draft = window.localStorage.getItem(STORAGE_KEY);
      const settingsDraft = window.localStorage.getItem(SETTINGS_STORAGE_KEY);
      const nextProjects = draft ? JSON.parse(draft) : remoteProjects;
      setProjects(nextProjects);
      setPortfolioSettings(settingsDraft ? JSON.parse(settingsDraft) : (result.content?.settings ?? initialSettings));
      setSelectedId(nextProjects[0]?.id ?? '');
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextProjects));
      setAuthenticated(true);
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'Could not authenticate');
    }
  };

  useEffect(() => {
    fetch(`/api/admin/content?portfolio=${portfolioId}`)
      .then(async (response) => {
        if (!response.ok) return;
        const result = await response.json();
        if (Array.isArray(result.content?.projects) && result.content.projects.length) {
          setProjects(result.content.projects);
          setSelectedId(result.content.projects[0]?.id ?? '');
        }
        if (result.content?.settings) setPortfolioSettings(result.content.settings);
        setAuthenticated(true);
      })
      .catch(() => undefined);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const warnBeforeLeaving = (event: BeforeUnloadEvent) => {
      if (!hasChanges) return;
      event.preventDefault();
      event.returnValue = '';
    };
    window.addEventListener('beforeunload', warnBeforeLeaving);
    return () => window.removeEventListener('beforeunload', warnBeforeLeaving);
  }, [hasChanges]);

  const selectedProject = useMemo(
    () => projects.find((project) => project.id === selectedId),
    [projects, selectedId]
  );

  const updateSelected = (changes: Partial<EditableProject>) => {
    setProjects((current) =>
      current.map((project) =>
        project.id === selectedId ? { ...project, ...changes } : project
      )
    );
    setHasChanges(true);
  };

  const updateSettings = (changes: Partial<PortfolioSettings>) => {
    setPortfolioSettings((current) => ({ ...current, ...changes }));
    setHasChanges(true);
  };

  const saveDraft = () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(portfolioSettings));
    setStatusMessage('Draft saved on this device');
  };

  const publishChanges = () => {
    const pendingBytes = pendingUploads.reduce((total, upload) => total + upload.content.length, 0);
    if (pendingBytes > 3_500_000) {
      setSaveError('The selected images are too large together. Publish them in smaller batches.');
      return;
    }
    setSaving(true);
    setSaveError('');
    const uploadTokens = new Map(pendingUploads.map((upload, index) => [upload.placeholder, `__upload_${index}__`]))
    const publishProjects = projects.map((project) => ({
      ...project,
      thumbnail: uploadTokens.get(project.thumbnail) ?? project.thumbnail,
      images: project.images.map((image) => uploadTokens.get(image) ?? image),
    }));
    const content = { settings: portfolioSettings, projects: publishProjects };
    const files = pendingUploads.map((upload, index) => ({ ...upload, placeholder: `__upload_${index}__` }));

    fetch(`/api/admin/publish?portfolio=${portfolioId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content, files, removedImages }),
    })
      .then(async (response) => {
        if (!response.ok) {
          const body = await response.text();
          let message = body || 'Could not save';
          try {
            message = JSON.parse(body).error || message;
          } catch {
            // Vercel may return a plain-text error for oversized requests.
          }
          throw new Error(message.includes('Request Entity') ? 'The images are too large. Use smaller images and try again.' : message);
        }
        const result = await response.json();
        if (Array.isArray(result.content?.projects)) {
          setProjects(result.content.projects);
          if (result.content.settings) setPortfolioSettings(result.content.settings);
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(result.content.projects));
          window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(result.content.settings ?? portfolioSettings));
        }
        setPendingUploads([]);
        setRemovedImages([]);
        setHasChanges(false);
        setStatusMessage('Published successfully');
        setShowPublishedNotice(true);
      })
      .catch((error: Error) => setSaveError(error.message))
      .finally(() => setSaving(false));
  };

  const addProject = () => {
    const id = `new-project-${Date.now()}`;
    const project: EditableProject = {
      id,
      title: 'New project',
      category: dashboardCategories[0],
      year: new Date().getFullYear().toString(),
      client: '',
      thumbnail: '',
      description: '',
      images: [],
      published: false,
      order: projects.length,
    };
    setProjects((current) => [...current, project]);
    setSelectedId(id);
    setHasChanges(true);
  };

  const removeSelected = () => {
    if (!selectedProject || !window.confirm(`Delete “${selectedProject.title}”?`)) return;
    const remaining = projects.filter((project) => project.id !== selectedId);
    setProjects(remaining.map((project, order) => ({ ...project, order })));
    setSelectedId(remaining[0]?.id ?? '');
    setHasChanges(true);
  };

  const removeImage = (image: string) => {
    updateSelected({ images: selectedProject?.images.filter((candidate) => candidate !== image) ?? [] });
    setPendingUploads((current) => current.filter((upload) => upload.placeholder !== image));
    if (!image.startsWith('data:')) setRemovedImages((current) => [...current, image]);
  };

  const moveSelected = (direction: -1 | 1) => {
    const index = projects.findIndex((project) => project.id === selectedId);
    const target = index + direction;
    if (index < 0 || target < 0 || target >= projects.length) return;
    const reordered = [...projects];
    [reordered[index], reordered[target]] = [reordered[target], reordered[index]];
    setProjects(reordered.map((project, order) => ({ ...project, order })));
    setHasChanges(true);
  };

  const logout = async () => {
    if (hasChanges && !window.confirm('You have unpublished changes. Log out anyway?')) return;
    await fetch('/api/auth/logout', { method: 'POST' });
    setAuthenticated(false);
    setEmail('');
    setPassword('');
  };

  const uploadImages = async (files: FileList | null) => {
    if (!files || !selectedProject) return;
    setUploading(true);
    setSaveError('');
    try {
      const uploaded: string[] = [];
      for (const file of Array.from(files)) {
        if (!file.type.startsWith('image/')) continue;
        if (file.size > 3_000_000) {
          setSaveError(`${file.name} is too large. Please use an image under 3 MB.`);
          continue;
        }
        const content = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(String(reader.result));
          reader.onerror = () => reject(new Error('Could not read image'));
          reader.readAsDataURL(file);
        });
        const placeholder = content;
        uploaded.push(placeholder);
        setPendingUploads((current) => [...current, { projectId: selectedProject.id, filename: file.name, content, placeholder }]);
      }
      updateSelected({ images: [...selectedProject.images, ...uploaded], thumbnail: selectedProject.thumbnail || uploaded[0] });
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : 'Could not upload image');
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    if (!hasChanges) return;
    const draftProjects = projects.map((project) => ({
      ...project,
      images: project.images.filter((image) => !image.startsWith('data:')),
    }));
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(draftProjects));
    window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(portfolioSettings));
  }, [projects, portfolioSettings, hasChanges]);

  if (!authenticated) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f6f5f2] px-5 text-[#181818]">
        <form
          className="w-full max-w-sm rounded bg-white p-7 shadow-sm"
          onSubmit={(event) => {
            event.preventDefault();
            void authenticate(email, password);
          }}
        >
          <p className="text-[10px] uppercase tracking-[0.2em] text-black/45">Private area</p>
          <h1 className="mt-3 text-2xl">Portfolio admin</h1>
          <p className="mt-3 text-sm leading-6 text-black/55">Sign in to manage this portfolio.</p>
          <input
            autoFocus
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            className="mt-6 w-full rounded border border-black/15 px-3 py-3 outline-none focus:border-black"
          />
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            className="mt-6 w-full rounded border border-black/15 px-3 py-3 outline-none focus:border-black"
          />
          {authError && <p className="mt-3 text-sm text-red-700">{authError}</p>}
          <button className="mt-5 w-full rounded bg-black px-5 py-3 text-sm text-white">Enter dashboard</button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f6f5f2] text-[#181818]">
      {showPublishedNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-5" role="dialog" aria-modal="true" aria-labelledby="published-title">
          <div className="w-full max-w-md rounded bg-white p-7 shadow-xl">
            <p className="text-[10px] uppercase tracking-[0.2em] text-black/45">Changes published</p>
            <h2 id="published-title" className="mt-3 text-2xl">Your portfolio is updating</h2>
            <p className="mt-4 text-sm leading-6 text-black/60">The changes have been sent to Vercel. They will normally appear on the public website within 1–2 minutes. Please wait before publishing again.</p>
            <button onClick={() => setShowPublishedNotice(false)} className="mt-6 w-full rounded bg-black px-5 py-3 text-sm text-white">Got it</button>
          </div>
        </div>
      )}
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col md:flex-row">
        <aside className="border-b border-black/10 bg-white p-5 md:w-80 md:border-b-0 md:border-r md:p-7">
          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-black/45">Portfolio admin</p>
              <h1 className="mt-2 text-xl">{portfolioName}</h1>
            </div>
            <button onClick={() => void logout()} className="rounded-full bg-black px-2 py-1 text-[10px] text-white">Log out</button>
          </div>

          <div className="mb-3 flex items-center justify-between text-xs text-black/50">
            <span>Projects</span>
            <div className="flex items-center gap-3">
              <span>{projects.length}</span>
              <button onClick={addProject} className="rounded bg-black px-2 py-1 text-white">+ Add</button>
            </div>
          </div>
          <nav className="flex max-h-[48vh] gap-1 overflow-auto md:block md:max-h-[calc(100vh-180px)]">
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => setSelectedId(project.id)}
                className={`min-w-48 shrink-0 rounded px-3 py-2 text-left text-sm transition md:block md:w-full ${
                  selectedId === project.id ? 'bg-black text-white' : 'hover:bg-black/5'
                }`}
              >
                <span className="block truncate">{project.title}</span>
                <span className={`text-[10px] ${selectedId === project.id ? 'text-white/60' : 'text-black/40'}`}>
                  {project.category} · {project.published ? 'Published' : 'Draft'}
                </span>
              </button>
            ))}
          </nav>
        </aside>

        <section className="flex-1 p-5 md:p-10">
          {selectedProject ? (
            <>
              <header className="mb-8 flex flex-col gap-4 border-b border-black/10 pb-5 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-black/45">Edit project</p>
                  <h2 className="mt-2 text-3xl">{selectedProject.title}</h2>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => moveSelected(-1)} className="rounded border border-black/15 bg-white px-3 py-3 text-sm">↑</button>
                  <button onClick={() => moveSelected(1)} className="rounded border border-black/15 bg-white px-3 py-3 text-sm">↓</button>
                  <button onClick={removeSelected} className="rounded border border-red-200 bg-white px-3 py-3 text-sm text-red-700">Delete</button>
                  <button
                    onClick={saveDraft}
                    disabled={!hasChanges || saving}
                    className="rounded border border-black/15 bg-white px-4 py-3 text-sm disabled:opacity-40"
                  >
                    Save draft
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm('Publish all changes and start a deployment?')) publishChanges();
                    }}
                    disabled={!hasChanges || saving}
                    className="rounded bg-black px-5 py-3 text-sm text-white transition hover:bg-black/75 disabled:opacity-40"
                  >
                    {saving ? 'Publishing…' : 'Publish all'}
                  </button>
                </div>
              </header>

              {saveError && <p className="mb-6 max-w-3xl rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{saveError}</p>}
              {statusMessage && <p className="mb-6 max-w-3xl text-sm text-black/50">{statusMessage}</p>}

              <div className="grid max-w-3xl gap-6">
                <label className="grid gap-2 text-sm">
                  <span className="text-black/55">Title</span>
                  <input
                    value={selectedProject.title}
                    onChange={(event) => updateSelected({ title: event.target.value })}
                    className="rounded border border-black/15 bg-white px-3 py-3 outline-none focus:border-black"
                  />
                </label>

                <div className="grid gap-6 sm:grid-cols-2">
                  <label className="grid gap-2 text-sm">
                    <span className="text-black/55">Category</span>
                    <select value={selectedProject.category} onChange={(event) => updateSelected({ category: event.target.value as EditableProject['category'] })} className="rounded border border-black/15 bg-white px-3 py-3 outline-none focus:border-black">
                      {dashboardCategories.map((category) => <option key={category} value={category}>{category}</option>)}
                    </select>
                  </label>
                  <label className="grid gap-2 text-sm">
                    <span className="text-black/55">Client</span>
                    <input
                      value={selectedProject.client ?? ''}
                      onChange={(event) => updateSelected({ client: event.target.value })}
                      className="rounded border border-black/15 bg-white px-3 py-3 outline-none focus:border-black"
                    />
                  </label>
                  <label className="grid gap-2 text-sm">
                    <span className="text-black/55">Year</span>
                    <input
                      value={selectedProject.year}
                      onChange={(event) => updateSelected({ year: event.target.value })}
                      className="rounded border border-black/15 bg-white px-3 py-3 outline-none focus:border-black"
                    />
                  </label>
                </div>

                <label className="grid gap-2 text-sm">
                  <span className="text-black/55">Description</span>
                  <textarea
                    value={selectedProject.description}
                    onChange={(event) => updateSelected({ description: event.target.value })}
                    rows={8}
                    className="resize-y rounded border border-black/15 bg-white px-3 py-3 leading-6 outline-none focus:border-black"
                  />
                </label>

                <label className="grid gap-2 text-sm">
                  <span className="text-black/55">Video URL <span className="text-black/35">(optional)</span></span>
                  <input
                    value={selectedProject.video ?? ''}
                    onChange={(event) => updateSelected({ video: event.target.value || undefined })}
                    placeholder="https://www.youtube.com/embed/... or Vimeo URL"
                    className="rounded border border-black/15 bg-white px-3 py-3 outline-none focus:border-black"
                  />
                  <span className="text-xs text-black/40">Leave empty to remove the video from this project.</span>
                </label>

                <label className="flex items-center gap-3 text-sm">
                  <input
                    type="checkbox"
                    checked={selectedProject.published}
                    onChange={(event) => updateSelected({ published: event.target.checked })}
                    className="h-4 w-4 accent-black"
                  />
                  Published on the public website
                </label>

                <div className="border-t border-black/10 pt-6">
                  <p className="mb-3 text-sm text-black/55">Media</p>
                  <label className="mb-4 inline-flex cursor-pointer rounded border border-black/15 bg-white px-3 py-2 text-sm hover:border-black">
                    {uploading ? 'Uploading…' : 'Add images'}
                    <input type="file" accept="image/jpeg,image/png,image/webp,image/gif" multiple className="hidden" disabled={uploading} onChange={(event) => void uploadImages(event.target.files)} />
                  </label>
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    {selectedProject.images.map((image) => (
                      <div key={image} className="group relative">
                        <img src={image} alt="" className="aspect-square w-full rounded object-cover" />
                        <button onClick={() => removeImage(image)} className="absolute right-1 top-1 hidden rounded bg-white/90 px-2 py-1 text-xs text-red-700 group-hover:block">Remove</button>
                      </div>
                    ))}
                  </div>
                  <p className="mt-3 text-xs text-black/40">Images are uploaded to GitHub and added to this project.</p>
                </div>
              </div>
            </>
          ) : (
            <p>No projects found.</p>
          )}
        </section>
      </div>
    </main>
  );
}
