
import { useEffect, useMemo, useState } from "react"
import { AppSidebar } from '@/components/layout/sidebar/Sidebar';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { useSession } from "@/context/SessionContext"
import { listApps, type AppRegistration } from "@/lib/api/apps"

export default function Page() {
  const { roles } = useSession()
  const [apps, setApps] = useState<AppRegistration[]>([])
  const [status, setStatus] = useState<"idle" | "loading" | "error" | "success">("idle")

  useEffect(() => {
    let isMounted = true
    setStatus("loading")
    ;(async () => {
      try {
        const { response, data } = await listApps()
        if (!response.ok) {
          throw new Error("Unable to load apps.")
        }
        if (isMounted) {
          setApps(data?.apps ?? [])
          setStatus("success")
        }
      } catch (error) {
        console.error("[dashboard] failed to load apps", error)
        if (isMounted) {
          setApps([])
          setStatus("error")
        }
      }
    })()

    return () => {
      isMounted = false
    }
  }, [])

  const accessibleApps = useMemo(() => {
    if (roles.length === 0) return []
    const allowedObjects = new Set(roles.map((role) => role.object))
    return apps.filter((app) => allowedObjects.has(app.dsn))
  }, [apps, roles])

  const buildAppUrl = (app: AppRegistration) => {
    try {
      return new URL(app.redirect_path || "/", app.dsn).toString()
    } catch {
      return app.dsn
    }
  }

  const statusCopy = useMemo(() => {
    if (status === "loading") return "Loading apps…"
    if (status === "error") return "Unable to load app access."
    if (accessibleApps.length === 0) return "No apps available for your access."
    return ""
  }, [accessibleApps.length, status])

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
            <h1 className="text-base font-medium">Dashboard</h1>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 px-6 pb-6 pt-0">
          <section className="grid gap-6">
            <div className="rounded-2xl border border-slate-200 bg-white/90 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
              <div>
                <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                  App access
                </h2>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                  Apps you can access based on your assigned roles.
                </p>
              </div>
              {statusCopy ? (
                <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">{statusCopy}</p>
              ) : null}
              {accessibleApps.length > 0 ? (
                <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {accessibleApps.map((app) => (
                    <Card key={app.id} className="border-slate-200 shadow-sm dark:border-slate-800">
                      <CardHeader>
                        <CardTitle className="text-base">
                          {app.dsn.replace(/^https?:\/\//, "")}
                        </CardTitle>
                        <CardDescription>{app.dsn}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm text-slate-600 dark:text-slate-400">
                          Redirect: {app.redirect_path || "/"}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button asChild variant="outline">
                          <a href={buildAppUrl(app)} rel="noreferrer">
                            Open app
                          </a>
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : null}
            </div>
          </section>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
