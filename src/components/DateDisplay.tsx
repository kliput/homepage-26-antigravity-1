import { Calendar } from "lucide-react";

export type DateDisplayParams = {
  date: Date;
  iconDisplayed?: boolean;
};

export default function DateDisplay({
  date,
  iconDisplayed = true,
}: DateDisplayParams) {
  return (
    <div className="time-meta flex items-center gap-2 text-[var(--od-text-muted)]">
      {iconDisplayed && <Calendar className="h-4 w-4" />}
      <time className="text-xs" dateTime={date.toISOString()}>
        {date.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </time>
    </div>
  );
}
