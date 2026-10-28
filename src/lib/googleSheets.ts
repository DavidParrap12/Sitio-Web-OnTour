/**
 * Google Sheets integration for departure dates.
 *
 * SETUP INSTRUCTIONS:
 * 1. Create a Google Sheet with 2 columns:
 *    Column A: "mes"    → Format: YYYY-MM  (e.g. 2026-04)
 *    Column B: "dia"    → The departure day number (e.g. 17)
 *
 * 2. Go to File > Share > Publish to web
 *    - Select "Sheet1" and "CSV" format
 *    - Click "Publish"
 *
 * 3. Also make the sheet viewable: Share > Anyone with the link > Viewer
 *
 * 4. Copy the Sheet ID from the URL:
 *    https://docs.google.com/spreadsheets/d/{THIS_IS_THE_ID}/edit
 *
 * 5. Set the SHEETS_ID env variable in .env.local (local)
 *    or in Vercel Dashboard > Settings > Environment Variables:
 *    SHEETS_ID=your_sheet_id_here
 *    (GOOGLE_SHEETS_ID and NEXT_PUBLIC_SHEETS_ID are also accepted so older
 *    deployments keep working.)
 *
 * Example sheet layout:
 * | mes       | dia |
 * |-----------|-----|
 * | 2026-04   | 17  |
 * | 2026-05   | 15  |
 * | 2026-06   | 12  |
 */

/**
 * Rolling fallback schedule used only when the sheet is unreachable.
 * Days follow the historical monthly pattern so the calendar stays in the
 * future instead of silently expiring at a fixed date.
 */
const FALLBACK_DAYS_BY_MONTH = [9, 13, 13, 17, 15, 12, 10, 14, 11, 9, 13, 11];

function buildFallbackDates(now: Date = new Date()): Record<string, number> {
  const dates: Record<string, number> = {};
  const cursor = new Date(now.getFullYear(), now.getMonth(), 1);

  for (let i = 0; i < 18; i += 1) {
    const year = cursor.getFullYear();
    const monthIndex = cursor.getMonth();
    const key = `${year}-${String(monthIndex + 1).padStart(2, "0")}`;
    dates[key] = FALLBACK_DAYS_BY_MONTH[monthIndex];
    cursor.setMonth(cursor.getMonth() + 1);
  }

  return dates;
}

export type DepartureDates = Record<string, number>;

/**
 * Fetches departure dates from a public Google Sheet.
 * Falls back to a rolling schedule if the fetch fails.
 * Supports both regular Sheet IDs and published (2PACX-) IDs.
 */
export async function fetchDepartureDates(): Promise<DepartureDates> {
  const sheetId =
    process.env.SHEETS_ID?.trim() ||
    process.env.GOOGLE_SHEETS_ID?.trim() ||
    process.env.NEXT_PUBLIC_SHEETS_ID?.trim();
  const fallback = buildFallbackDates();

  if (!sheetId) {
    console.warn("[DepartureDates] No SHEETS_ID set, using fallback dates.");
    return fallback;
  }


  try {
    // Published sheets (2PACX-...) use a different URL format
    const url = sheetId.startsWith("2PACX-")
      ? `https://docs.google.com/spreadsheets/d/e/${sheetId}/pub?gid=0&single=true&output=csv`
      : `https://docs.google.com/spreadsheets/d/${sheetId}/export?format=csv&gid=0`;

    const res = await fetch(url, {
      next: { revalidate: 300 }, // Re-fetch every 5 minutes (ISR)
    });

    if (!res.ok) {
      throw new Error(`Google Sheets returned ${res.status}`);
    }

    const csv = await res.text();
    const dates = parseCSV(csv);

    if (Object.keys(dates).length === 0) {
      console.warn("[DepartureDates] Sheet returned empty data, using fallback.");
      return fallback;
    }

    console.log(
      `[DepartureDates] Loaded ${Object.keys(dates).length} departure months from Google Sheets.`
    );
    return dates;
  } catch (error) {
    console.error(
      "[DepartureDates] Failed to fetch from Google Sheets:",
      error instanceof Error ? error.message : "unknown error"
    );
    return fallback;
  }
}

/**
 * Parses a 2-column CSV into a Record<string, number>.
 * Column A = month (YYYY-MM), Column B = day number.
 * Flexible: accepts any header names, and tries multiple date formats.
 */
function parseCSV(csv: string): DepartureDates {
  const dates: DepartureDates = {};
  const lines = csv.trim().split("\n");

  if (lines.length < 2) return dates;

  // Skip header row (line 0)
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Handle comma, tab, and semicolon separators, and quoted values
    const parts = line.split(/[,;\t]/).map((s) => s.replace(/"/g, "").trim());

    if (parts.length < 2) continue;

    let month = parts[0];
    const day = parseInt(parts[1], 10);

    // Try to normalize common date formats:
    // "2026-04" or "2026-4" → "2026-04"
    // "04/2026" → "2026-04"
    // "2026/4" → "2026-04"
    if (/^\d{4}-\d{1,2}$/.test(month)) {
      // YYYY-M or YYYY-MM → normalize to YYYY-MM
      const [y, m] = month.split("-");
      month = `${y}-${m.padStart(2, "0")}`;
    } else if (/^\d{1,2}\/\d{4}$/.test(month)) {
      // MM/YYYY → YYYY-MM
      const [m, y] = month.split("/");
      month = `${y}-${m.padStart(2, "0")}`;
    } else if (/^\d{4}\/\d{1,2}$/.test(month)) {
      // YYYY/MM → YYYY-MM
      const [y, m] = month.split("/");
      month = `${y}-${m.padStart(2, "0")}`;
    } else {
      console.warn(`[DepartureDates] Skipping unrecognized format: "${month}"`);
      continue;
    }

    if (!isNaN(day) && day >= 1 && day <= 31) {
      dates[month] = day;
    }
  }

  return dates;
}

