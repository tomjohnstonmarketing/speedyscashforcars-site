"use client";
import { useState } from "react";

export default function AdminPage() {
  const [secret, setSecret] = useState("");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<null | { ok: boolean; message: string; count?: number }>(null);

  async function refresh() {
    setBusy(true);
    setResult(null);
    try {
      const res = await fetch("/api/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-secret": secret },
      });
      const data = await res.json();
      setResult({ ok: res.ok, message: data.message ?? (res.ok ? "Refreshed." : "Error."), count: data.count });
    } catch (e) {
      setResult({ ok: false, message: (e as Error).message });
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="container-x my-16 max-w-2xl">
      <h1 className="font-display text-3xl">Admin — Refresh from Zoho</h1>
      <p className="mt-2 text-ink-500">
        Pulls your latest published Zoho sheet, rewrites the site's locations data,
        and revalidates all location pages. Safe to click as often as you want.
      </p>

      <div className="mt-8 space-y-4 rounded-xl border border-ink-300 bg-white p-6">
        <label className="block">
          <span className="text-sm font-semibold text-ink-700">Admin secret</span>
          <input
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            placeholder="Paste ADMIN_REFRESH_SECRET value"
            className="mt-1 block w-full rounded-md border-ink-300 bg-ink-900/[0.03] px-3 py-2 ring-1 ring-ink-300 outline-none focus:ring-2 focus:ring-brand-500"
          />
        </label>
        <button
          onClick={refresh}
          disabled={busy || !secret}
          className="btn-primary disabled:opacity-50"
        >
          {busy ? "Refreshing…" : "Refresh locations from Zoho"}
        </button>

        {result && (
          <div
            className={`rounded-md p-4 text-sm ${
              result.ok ? "bg-green-50 text-green-900" : "bg-red-50 text-red-900"
            }`}
          >
            <div className="font-semibold">{result.ok ? "Success" : "Error"}</div>
            <div>{result.message}</div>
            {typeof result.count === "number" && (
              <div className="mt-1">Imported {result.count} locations.</div>
            )}
          </div>
        )}
      </div>

      <div className="mt-8 rounded-xl bg-ink-900/[0.02] p-5 text-sm text-ink-500">
        <p><strong>First-time setup:</strong></p>
        <ol className="mt-2 list-decimal space-y-1 pl-5">
          <li>In Zoho Sheet: <em>File → Publish → Publish to web → CSV</em>. Copy the URL.</li>
          <li>In Vercel project settings, set <code>ZOHO_LOCATIONS_CSV_URL</code> to that URL.</li>
          <li>Set <code>ADMIN_REFRESH_SECRET</code> to a long random string.</li>
          <li>Paste that secret above and click Refresh. Your pages update live.</li>
        </ol>
      </div>
    </main>
  );
}
