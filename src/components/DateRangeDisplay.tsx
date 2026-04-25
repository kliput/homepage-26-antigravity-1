import DateDisplay from "./DateDisplay";

export type DateRangeDisplayParams = {
  startDate: Date;
  endDate: Date;
};

export default function DateRangeDisplay({
  startDate,
  endDate,
}: DateRangeDisplayParams) {
  return (
    <div className="date-range-display flex items-center gap-2 text-[var(--od-text-muted)]">
      <DateDisplay date={startDate} />
      <span className="text-xs">—</span>
      <DateDisplay date={endDate} iconDisplayed={false} />
    </div>
  );
}
