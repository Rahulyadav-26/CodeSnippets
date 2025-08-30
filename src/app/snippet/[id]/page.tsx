import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

const SnippetDetailPage = async ({
  params,
}: {
  params: { id: string };
}) => {
  const id = parseInt(params.id);

  const snippet = await prisma.snippet.findUnique({
    where: {
      id,
    },
  });

  if (!snippet) return <h1>Snippet Not found</h1>;

  return (
    <div className="relative min-h-screen overflow-hidden p-6 bg-gradient-to-br from-indigo-50 via-violet-50 to-pink-50">
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 -left-24 h-80 w-80 rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.35),transparent_60%)] blur-2xl" />
        <div className="absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,rgba(244,114,182,0.28),transparent_60%)] blur-2xl" />
        <div className="absolute inset-0 bg-[conic-gradient(from_180deg_at_50%_50%,rgba(99,102,241,0.12),rgba(168,85,247,0.10),rgba(236,72,153,0.10),rgba(99,102,241,0.12))]" />
        <div className="absolute inset-0 opacity-[0.06] [background:radial-gradient(1px_1px_at_14px_14px,#000_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <div className="mx-auto max-w-4xl">
        {/* Top glass panel */}
        <div className="relative mb-8 overflow-hidden rounded-2xl border border-white/30 bg-white/60 shadow-2xl backdrop-blur-xl">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white/40 via-white/20 to-white/10" />
          <div className="flex items-center justify-between gap-4 px-6 py-5">
            {/* Left: Back + Title */}
            <div className="min-w-0">
              <div className="mb-1 flex items-center gap-3">
                <Link
                  href="/"
                  className="group inline-flex items-center gap-2 rounded-full border border-slate-200/60 bg-gradient-to-br from-slate-50 to-white/90 px-3 py-1.5 text-sm text-slate-600 shadow-sm transition-all hover:shadow-md hover:from-white hover:to-slate-50"
                >
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 text-white shadow-sm transition-transform group-hover:scale-110">←</span>
                  Home
                </Link>
                <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200/60 bg-indigo-50/80 px-2.5 py-1 text-xs font-medium text-indigo-700 shadow-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" />
                  ID #{id}
                </span>
              </div>
              <h1 className="truncate bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 bg-clip-text text-3xl font-extrabold text-transparent drop-shadow-sm">
                {snippet?.title}
              </h1>
              <div className="mt-2 h-1 w-24 rounded-full bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-400 shadow-sm" />
            </div>

            {/* Right: Actions */}
            <div className="flex shrink-0 items-center gap-3">
              <Link href={`/snippet/${id}/edit`}>
                <Button className="group border-0 bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg transition-all duration-300 hover:from-emerald-600 hover:to-teal-600 hover:shadow-xl">
                  <span className="mr-1.5 inline-block rounded bg-white/20 px-1.5 py-0.5 text-xs">✎</span>
                  Edit
                </Button>
              </Link>
              <Button
                variant="destructive"
                className="border-0 bg-gradient-to-r from-red-500 to-pink-500 shadow-lg transition-all duration-300 hover:from-red-600 hover:to-pink-600 hover:shadow-xl"
              >
                <span className="mr-1.5 inline-block rounded bg-white/20 px-1.5 py-0.5 text-xs">🗑</span>
                Delete
              </Button>
            </div>
          </div>

          {/* subtle bottom divider glow */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-300/70 to-transparent" />
        </div>

        {/* Code card with gradient ring */}
        <div className="relative rounded-2xl">
          {/* gradient ring */}
          <div className="pointer-events-none absolute -inset-[1px] -z-10 rounded-[1.1rem] bg-gradient-to-r from-indigo-400/60 via-sky-400/60 to-fuchsia-400/60 opacity-60 blur-sm" />
          <div className="relative overflow-hidden rounded-2xl border border-slate-700/50 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 shadow-2xl">
            {/* header */}
            <div className="flex items-center justify-between border-b border-slate-700/40 px-5 py-4">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-200">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                Code Snippet
              </h3>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-gradient-to-r from-red-400 to-red-500 shadow" />
                <div className="h-3 w-3 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 shadow" />
                <div className="h-3 w-3 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 shadow" />
              </div>
            </div>

            {/* code body */}
            <div className="relative">
              {/* inner glow */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_40%_at_50%_0%,rgba(99,102,241,0.18),transparent_60%)]" />
              <pre className="overflow-x-auto p-6 text-sm">
                <code className="whitespace-pre-wrap font-mono leading-relaxed text-slate-100 selection:bg-indigo-500/30">
                  {snippet.code}
                </code>
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnippetDetailPage;
