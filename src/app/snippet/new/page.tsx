import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";

function CreateSnippetPage() {

  async function CreateSnippet(formData : FormData){
    "use server" // use server directive
    const title = formData.get("title") as string;
    const code = formData.get("code") as string;

    const snippet = await prisma.snippet.create({
      data : {
        title,
        code
      }
    });

    console.log("Created Snippet : " , snippet);

    redirect("/");

  }

  return (
    <div className="relative min-h-dvh overflow-hidden bg-gradient-to-br from-emerald-950 via-slate-950 to-indigo-950">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-20 [background:radial-gradient(#ffffff22_1px,transparent_1px)] [background-size:22px_22px]"></div>
      <div className="pointer-events-none absolute -top-40 -left-20 size-[32rem] rounded-full bg-[conic-gradient(at_30%_30%,#34d399_15%,#22d3ee_35%,#f59e0b_55%,transparent_65%)] blur-3xl opacity-30 animate-pulse"></div>
      <div className="pointer-events-none absolute -bottom-48 -right-10 size-[36rem] rounded-full bg-[conic-gradient(at_70%_70%,#60a5fa_15%,#a3e635_35%,#f472b6_55%,transparent_65%)] blur-3xl opacity-25 animate-pulse [animation-delay:800ms]"></div>

      <main className="relative z-10 mx-auto max-w-6xl px-6 py-14">
        <header className="mb-10 text-center">
          <h1 className="text-balance bg-gradient-to-r from-emerald-300 via-sky-300 to-amber-200 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent md:text-6xl">
            Create Snippet
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-white/70">
            Add a title and paste your code. Save it to your beautiful collection.
          </p>
        </header>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.4fr_.9fr]">
          <form action={CreateSnippet} className="relative rounded-3xl">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-emerald-400/20 via-cyan-400/20 to-sky-400/20 blur-xl"></div>
            <div className="relative rounded-3xl border border-white/15 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
              <div className="mb-6">
                <Label htmlFor="title" className="text-white/90">Title</Label>
                <Input
                  id="title"
                  name="title"
                  type="text"
                  placeholder="e.g. Debounce utility in TypeScript"
                  className="mt-2 bg-white/10 text-white placeholder:text-white/50 ring-1 ring-white/10 focus-visible:ring-white/40"
                />
              </div>

              <div className="mb-8">
                <Label htmlFor="code" className="text-white/90">Code</Label>
                <Textarea
                  id="code"
                  name="code"
                  placeholder={"Paste your code here..."}
                  className="mt-2 min-h-[14rem] bg-white/10 text-white placeholder:text-white/50 ring-1 ring-white/10 focus-visible:ring-white/40"
                />
                <p className="mt-2 text-xs text-white/50">
                  Tip: Use meaningful titles so you can find snippets faster later.
                </p>
              </div>

              <div className="flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-between">
                <Button
                  asChild
                  type="button"
                  variant="ghost"
                  className="w-full rounded-full border-0 bg-white/5 px-5 py-2.5 text-white hover:bg-white/10 sm:w-auto"
                >
                  <Link href="/">Cancel</Link>
                </Button>
                <Button
                  type="submit"
                  className="w-full rounded-full border-0 bg-gradient-to-r from-emerald-500 via-cyan-600 to-sky-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:from-emerald-600 hover:via-cyan-700 hover:to-sky-700 hover:shadow-xl sm:w-auto"
                >
                  <span className="mr-2">🚀</span>
                  Create Snippet
                </Button>
              </div>
            </div>
          </form>

          <aside className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
            <div className="pointer-events-none absolute -right-12 -top-12 size-56 rounded-full bg-gradient-to-br from-amber-400/30 to-rose-400/30 blur-2xl"></div>
            <div className="pointer-events-none absolute -bottom-14 -left-10 size-64 rounded-full bg-gradient-to-tr from-emerald-400/30 to-sky-400/30 blur-2xl"></div>

            <h2 className="mb-4 bg-gradient-to-r from-amber-200 to-rose-200 bg-clip-text text-2xl font-bold text-transparent">
              Tips for great snippets
            </h2>
            <ul className="space-y-3 text-sm text-white/75">
              <li>• Keep titles concise and descriptive.</li>
              <li>• Include only the most relevant code.</li>
              <li>• Prefer TypeScript for better clarity.</li>
              <li>• Group snippets by category words in the title.</li>
            </ul>

            <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-white/30 to-transparent" />

            <div className="mt-6 rounded-2xl border border-white/10 bg-gradient-to-br from-emerald-950/40 via-slate-950/40 to-indigo-950/40 p-5">
              <p className="text-xs text-white/60">
                Colors on this page are tuned differently from the home screen to add visual variety:
                emeralds, cyans, skies and a hint of amber/rose for accents.
              </p>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}

export default CreateSnippetPage;
