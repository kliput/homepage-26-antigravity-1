import { motion } from "motion/react";
import { Tooltip } from "react-tooltip";

const years =
  new Date(Date.now() - Number(new Date("2013-01-01"))).getFullYear() - 1970;

const stats = [
  {
    id: "development-years",
    value: `${years}+`,
    label: "Years of devoted development",
    tooltip: "Mature and actively developed software.<br>Check out our GitHub!",
  },
  // TODO: VFS-13480
  // { value: "30M", label: "Lines of code", tooltip: "Counted across <num1> repositories." },
  {
    id: "data-providers",
    value: "110+",
    label: "Data providers",
    tooltip:
      "Total number of data providers (data centers) across the Onedata ecosystems we operate.<br>The overall figure is higher, but we do not have statistics for deployments managed by other organizations.",
  },
  {
    id: "data-spaces",
    value: "2700+",
    label: "Data spaces",
    tooltip:
      "Total number of data spaces across the Onedata ecosystems we operate.<br>The overall figure is higher, but we do not have statistics for deployments managed by other organizations.",
  },
  {
    id: "data-managed",
    value: "3.5 PB+",
    label: "Data managed",
    tooltip:
      "Total allocated storage capacity for data spaces across the Onedata ecosystems we operate.<br>The overall figure is higher, but we do not have statistics for deployments managed by other organizations.",
  },
];

function tooltipId(statId: string): string {
  return `stat-${statId}`;
}

export default function LandingStats() {
  return (
    <section className="od-border od-bg-2 border-y px-4 py-14">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 md:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="cursor-default text-center"
            data-tooltip-id={stat.id}
            data-tooltip-html={stat.tooltip}
            data-tooltip-place="bottom"
          >
            <div className="od-gradient-text mb-1 text-3xl font-bold md:text-4xl">
              {stat.value}
            </div>
            <div className="od-text-faint text-sm">{stat.label}</div>
            <Tooltip
              id={stat.id}
              style={{ maxWidth: "360px" }}
              openEvents={{ mouseenter: true, mousedown: true }}
              closeEvents={{ mouseleave: true, mouseup: true }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
