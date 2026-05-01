import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { fetchZohoLocations } from "@/lib/zoho";
import { promises as fs } from "fs";
import path from "path";

export const runtime = "nodejs"; // we use fs
export const dynamic = "force-dynamic";

/**
 * POST /api/refresh
 *
 * Header: x-admin-secret: <ADMIN_REFRESH_SECRET>
 *
 * Pulls the latest published Zoho CSV, writes data/locations.json, and
 * revalidates home / locations / location detail pages. Returns a JSON
 * summary the admin UI can display.
 */
export async function POST(req: Request) {
  const secret = req.headers.get("x-admin-secret");
  const expected = process.env.ADMIN_REFRESH_SECRET;
  if (!expected || !secret || secret !== expected) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  if (!process.env.AIRTABLE_TOKEN || !process.env.AIRTABLE_BASE_ID || !process.env.AIRTABLE_TABLE_ID) {
    return NextResponse.json(
      { message: "Airtable env vars are not configured (need AIRTABLE_TOKEN, AIRTABLE_BASE_ID, AIRTABLE_TABLE_ID)." },
      { status: 500 },
    );
  }

  try {
    const locations = await fetchZohoLocations();
    if (locations.length === 0) {
      return NextResponse.json(
        { message: "Airtable returned zero rows — check that records exist and 'Active' is checked." },
        { status: 422 },
      );
    }

    const payload = {
      source: "zoho" as const, // legacy label; data now comes from Airtable
      generatedAt: new Date().toISOString(),
      locations,
    };

    const outPath = path.join(process.cwd(), "data", "locations.json");
    try {
      await fs.writeFile(outPath, JSON.stringify(payload, null, 2));
    } catch (err) {
      await fs.writeFile(
        path.join("/tmp", "locations.json"),
        JSON.stringify(payload, null, 2),
      );
    }

    revalidatePath("/");
    revalidatePath("/locations");
    for (const loc of locations) {
      revalidatePath(`/locations/${loc.slug}`);
    }

    return NextResponse.json({
      ok: true,
      message: "Airtable data imported and pages revalidated.",
      count: locations.length,
      generatedAt: payload.generatedAt,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ message }, { status: 500 });
  }
}
