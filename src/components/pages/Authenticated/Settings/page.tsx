import { useMemo, useState } from 'react';
import { AppSidebar } from '@/components/layout/sidebar/Sidebar';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { useSettingsForm } from '@/hooks/settings/useSettingsForm';
import type { UiNodeImageAttributes, UiNodeInputAttributes, UiNodeTextAttributes } from '@ory/client-fetch';

export default function AccountSettingsPage() {
  const {
    isLoading,
    orderedGroups,
    groupedNodes,
    hiddenNodes,
    formValues,
    submittingGroup,
    formErrors,
    messages,
    handleFieldChange,
    handleSubmit,
    setGroupError,
  } = useSettingsForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const passwordValue = useMemo(() => String(formValues.password ?? ''), [formValues.password]);

  const labelMap: Record<string, string> = {
    profile: 'Profile',
    password: 'Password',
    // totp: 'Authenticator app',
    // webauthn: 'Security keys',
    // lookup_secret: 'Recovery codes',
    oidc: 'Connected accounts',
  };

  const descriptionMap: Record<string, string> = {
    profile: 'Update your name and profile details.',
    password: 'Rotate your password and credentials.',
    // totp: 'Set up or manage time-based one-time passwords.',
    // webauthn: 'Manage WebAuthn security keys.',
    // lookup_secret: 'Regenerate or view recovery codes.',
    oidc: 'Manage linked identity providers.',
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
            <h1 className="text-base font-medium">Account settings</h1>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 px-6 pb-6 pt-0">
          <section className="grid gap-6">
            {isLoading ? (
              <div className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  Account settings
                </h2>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  Loading settings flow…
                </p>
              </div>
            ) : null}
            {!isLoading && orderedGroups.length === 0 ? (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-200">
                Unable to load settings flow.
              </div>
            ) : null}
            {orderedGroups.map((group) => {
              const groupNodes = groupedNodes[group] ?? [];
              return (
                <div
                  key={group}
                  className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                        {labelMap[group] ?? 'Settings'}
                      </h2>
                      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                        {descriptionMap[group] ?? 'Update account settings.'}
                      </p>
                    </div>
                  </div>
                  <form
                    onSubmit={async (event) => {
                      if (group === 'password') {
                        if (!passwordValue) {
                          setGroupError(group, 'Password is required.');
                          event.preventDefault();
                          return;
                        }
                        if (passwordValue !== passwordConfirm) {
                          setGroupError(group, 'Passwords do not match.');
                          event.preventDefault();
                          return;
                        }
                      }
                      const ok = await handleSubmit(event, group);
                      if (ok && group === 'password') {
                        handleFieldChange('password', '');
                        setPasswordConfirm('');
                      }
                    }}
                    className="mt-6 space-y-4"
                  >
                    {hiddenNodes.map((node) => {
                      const attrs = node.attributes as UiNodeInputAttributes;
                      return (
                      <input
                        key={`hidden-${group}-${attrs.name}`}
                        type="hidden"
                        name={attrs.name ?? ''}
                        value={String(formValues[attrs.name ?? ''] ?? '')}
                      />
                      );
                    })}
                    {groupNodes.map((node) => {
                      if (node.type === 'img') {
                        const src = (node.attributes as UiNodeImageAttributes).src;
                        if (!src) return null;
                        return (
                          <div
                            key={src}
                            className="rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-900"
                          >
                            <img src={src} alt="" className="mx-auto h-40 w-40 object-contain" />
                          </div>
                        );
                      }
                      if (node.type === 'text') {
                        const text = (node.attributes as UiNodeTextAttributes).text?.text;
                        if (!text) return null;
                        return (
                          <div
                            key={text}
                            className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
                          >
                            {text}
                          </div>
                        );
                      }
                      if (node.attributes.node_type !== 'input') return null;
                      const attrs = node.attributes as UiNodeInputAttributes;
                      const name = attrs.name;
                      const type = attrs.type ?? 'text';
                      if (!name || type === 'submit' || type === 'hidden') return null;
                      const label = node.meta?.label?.text ?? name;
                      const disabled = Boolean(attrs.disabled);
                      const required = Boolean(attrs.required);
                      const value = formValues[name];

                      if (group === 'password' && name === 'password') {
                        return (
                          <div key={name} className="space-y-3">
                            <label className="block text-sm text-slate-700 dark:text-slate-300">
                              <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                                New password
                              </span>
                              <div className="relative">
                                <input
                                  type={showPassword ? 'text' : 'password'}
                                  name={name}
                                  value={String(value ?? '')}
                                  onChange={(event) => handleFieldChange(name, event.target.value)}
                                  disabled={disabled}
                                  required={required}
                                  className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 pr-14 text-sm text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowPassword((prev) => !prev)}
                                  className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                                >
                                  {showPassword ? 'Hide' : 'Show'}
                                </button>
                              </div>
                            </label>
                            <label className="block text-sm text-slate-700 dark:text-slate-300">
                              <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                                Confirm password
                              </span>
                              <div className="relative">
                                <input
                                  type={showPasswordConfirm ? 'text' : 'password'}
                                  value={passwordConfirm}
                                  onChange={(event) => setPasswordConfirm(event.target.value)}
                                  className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 pr-14 text-sm text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowPasswordConfirm((prev) => !prev)}
                                  className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                                >
                                  {showPasswordConfirm ? 'Hide' : 'Show'}
                                </button>
                              </div>
                            </label>
                          </div>
                        );
                      }

                      return (
                        <label key={name} className="block text-sm text-slate-700 dark:text-slate-300">
                          <span className="mb-1 block text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                            {label}
                          </span>
                          {type === 'checkbox' ? (
                            <input
                              type="checkbox"
                              checked={Boolean(value)}
                              onChange={(event) => handleFieldChange(name, event.target.checked)}
                              disabled={disabled}
                              required={required}
                              className="h-4 w-4 rounded border-slate-300 text-slate-900 dark:border-slate-700"
                            />
                          ) : (
                            <input
                              type={type}
                              name={name}
                              value={String(value ?? '')}
                              onChange={(event) => handleFieldChange(name, event.target.value)}
                              disabled={disabled}
                              required={required}
                              className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-slate-500 focus:outline-none focus:ring-1 focus:ring-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                            />
                          )}
                          {node.messages?.length ? (
                            <span className="mt-1 block text-xs text-rose-500">
                              {node.messages.map((msg) => msg.text).filter(Boolean).join(' ')}
                            </span>
                          ) : null}
                        </label>
                      );
                    })}
                    {formErrors[group] ? (
                      <p className="text-sm text-rose-600 dark:text-rose-400">
                        {formErrors[group]}
                      </p>
                    ) : null}
                    {messages[group] ? (
                      <p className="text-sm text-emerald-700 dark:text-emerald-300">
                        {messages[group]}
                      </p>
                    ) : null}
                    <button
                      type="submit"
                      className="w-full rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
                      disabled={submittingGroup === group}
                    >
                      {submittingGroup === group ? 'Saving…' : 'Save changes'}
                    </button>
                  </form>
                </div>
              );
            })}
          </section>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
