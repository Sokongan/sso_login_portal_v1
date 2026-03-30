import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyTitle } from "@/components/ui/empty";

export function AnnouncementBoard() {
  const announcements: string[] = [];

  return (
    <Card className="h-full overflow-hidden border-slate-300 bg-white shadow-sm">
      <CardHeader className="pb-2 sm:pb-3">
        <CardTitle className="text-sm">Annoucement</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div
          className="h-full bg-white/80 backdrop-blur-[1px] overflow-hidden"
        >
          <div className="p-4 sm:p-6" >
            {announcements.length === 0 ? (
              <Empty className="min-h-36 bg-white/85">
                <EmptyHeader>
                  <EmptyTitle>No posts available</EmptyTitle>
                  <EmptyDescription>Announcements will appear here once published.</EmptyDescription>
                </EmptyHeader>
                <EmptyContent />
              </Empty>
            ) : (
              <ul className="space-y-2">
                {announcements.map((post, index) => (
                  <li
                    key={`${post}-${index}`}
                    className="rounded-md border border-slate-200 bg-white/80 p-3 text-sm text-slate-900"
                  >
                    {post}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
