import { motion } from "framer-motion";
import { CheckCircle, Microscope, Cpu, Globe, ArrowRight } from "lucide-react";

const demoHighlights = [
  {
    icon: Microscope,
    title: "Tailored to your use case",
    description:
      "Tell us about your research domain — genomics, climate, HPC, AI — and we'll focus the demo on workflows that matter to you.",
  },
  {
    icon: Cpu,
    title: "Live infrastructure walkthrough",
    description:
      "See a real Onedata deployment: federated storage, data spaces, provider setup, and access control in action.",
  },
  {
    icon: Globe,
    title: "Integration assessment",
    description:
      "We'll evaluate how Onedata fits your existing storage (S3, POSIX, Ceph, NFS) and compute environments.",
  },
];

const perks = [
  "30-minute focused session",
  "Zoom / Meet video call",
  "Weekdays · CET timezone",
  "Dedicated onboarding support during pilot",
];

export default function LandingContact() {
  return (
    <section id="contact" className="od-bg-2 px-4 py-24">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <div className="od-border od-text-muted mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs">
            REQUEST A DEMO
          </div>
          <h2 className="od-text mb-4 text-3xl font-bold leading-tight md:text-4xl">
            Get a demo tailored to{" "}
            <span className="od-gradient-text">your organization</span>
          </h2>
          <p className="od-text-muted mx-auto max-w-2xl">
            Onedata is a complex platform. That's why every demo is scoped to
            your specific infrastructure, research domain, and data challenges —
            so you leave with a clear path to getting started.
          </p>
        </motion.div>

        <div className="mb-10 grid gap-6 md:grid-cols-3">
          {demoHighlights.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="od-card rounded-2xl p-6"
              >
                <div className="od-gradient-bg mb-4 inline-flex rounded-xl p-2.5">
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <h3 className="od-text mb-2 font-semibold">{item.title}</h3>
                <p className="od-text-muted text-sm leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="od-card flex flex-col items-center justify-between gap-8 rounded-2xl p-8 md:flex-row"
        >
          <div>
            <p className="od-text-faint mb-2 text-xs uppercase tracking-wider">
              What to expect
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2">
              {perks.map((perk) => (
                <li
                  key={perk}
                  className="od-text-muted flex items-center gap-2 text-sm"
                >
                  <CheckCircle className="od-accent-text h-4 w-4 shrink-0" />
                  {perk}
                </li>
              ))}
            </ul>
          </div>

          <a
            href="/contact"
            className="od-gradient-bg inline-flex shrink-0 items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Book your demo
            <ArrowRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
