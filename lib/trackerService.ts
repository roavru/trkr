import { File, Paths, Directory } from "expo-file-system";
import type { TrackerInfo, TrackerType } from "./types";

// ── Helpers ──────────────────────────────────────────────

export function getTodayISO(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export function sanitizeName(name: string): string {
  return name.trim().replace(/[^a-zA-Z0-9_\- ]/g, "");
}

function parseCSV(content: string): string[][] {
  return content
    .trim()
    .split("\n")
    .map((row) => row.split(","));
}

function serializeCSV(rows: string[][]): string {
  return rows.map((r) => r.join(",")).join("\n") + "\n";
}

// ── Directory ────────────────────────────────────────────

export function getTrackersDir(): Directory {
  const dir = new Directory(Paths.document, "trackers");
  if (!dir.exists) dir.create();
  return dir;
}

// ── CRUD ─────────────────────────────────────────────────

export function loadTrackers(): TrackerInfo[] {
  const dir = getTrackersDir();
  const items = dir.list();
  const today = getTodayISO();
  const trackers: TrackerInfo[] = [];

  for (const item of items) {
    if (item instanceof File && item.name.endsWith(".csv")) {
      const content = item.textSync();
      const rows = parseCSV(content);
      if (rows.length === 0) continue;

      const header = rows[0];
      const isBool = header[1]?.trim() === "valor";
      const type: TrackerType = isBool ? "bool" : "numeric";
      const displayName = item.name.replace(".csv", "");

      let todayValue: number | null = null;
      for (let i = 1; i < rows.length; i++) {
        if (rows[i][0]?.trim() === today) {
          todayValue = parseInt(rows[i][1]?.trim() || "0", 10);
          break;
        }
      }

      trackers.push({ name: displayName, fileName: item.name, type, todayValue });
    }
  }
  return trackers;
}

export function createTracker(name: string, type: TrackerType): void {
  const sanitized = sanitizeName(name);
  if (!sanitized) return;

  const dir = getTrackersDir();
  const header = type === "bool" ? "fecha,valor\n" : "fecha,cantidad\n";
  const csvFile = new File(dir, sanitized + ".csv");
  csvFile.write(header);
}

export function deleteTracker(fileName: string): void {
  const dir = getTrackersDir();
  const csvFile = new File(dir, fileName);
  if (csvFile.exists) csvFile.delete();
}

export function renameTracker(oldFileName: string, newName: string): void {
  const sanitized = sanitizeName(newName);
  if (!sanitized) return;

  const dir = getTrackersDir();
  const oldFile = new File(dir, oldFileName);
  if (oldFile.exists) oldFile.rename(sanitized + ".csv");
}

// ── Tracking actions ─────────────────────────────────────

export function toggleBoolTracker(tracker: TrackerInfo): void {
  const dir = getTrackersDir();
  const csvFile = new File(dir, tracker.fileName);
  const content = csvFile.textSync();
  const today = getTodayISO();
  const rows = parseCSV(content);

  const isDoneToday = tracker.todayValue !== null;

  if (isDoneToday) {
    const filtered = rows.filter((r, i) => i === 0 || r[0]?.trim() !== today);
    csvFile.write(serializeCSV(filtered));
  } else {
    csvFile.write(content + `${today},1\n`);
  }
}

export function incrementNumericTracker(tracker: TrackerInfo): void {
  const dir = getTrackersDir();
  const csvFile = new File(dir, tracker.fileName);
  const content = csvFile.textSync();
  const today = getTodayISO();
  const rows = parseCSV(content);

  let found = false;
  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0]?.trim() === today) {
      const current = parseInt(rows[i][1]?.trim() || "0", 10);
      rows[i][1] = String(current + 1);
      found = true;
      break;
    }
  }
  if (!found) {
    rows.push([today, "1"]);
  }
  csvFile.write(serializeCSV(rows));
}

export function decrementNumericTracker(tracker: TrackerInfo): void {
  if (tracker.todayValue === null || tracker.todayValue <= 0) return;

  const dir = getTrackersDir();
  const csvFile = new File(dir, tracker.fileName);
  const content = csvFile.textSync();
  const today = getTodayISO();
  const rows = parseCSV(content);

  for (let i = 1; i < rows.length; i++) {
    if (rows[i][0]?.trim() === today) {
      const current = parseInt(rows[i][1]?.trim() || "0", 10);
      if (current <= 1) {
        rows.splice(i, 1);
      } else {
        rows[i][1] = String(current - 1);
      }
      break;
    }
  }
  csvFile.write(serializeCSV(rows));
}

export function trackAction(tracker: TrackerInfo): void {
  if (tracker.type === "bool") {
    toggleBoolTracker(tracker);
  } else {
    incrementNumericTracker(tracker);
  }
}
