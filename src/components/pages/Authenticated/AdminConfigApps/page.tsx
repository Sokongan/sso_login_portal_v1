import { useEffect, useMemo, useState, type FormEvent } from 'react';
import { AppSidebar } from '@/components/layout/AppSidebar';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  createApp,
  deleteApp,
  listApps,
  updateApp,
  type AppRegistration,
} from '@/lib/api/apps';

export default function AdminConfigAppsPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'error' | 'success'>('idle');
  const [message, setMessage] = useState('');
  const [apps, setApps] = useState<AppRegistration[]>([]);
  const [formValues, setFormValues] = useState({ dsn: '', redirect_path: '/dashboard' });
  const [editingApp, setEditingApp] = useState<AppRegistration | null>(null);
  const [saving, setSaving] = useState(false);

  const loadApps = async () => {
    setStatus('loading');
    setMessage('');
    try {
      const { response, data } = await listApps();
      if (!response.ok || !data) {
        setStatus('error');
        setMessage('Unable to load applications.');
        return;
      }
      setApps(data.apps ?? []);
      setStatus('success');
    } catch (error) {
      console.error('[apps] failed to load apps', error);
      setStatus('error');
      setMessage('Unable to load applications.');
    }
  };

  useEffect(() => {
    void loadApps();
  }, []);

  const handleCreate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      const { response } = await createApp({
        dsn: formValues.dsn,
        redirect_path: formValues.redirect_path || '/dashboard',
      });
      if (!response.ok) {
        setMessage('Unable to create app.');
        return;
      }
      setFormValues({ dsn: '', redirect_path: '/dashboard' });
      await loadApps();
    } catch (error) {
      console.error('[apps] failed to create app', error);
      setMessage('Unable to create app.');
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!editingApp) return;
    setSaving(true);
    setMessage('');
    try {
      const { response } = await updateApp(editingApp.id, {
        dsn: editingApp.dsn,
        redirect_path: editingApp.redirect_path,
      });
      if (!response.ok) {
        setMessage('Unable to update app.');
        return;
      }
      setEditingApp(null);
      await loadApps();
    } catch (error) {
      console.error('[apps] failed to update app', error);
      setMessage('Unable to update app.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (app: AppRegistration) => {
    if (!window.confirm(`Delete ${app.dsn}?`)) return;
    setSaving(true);
    setMessage('');
    try {
      const { response } = await deleteApp(app.id);
      if (!response.ok) {
        setMessage('Unable to delete app.');
        return;
      }
      await loadApps();
    } catch (error) {
      console.error('[apps] failed to delete app', error);
      setMessage('Unable to delete app.');
    } finally {
      setSaving(false);
    }
  };

  const hasApps = useMemo(() => apps.length > 0, [apps.length]);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-6">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <h1 className="text-base font-medium">Config</h1>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 px-6 pb-6 pt-0">
          <section className="grid gap-6">
            <div className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  App registration
                </h2>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  Register applications and allowed redirect paths.
                </p>
              </div>

              <form onSubmit={handleCreate} className="mt-6 grid gap-4 sm:grid-cols-[1fr_1fr_auto]">
                <label className="block text-sm text-slate-700 dark:text-slate-300">
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    DSN
                  </span>
                  <input
                    type="text"
                    value={formValues.dsn}
                    onChange={(event) =>
                      setFormValues((prev) => ({ ...prev, dsn: event.target.value }))
                    }
                    className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  />
                </label>
                <label className="block text-sm text-slate-700 dark:text-slate-300">
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Redirect path
                  </span>
                  <input
                    type="text"
                    value={formValues.redirect_path}
                    onChange={(event) =>
                      setFormValues((prev) => ({ ...prev, redirect_path: event.target.value }))
                    }
                    className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  />
                </label>
                <div className="flex items-end">
                  <Button type="submit" className="w-full" disabled={saving}>
                    {saving ? 'Saving…' : 'Add app'}
                  </Button>
                </div>
              </form>

              {message ? (
                <p className="mt-4 text-sm text-rose-600 dark:text-rose-400">{message}</p>
              ) : null}

              <div className="mt-6 rounded-xl border border-slate-200 bg-white/70 p-4 dark:border-slate-800 dark:bg-slate-950/40">
                {status === 'loading' ? (
                  <p className="text-sm text-slate-500 dark:text-slate-400">Loading apps…</p>
                ) : null}
                {status === 'error' ? (
                  <p className="text-sm text-rose-600 dark:text-rose-400">
                    {message || 'Unable to load apps.'}
                  </p>
                ) : null}
                {status !== 'loading' && !hasApps ? (
                  <p className="text-sm text-slate-500 dark:text-slate-400">No apps yet.</p>
                ) : null}
                {hasApps ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>DSN</TableHead>
                        <TableHead>Redirect path</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {apps.map((app) => (
                        <TableRow key={app.id}>
                          <TableCell>{app.dsn}</TableCell>
                          <TableCell>{app.redirect_path}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="xs"
                                onClick={() => setEditingApp({ ...app })}
                              >
                                Edit
                              </Button>
                              <Button
                                variant="outline"
                                size="xs"
                                onClick={() => handleDelete(app)}
                                disabled={saving}
                              >
                                Delete
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : null}
              </div>
            </div>
          </section>
        </div>
      </SidebarInset>

      <Dialog open={Boolean(editingApp)} onOpenChange={(open) => !open && setEditingApp(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit app</DialogTitle>
            <DialogDescription>Update DSN and redirect path.</DialogDescription>
          </DialogHeader>
          {editingApp ? (
            <form onSubmit={handleUpdate} className="space-y-4">
              <label className="block text-sm text-slate-700 dark:text-slate-300">
                <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  DSN
                </span>
                <input
                  type="text"
                  value={editingApp.dsn}
                  onChange={(event) =>
                    setEditingApp((prev) => (prev ? { ...prev, dsn: event.target.value } : prev))
                  }
                  className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                />
              </label>
              <label className="block text-sm text-slate-700 dark:text-slate-300">
                <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                  Redirect path
                </span>
                <input
                  type="text"
                  value={editingApp.redirect_path}
                  onChange={(event) =>
                    setEditingApp((prev) =>
                      prev ? { ...prev, redirect_path: event.target.value } : prev
                    )
                  }
                  className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                />
              </label>
              <DialogFooter>
                <Button type="submit" disabled={saving}>
                  {saving ? 'Saving…' : 'Save changes'}
                </Button>
                <Button variant="outline" type="button" onClick={() => setEditingApp(null)}>
                  Cancel
                </Button>
              </DialogFooter>
            </form>
          ) : null}
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
}
