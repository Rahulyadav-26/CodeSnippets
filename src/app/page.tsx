import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function Home() {
  const snippets = await prisma.snippet.findMany();

  return (
    <div className="relative min-h-dvh overflow-hidden bg-gradient-to-br from-[#0b1020] via-[#130b2e] to-[#300a3b]">
      {/* Background grid */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-25 [background:radial-gradient(#ffffff22_1px,transparent_1px)] [background-size:22px_22px]"></div>
      {/* Aurora blobs */}
      <div className="pointer-events-none absolute -top-40 -left-20 size-[32rem] rounded-full bg-[conic-gradient(at_30%_30%,#22d3ee_10%,#a78bfa_30%,#f472b6_50%,transparent_60%)] blur-3xl opacity-30 animate-pulse"></div>
      <div className="pointer-events-none absolute -bottom-48 -right-10 size-[36rem] rounded-full bg-[conic-gradient(at_70%_70%,#f59e0b_10%,#10b981_30%,#60a5fa_50%,transparent_60%)] blur-3xl opacity-25 animate-pulse [animation-delay:800ms]"></div>

      <main className="relative z-10 mx-auto max-w-7xl px-6 py-16">
        {/* Hero */}
        <header className="mb-14 text-center">
          <h1 className="text-balance bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-amber-300 bg-clip-text text-5xl font-black tracking-tight text-transparent md:text-7xl">
            Code Snippets
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/70">
            Your beautiful collection of code snippets, organized and ready to inspire
          </p>
        </header>

        {/* Header Controls */}
        <div className="mb-12 flex items-center justify-between rounded-3xl border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <span className="size-3 animate-pulse rounded-full bg-red-400"></span>
            <span className="size-3 animate-pulse rounded-full bg-yellow-400 [animation-delay:120ms]"></span>
            <span className="size-3 animate-pulse rounded-full bg-green-400 [animation-delay:240ms]"></span>
            <h2 className="ml-4 text-2xl font-semibold text-white">Your Snippets</h2>
            <span className="ml-2 rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-white/60 ring-1 ring-white/10">
              {snippets.length} total
            </span>
          </div>
          <Link href="/snippet/new">
            <Button className="rounded-full border-0 bg-gradient-to-r from-pink-500 to-violet-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.03] hover:from-pink-600 hover:to-violet-700 hover:shadow-xl">
              <span className="mr-2">✨</span>
              Create New
            </Button>
          </Link>
        </div>

        {/* Grid */}
        <section aria-label="Snippets" className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {snippets.map((snippet, index) => (
            <div
              key={snippet.id}
              className="group relative overflow-hidden rounded-3xl border border-white/15 bg-white/10 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:shadow-3xl"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {/* interactive shine */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute -inset-x-1 -top-1 h-28 bg-gradient-to-b from-white/30 to-transparent blur-2xl"></div>
              </div>

              {/* border glow */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10 group-hover:ring-white/30"></div>

              <div className="relative z-10 p-8">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-yellow-400 to-orange-500 shadow-lg">
                    <span className="text-2xl">💻</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="size-2 rounded-full bg-red-400"></span>
                    <span className="size-2 rounded-full bg-yellow-400"></span>
                    <span className="size-2 rounded-full bg-green-400"></span>
                  </div>
                </div>

                <h3 className="mb-4 line-clamp-2 text-xl font-bold leading-tight text-white transition-colors duration-300 group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-pink-300 group-hover:bg-clip-text group-hover:text-transparent">
                  {snippet.title}
                </h3>

                <div className="mb-6 h-px w-full bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>

                <Link href={`/snippet/${snippet.id}`}>
                  <Button className="w-full rounded-xl border-0 bg-gradient-to-r from-blue-600 to-purple-600 py-3 font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-[1.03] hover:from-blue-700 hover:to-purple-700 hover:shadow-xl">
                    <span className="mr-2">👁️</span>
                    View Snippet
                  </Button>
                </Link>
              </div>

              {/* particles */}
              <div className="absolute right-4 top-4 size-2 animate-ping rounded-full bg-white/40"></div>
              <div className="absolute bottom-8 left-8 size-1 animate-pulse rounded-full bg-cyan-400/60"></div>
            </div>
          ))}
        </section>

        {snippets.length === 0 && (
          <div className="relative mx-auto mt-6 max-w-2xl rounded-3xl border border-white/10 bg-white/10 p-12 text-center shadow-2xl backdrop-blur-xl">
            <div className="mx-auto mb-8 flex size-32 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 shadow-2xl">
              <span className="text-5xl">📝</span>
            </div>
            <h3 className="mb-3 text-3xl font-bold text-white">No snippets yet</h3>
            <p className="mx-auto mb-8 max-w-md text-white/70">
              Start building your collection of beautiful code snippets
            </p>
            <Link href="/snippet/new">
              <Button className="rounded-full border-0 bg-gradient-to-r from-emerald-500 to-blue-600 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.03] hover:from-emerald-600 hover:to-blue-700 hover:shadow-xl">
                Create Your First Snippet
              </Button>
            </Link>
            {/* decorative */}
            <div className="pointer-events-none absolute -top-24 left-1/2 size-72 -translate-x-1/2 rounded-full bg-fuchsia-500/30 blur-3xl"></div>
          </div>
        )}
      </main>
    </div>
  );
}
