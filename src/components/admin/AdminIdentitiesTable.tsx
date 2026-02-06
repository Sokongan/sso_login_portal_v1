import { useMemo, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import type { AdminIdentity } from '@/lib/api/adminIdentities';
import { MoreVertical } from 'lucide-react';
import { Link } from 'react-router-dom';

type AdminIdentitiesTableProps = {
  identities: AdminIdentity[];
  bffSession?: { subject: string; exp: string };
};

export default function AdminIdentitiesTable({ identities, bffSession }: AdminIdentitiesTableProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<'profile' | 'password'>('profile');
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    passwordConfirm: '',
  });
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const editingIdentity = useMemo(() => {
    if (!editingId) return null;
    return (
      identities.find((identity) => identity.ID === editingId || identity.id === editingId) ??
      identities.find((identity) => (identity.Traits ?? identity.traits)?.email === editingId) ??
      identities.find((identity) => (identity.Traits ?? identity.traits)?.username === editingId) ??
      null
    );
  }, [editingId, identities]);
  const editingTraits = editingIdentity?.Traits ?? editingIdentity?.traits;

  const startEdit = (identity: AdminIdentity) => {
    const traits = identity.Traits ?? identity.traits;
    const id = identity.ID ?? identity.id ?? traits?.email ?? traits?.username ?? '';
    setEditingId(id || null);
    setEditMode('profile');
    setFormValues({
      firstName: traits?.name?.firstName ?? '',
      lastName: traits?.name?.lastName ?? '',
      email: traits?.email ?? '',
      username: traits?.username ?? '',
      password: '',
      passwordConfirm: '',
    });
  };

  const startResetPassword = (identity: AdminIdentity) => {
    const traits = identity.Traits ?? identity.traits;
    const id = identity.ID ?? identity.id ?? traits?.email ?? traits?.username ?? '';
    setEditingId(id || null);
    setEditMode('password');
    setFormValues({
      firstName: traits?.name?.firstName ?? '',
      lastName: traits?.name?.lastName ?? '',
      email: traits?.email ?? '',
      username: traits?.username ?? '',
      password: '',
      passwordConfirm: '',
    });
  };

  const filteredIdentities = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return identities;
    return identities.filter((identity) => {
      const traits = identity.Traits ?? identity.traits;
      const name = traits?.name
        ? `${traits?.name?.firstName ?? ''} ${traits?.name?.lastName ?? ''}`.trim()
        : '';
      const haystack = [
        name,
        traits?.email ?? '',
        traits?.username ?? '',
      ]
        .join(' ')
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [identities, query]);

  const totalRows = filteredIdentities.length;
  const totalPages = Math.max(1, Math.ceil(totalRows / rowsPerPage));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const pagedIdentities = filteredIdentities.slice(startIndex, startIndex + rowsPerPage);

  const sessionStatusFor = (identity: AdminIdentity) => {
    if (!bffSession) return null;
    const id = identity.ID ?? identity.id;
    if (!id || bffSession.subject !== id) return null;
    const expRaw = bffSession.exp;
    const expNum = Number(expRaw);
    let expMs = Number.isFinite(expNum)
      ? expNum < 1_000_000_000_000
        ? expNum * 1000
        : expNum
      : Date.parse(expRaw);
    if (!Number.isFinite(expMs)) return null;
    const isActive = expMs - Date.now() > 0;
    return { isActive, expMs };
  };

  return (
    <div className="rounded-2xl border border-slate-200 bg-white/90 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 px-4 py-3 dark:border-slate-800/80">
        <div className="flex flex-1 items-center gap-2">
          <input
            type="search"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(1);
            }}
            placeholder="Search users"
            className="h-9 w-full min-w-[180px] max-w-sm rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 shadow-sm focus:border-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-300 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button asChild size="sm">
            <Link to="/admin/users/new">Add user</Link>
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow className='item-center'>
            <TableHead className="text-center">Name</TableHead>
            <TableHead className="text-center">Email</TableHead>
            <TableHead className="text-center">Username</TableHead>
            <TableHead className="text-center">Roles</TableHead>
            <TableHead className="text-center">Session</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pagedIdentities.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center text-sm text-slate-500">
                No identities found.
              </TableCell>
            </TableRow>
          ) : (
            pagedIdentities.map((identity) => {
              const traits = identity.Traits ?? identity.traits;
              const name = traits?.name
                ? `${traits?.name?.firstName ?? ''} ${traits?.name?.lastName ?? ''}`.trim()
                : '';
              const rowKey =
                identity.ID ?? identity.id ?? traits?.email ?? traits?.username ?? Math.random();
              const roles = identity.roles ?? [];
              const session = identity.kratos_sessions?.[0];
              const sessionStatus = sessionStatusFor(identity);
              return (
                <TableRow key={rowKey}>
                  <TableCell className="text-center font-medium">
                    {name || traits?.username || traits?.email || 'Unknown'}
                  </TableCell>
                  <TableCell className="text-center">{traits?.email ?? '—'}</TableCell>
                  <TableCell className="text-center">{traits?.username ?? '—'}</TableCell>
                  <TableCell className="text-center">
                    {roles.length === 0 ? (
                      <span className="text-xs text-slate-400">—</span>
                    ) : (
                      <div className="flex flex-wrap justify-center gap-1">
                        {roles.map((role, index) => (
                          <span
                            key={`${role.role}-${role.object}-${index}`}
                            className="rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-[11px] text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300"
                          >
                            {role.role} @ {role.object}
                          </span>
                        ))}
                      </div>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex flex-col items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
                      {sessionStatus ? (
                        <span
                          className={`rounded-full border px-2 py-0.5 text-[11px] ${
                            sessionStatus.isActive
                              ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-900/30 dark:text-emerald-200'
                              : 'border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300'
                          }`}
                        >
                          {sessionStatus.isActive ? 'Active' : 'Expired'}
                        </span>
                      ) : (
                        <span className="text-xs text-slate-400">—</span>
                      )}
                      {session ? (
                        <>
                          <span>{session.user_agent ?? 'Unknown device'}</span>
                          <span>{session.ip_address ?? 'Unknown IP'}</span>
                        </>
                      ) : null}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon-xs">
                          <MoreVertical />
                          <span className="sr-only">Open actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => startEdit(identity)}>
                          Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => startResetPassword(identity)}>
                          Reset password
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-200/80 px-4 py-3 text-xs text-slate-600 dark:border-slate-800/80 dark:text-slate-400">
        <div className="flex items-center gap-2">
          <span>Rows per page</span>
          <select
            value={rowsPerPage}
            onChange={(event) => {
              setRowsPerPage(Number(event.target.value));
              setPage(1);
            }}
            className="h-8 rounded-md border border-slate-200 bg-white px-2 text-xs text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
          >
            {[5, 10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span>
            {totalRows === 0 ? 0 : startIndex + 1}-{Math.min(startIndex + rowsPerPage, totalRows)} of {totalRows}
          </span>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="icon-xs"
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
            >
              ‹
            </Button>
            <span className="min-w-[2.5rem] text-center text-xs">
              {currentPage}/{totalPages}
            </span>
            <Button
              variant="outline"
              size="icon-xs"
              onClick={() => setPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
            >
              ›
            </Button>
          </div>
        </div>
      </div>
      <Dialog
        open={Boolean(editingIdentity)}
        onOpenChange={(open) => !open && setEditingId(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editMode === 'profile' ? 'Edit profile' : 'Reset password'}
            </DialogTitle>
            <DialogDescription>
              {editMode === 'profile'
                ? `Update profile details for ${editingTraits?.email ?? 'this user'}.`
                : `Set a new password for ${editingTraits?.email ?? 'this user'}.`}
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={(event) => {
              event.preventDefault();
            }}
            className="space-y-4"
          >
            {editMode === 'profile' ? (
              <div className="space-y-4">
                <label className="block text-sm text-slate-700 dark:text-slate-300">
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    First name
                  </span>
                  <input
                    type="text"
                    value={formValues.firstName}
                    onChange={(event) =>
                      setFormValues((prev) => ({ ...prev, firstName: event.target.value }))
                    }
                    className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  />
                </label>
                <label className="block text-sm text-slate-700 dark:text-slate-300">
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Last name
                  </span>
                  <input
                    type="text"
                    value={formValues.lastName}
                    onChange={(event) =>
                      setFormValues((prev) => ({ ...prev, lastName: event.target.value }))
                    }
                    className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  />
                </label>
                <label className="block text-sm text-slate-700 dark:text-slate-300">
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Email
                  </span>
                  <input
                    type="email"
                    value={formValues.email}
                    onChange={(event) =>
                      setFormValues((prev) => ({ ...prev, email: event.target.value }))
                    }
                    className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  />
                </label>
                <label className="block text-sm text-slate-700 dark:text-slate-300">
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Username
                  </span>
                  <input
                    type="text"
                    value={formValues.username}
                    onChange={(event) =>
                      setFormValues((prev) => ({ ...prev, username: event.target.value }))
                    }
                    className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  />
                </label>
              </div>
            ) : (
              <div className="space-y-4">
                <label className="block text-sm text-slate-700 dark:text-slate-300">
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    New password
                  </span>
                  <input
                    type="password"
                    value={formValues.password}
                    onChange={(event) =>
                      setFormValues((prev) => ({ ...prev, password: event.target.value }))
                    }
                    className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  />
                </label>
                <label className="block text-sm text-slate-700 dark:text-slate-300">
                  <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    Confirm password
                  </span>
                  <input
                    type="password"
                    value={formValues.passwordConfirm}
                    onChange={(event) =>
                      setFormValues((prev) => ({ ...prev, passwordConfirm: event.target.value }))
                    }
                    className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  />
                </label>
              </div>
            )}
            <DialogFooter>
              <button
                type="submit"
                className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
              >
                Save changes
              </button>
              <button
                type="button"
                onClick={() => setEditingId(null)}
                className="rounded-md border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
