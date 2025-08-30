import EditPageSnippet from "@/components/ui/EditPageSnippet";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

// Client wrapper component to handle the Monaco Editor
import ClientEditWrapper from "@/components/ClientEditWrapper";

const EditPageSnippets = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = parseInt((await params).id);
  const snippet = await prisma.snippet.findUnique({
    where: {
      id,
    },
  });

  if (!snippet)
    return (
      <div className="relative min-h-dvh overflow-hidden bg-gradient-to-br from-[#0b1020] via-[#101225] to-[#2b0d2e]">
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-25 [background:radial-gradient(#ffffff1f_1px,transparent_1px)] [background-size:22px_22px]" />
        <div className="pointer-events-none absolute -top-40 -left-24 size-[30rem] rounded-full bg-[conic-gradient(at_25%_25%,#22d3ee_12%,#a78bfa_32%,#f472b6_52%,transparent_68%)] blur-3xl opacity-25 animate-pulse" />
        <div className="pointer-events-none absolute -bottom-48 -right-10 size-[34rem] rounded-full bg-[conic-gradient(at_75%_75%,#f59e0b_12%,#60a5fa_32%,#10b981_52%,transparent_68%)] blur-3xl opacity-25 animate-pulse [animation-delay:900ms]" />

        <main className="relative z-10 mx-auto max-w-2xl px-6 py-24 text-center">
          <div className="mx-auto mb-8 flex size-28 items-center justify-center rounded-full bg-gradient-to-br from-rose-500/30 to-amber-400/30 shadow-2xl backdrop-blur-md">
            <span className="text-5xl">🔎</span>
          </div>
          <h1 className="mb-3 bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-amber-300 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent">
            Snippet not found
          </h1>
          <p className="mx-auto mb-8 max-w-md text-white/70">
            The snippet you are looking for might have been removed or the ID is incorrect.
          </p>

          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-medium text-white/85 shadow-lg backdrop-blur-xl transition-all hover:scale-[1.02] hover:bg-white/15 hover:text-white"
            >
              ← Back home
            </Link>

            <Link
              href="/snippet/new"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-gradient-to-r from-emerald-500 via-cyan-600 to-sky-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:scale-[1.02] hover:from-emerald-600 hover:via-cyan-700 hover:to-sky-700 hover:shadow-xl"
            >
              Create a snippet
            </Link>
          </div>
        </main>
      </div>
    );

  return <ClientEditWrapper snippet={snippet} />;
};

export default EditPageSnippets;
