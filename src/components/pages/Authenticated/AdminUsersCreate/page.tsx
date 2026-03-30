import { useState, type FormEvent } from 'react';
import { AppSidebar } from '@/components/layout/sidebar/Sidebar';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';

export default function AdminUsersCreatePage() {
  const [formStatus, setFormStatus] = useState('');
  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    passwordConfirm: '',
    tuples_namespace: '',
    tuples_subject_id: '',
  });
  const [permissions, setPermissions] = useState([
    { tuples_object: '', tuples_relation: '' },
  ]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormStatus('User creation request queued.');
  };

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
            <h1 className="text-base font-medium">Create user</h1>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 px-6 pb-6 pt-0">
          <section className="grid gap-6">
            <div className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Account settings
                </h2>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  Create a new user profile, set credentials, and assign access.
                </p>
              </div>
              <form onSubmit={handleSubmit} className="mt-6 space-y-6">
                <div className="rounded-xl border border-slate-200 bg-white/70 p-5 dark:border-slate-800 dark:bg-slate-950/40">
                  <div>
                    <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                      Profile
                    </h3>
                    <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                      Basic identity details for the new user.
                    </p>
                  </div>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
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
                </div>

                <div className="rounded-xl border border-slate-200 bg-white/70 p-5 dark:border-slate-800 dark:bg-slate-950/40">
                  <div>
                    <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                      Password
                    </h3>
                    <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                      Set a temporary password for the new user.
                    </p>
                  </div>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
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
                </div>

                <div className="rounded-xl border border-slate-200 bg-white/70 p-5 dark:border-slate-800 dark:bg-slate-950/40">
                  <div>
                    <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
                      Role & permissions
                    </h3>
                    <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                      Assign access using tuple-based permissions.
                    </p>
                  </div>
                  <div className="mt-4 grid gap-4 sm:grid-cols-2">
                    <label className="block text-sm text-slate-700 dark:text-slate-300">
                      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        tuples_namespace
                      </span>
                      <input
                        type="text"
                        value={formValues.tuples_namespace}
                        onChange={(event) =>
                          setFormValues((prev) => ({ ...prev, tuples_namespace: event.target.value }))
                        }
                        className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                      />
                    </label>
                    <label className="block text-sm text-slate-700 dark:text-slate-300">
                      <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                        tuples_subject_id
                      </span>
                      <input
                        type="text"
                        value={formValues.tuples_subject_id}
                        onChange={(event) =>
                          setFormValues((prev) => ({ ...prev, tuples_subject_id: event.target.value }))
                        }
                        className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                      />
                    </label>
                  </div>
                  <div className="mt-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                          Roles & permissions
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Add one or more application roles.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() =>
                          setPermissions((prev) => [
                            ...prev,
                            { tuples_object: '', tuples_relation: '' },
                          ])
                        }
                        className="rounded-md border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                      >
                        Add role
                      </button>
                    </div>
                    <div className="space-y-3">
                      {permissions.map((permission, index) => (
                        <div
                          key={`permission-${index}`}
                          className="grid gap-3 sm:grid-cols-[1fr_1fr_auto]"
                        >
                          <label className="block text-sm text-slate-700 dark:text-slate-300">
                            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                              Application
                            </span>
                            <input
                              type="text"
                              value={permission.tuples_object}
                              onChange={(event) =>
                                setPermissions((prev) =>
                                  prev.map((item, itemIndex) =>
                                    itemIndex === index
                                      ? { ...item, tuples_object: event.target.value }
                                      : item
                                  )
                                )
                              }
                              className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                            />
                          </label>
                          <label className="block text-sm text-slate-700 dark:text-slate-300">
                            <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                              Role
                            </span>
                            <input
                              type="text"
                              value={permission.tuples_relation}
                              onChange={(event) =>
                                setPermissions((prev) =>
                                  prev.map((item, itemIndex) =>
                                    itemIndex === index
                                      ? { ...item, tuples_relation: event.target.value }
                                      : item
                                  )
                                )
                              }
                              className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                            />
                          </label>
                          <div className="flex items-end">
                            <button
                              type="button"
                              onClick={() =>
                                setPermissions((prev) =>
                                  prev.length === 1
                                    ? prev
                                    : prev.filter((_, itemIndex) => itemIndex !== index)
                                )
                              }
                              className="h-9 rounded-md border border-slate-200 px-3 text-xs font-semibold text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
                  >
                    Create user
                  </button>
                  {formStatus ? (
                    <p className="text-sm text-emerald-700 dark:text-emerald-300">
                      {formStatus}
                    </p>
                  ) : null}
                </div>
              </form>
            </div>
          </section>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
