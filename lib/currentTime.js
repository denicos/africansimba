// TEMPORARY, development only: ?testDate=2026-11-01T02:00 overrides the current time, read as Kampala time.
// Delete this file and use new Date() in WeekList and CoverFlow when testing is finished.
export function currentTime() {
  if (process.env.NODE_ENV === "development") {
    const testDate = new URLSearchParams(window.location.search).get("testDate");
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(testDate)) {
      const date = new Date(`${testDate}:00+03:00`);
      if (!Number.isNaN(date.getTime())) return date;
    }
  }
  return new Date();
}
