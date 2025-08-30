"use client";

import type { Snippet } from "@/generated/prisma";
import Link from "next/link";
import { useState } from "react";

const EditPageSnippet = ({ snippet }: { snippet: Snippet }) => {
  const [code, setCode] = useState(snippet.code);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );

  const handleSave = async () => {
    if (code === snippet.code) {
      setSaveStatus("idle");
      return;
    }

    setIsSaving(true);
    setSaveStatus("idle");

    try {
      const response = await fetch(`/api/snippets/${snippet.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      if (response.ok) {
        setSaveStatus("success");
        // update in-memory reference so the "no changes" check works next time
        snippet.code = code;
        setTimeout(() => setSaveStatus("idle"), 2000);
      } else {
        throw new Error("Failed to save");
      }
    } catch (error) {
      console.error("Error saving snippet:", error);
      setSaveStatus("error");
      setTimeout(() => setSaveStatus("idle"), 3000);
    } finally {
      setIsSaving(false);
    }
  };

  const getSaveButtonContent = () => {
    if (isSaving) return "Saving...";
    if (saveStatus === "success") return "✓ Saved!";
    if (saveStatus === "error") return "✗ Error";
    return "Save Changes";
  };

  const getSaveButtonStyles = () => {
    if (saveStatus === "success") {
      return "from-emerald-500 via-teal-600 to-cyan-600 hover:from-emerald-600 hover:via-teal-700 hover:to-cyan-700";
    }
    if (saveStatus === "error") {
      return "from-rose-600 via-red-600 to-orange-500 hover:from-rose-700 hover:via-red-700 hover:to-orange-600";
    }
    return "from-fuchsia-600 via-violet-600 to-sky-600 hover:from-fuchsia-700 hover:via-violet-700 hover:to-sky-700";
  };

  return (
    <div className="relative min-h-dvh overflow-hidden bg-gradient-to-br from-[#120b2a] via-[#1b0b36] to-[#3a0a2b]">
      {/* Subtle grid */}
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-20 [background:radial-gradient(#ffffff1f_1px,transparent_1px)] [background-size:22px_22px]" />

      {/* Aurora blobs */}
      <div className="pointer-events-none absolute -top-40 -left-24 size-[34rem] rounded-full bg-[conic-gradient(at_25%_25%,#34d399_12%,#22d3ee_28%,#a78bfa_48%,#f472b6_64%,transparent_70%)] blur-3xl opacity-25 animate-pulse" />
      <div className="pointer-events-none absolute -bottom-48 -right-10 size-[38rem] rounded-full bg-[conic-gradient(at_75%_75%,#f59e0b_12%,#60a5fa_32%,#10b981_52%,#fb7185_68%,transparent_74%)] blur-3xl opacity-25 animate-pulse [animation-delay:900ms]" />

      {/* Toast/status */}
      {saveStatus !== "idle" && (
        <div className="pointer-events-none fixed right-6 top-6 z-50">
          <div
            className={[
              "rounded-2xl px-4 py-2.5 text-sm font-medium shadow-2xl ring-1 backdrop-blur-md",
              saveStatus === "success"
                ? "bg-emerald-500/15 text-emerald-200 ring-emerald-400/30"
                : "bg-rose-500/15 text-rose-200 ring-rose-400/30",
            ].join(" ")}
          >
            {saveStatus === "success" ? "Saved successfully" : "Failed to save"}
          </div>
        </div>
      )}

      <main className="relative z-10 mx-auto max-w-7xl px-6 py-14">
        {/* Header */}
        <header className="mb-8 flex flex-col justify-between gap-6 sm:mb-10 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-balance bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-amber-300 bg-clip-text text-4xl font-black tracking-tight text-transparent md:text-6xl">
              Edit Snippet
            </h1>
            <div className="mt-3 inline-flex max-w-full items-center gap-2">
              <span className="truncate rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/75 ring-1 ring-white/15">
                {snippet.title}
              </span>
              <span className="rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white/60 ring-1 ring-white/10">
                ID #{snippet.id}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/snippet/${snippet.id}`}
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white/80 shadow-lg backdrop-blur-xl transition-all hover:scale-[1.02] hover:bg-white/15 hover:text-white"
            >
              <span className="inline-block transition-transform group-hover:-translate-x-0.5">←</span>
              Back to snippet
            </Link>
          </div>
        </header>

        {/* Editor Shell */}
        <section className="overflow-hidden rounded-3xl border border-white/12 bg-white/8 shadow-2xl backdrop-blur-2xl">
          {/* Toolbar */}
          <div className="flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-slate-900/60 via-indigo-900/60 to-fuchsia-900/50 px-5 py-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-red-400/80 shadow-[0_0_12px_1px_rgba(248,113,113,0.45)]" />
                <span className="size-2 rounded-full bg-yellow-400/80 shadow-[0_0_12px_1px_rgba(250,204,21,0.45)]" />
                <span className="size-2 rounded-full bg-emerald-400/80 shadow-[0_0_12px_1px_rgba(52,211,153,0.45)]" />
              </div>
              <div className="ml-3 rounded-lg bg-gradient-to-r from-violet-600 to-pink-600 px-3 py-1 text-xs font-semibold text-white shadow">
                JavaScript
              </div>
              <div className="hidden text-xs text-white/60 sm:block">Monospace editor</div>
            </div>

            <div className="flex items-center gap-2">
              <span className="size-2 animate-pulse rounded-full bg-emerald-400" />
              <span className="text-xs font-medium text-emerald-300">Live preview</span>
            </div>
          </div>

          {/* Editor */}
          <div className="relative">
            {/* highlight shine */}
            <div className="pointer-events-none absolute -inset-x-6 -top-6 h-24 bg-gradient-to-b from-white/15 to-transparent blur-2xl" />
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              className="h-[68vh] w-full resize-none bg-gradient-to-br from-slate-950/80 via-slate-950/70 to-slate-950/80 p-5 font-mono text-[13px] leading-relaxed text-slate-100 outline-none ring-0 placeholder:text-slate-400/60"
              placeholder="// Paste or edit your code here..."
            />
          </div>

          {/* Footer actions */}
          <div className="flex flex-col gap-3 border-t border-white/10 bg-gradient-to-r from-slate-900/50 to-slate-900/30 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-xs text-white/50">
              Tip: Press Ctrl/Cmd+S to save quickly
            </div>

            <div className="flex items-center justify-end gap-3">
              <Link
                href={`/snippet/${snippet.id}`}
                className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/8 px-5 py-2.5 text-sm font-medium text-white/80 shadow-lg backdrop-blur-xl transition-all hover:scale-[1.02] hover:bg-white/12 hover:text-white"
              >
                Cancel
              </Link>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className={[
                  "inline-flex items-center justify-center rounded-xl border border-white/10 bg-gradient-to-r px-6 py-2.5 text-sm font-semibold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-white/20",
                  getSaveButtonStyles(),
                  isSaving ? "opacity-90" : "",
                ].join(" ")}
              >
                <span className="mr-2">💾</span>
                {getSaveButtonContent()}
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default EditPageSnippet;
