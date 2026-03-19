import { motion } from "motion/react";

const stats = [
  { value: "100+", label: "Research institutions" },
  { value: "50PB+", label: "Data managed" },
  { value: "30+", label: "Countries" },
  { value: "10x", label: "Faster data access" },
];

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
            className="text-center"
          >
            <div className="od-gradient-text mb-1 text-3xl font-bold md:text-4xl">
              {stat.value}
            </div>
            <div className="od-text-faint text-sm">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
