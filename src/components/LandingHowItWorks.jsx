import { motion } from "motion/react";

const steps = [
  {
    number: "01",
    title: "Connect your storage",
    description:
      "Register any storage backend — cloud buckets, HPC storage, institutional repositories — via simple configuration. No data movement required.",
  },
  {
    number: "02",
    title: "Define your data spaces",
    description:
      "Create virtual Spaces that aggregate multiple storage resources. Set replication, caching, and access policies per dataset.",
  },
  {
    number: "03",
    title: "Access from anywhere",
    description:
      "Use POSIX, REST API, CDMI, or our Python/R SDKs. Your AI pipeline sees a single filesystem regardless of where data lives.",
  },
  {
    number: "04",
    title: "Collaborate & govern",
    description:
      "Invite institutions, share datasets, and track provenance. Full audit logs and fine-grained permissions across the federation.",
  },
];

export default function LandingHowItWorks() {
  return (
    <section id="how-it-works" className="od-bg-2 px-4 py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="od-border od-text-muted mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs">
            HOW IT WORKS
          </div>
          <h2 className="od-text mb-4 text-3xl font-bold md:text-5xl">
            From setup to pipeline{" "}
            <span className="od-gradient-text">in minutes</span>
          </h2>
          <p className="od-text-muted mx-auto max-w-xl">
            Onedata is designed for rapid deployment. Connect your existing
            infrastructure without disrupting ongoing workflows.
          </p>
        </motion.div>

        <div className="relative">
          <div
            className="absolute bottom-0 left-1/2 top-0 hidden w-px md:block"
            style={{
              background:
                "linear-gradient(to bottom, var(--od-accent), transparent)",
            }}
          />
          <div className="space-y-12">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`flex flex-col gap-6 md:flex-row md:items-center ${i % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
              >
                <div
                  className={`flex flex-1 flex-col ${i % 2 !== 0 ? "items-end text-right" : ""}`}
                >
                  <div className="od-accent-text mb-1 font-mono text-xs font-bold">
                    {step.number}
                  </div>
                  <h3 className="od-text mb-2 text-xl font-semibold">
                    {step.title}
                  </h3>
                  <p className="od-text-muted max-w-sm text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
                <div
                  className="relative z-10 hidden h-4 w-4 flex-shrink-0 rounded-full md:flex"
                  style={{
                    background: "var(--od-accent)",
                    boxShadow: "0 0 0 4px var(--od-glow-strong)",
                  }}
                />
                <div className="flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
