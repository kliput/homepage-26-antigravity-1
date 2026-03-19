import { motion } from "framer-motion";
import {
  BrainCircuit,
  FlaskConical,
  Satellite,
  Microscope,
  ArrowRight,
} from "lucide-react";

const cases = [
  {
    page: "UseCaseAI",
    icon: BrainCircuit,
    label: "AI / ML Research",
    title: "Train models on federated datasets without moving data",
    description:
      "AI teams at universities and labs use Onedata to aggregate training data from multiple institutional repositories. Run distributed training jobs that access data in-place across continents.",
    tags: ["PyTorch", "TensorFlow", "Hugging Face"],
    image:
      "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&q=80",
  },
  {
    page: "UseCaseEarth",
    icon: Satellite,
    label: "Earth & Space Sciences",
    title: "Manage petabytes of satellite and sensor data",
    description:
      "Geoscience teams handle continuous data streams from global sensor networks and satellite imagery. Onedata provides a unified access layer for real-time and archival datasets.",
    tags: ["NetCDF", "HDF5", "FITS"],
    image:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=600&q=80",
  },
  {
    page: "UseCaseLife",
    icon: Microscope,
    label: "Life Sciences",
    title: "Share genomics and proteomics data across institutions",
    description:
      "Research consortia use Onedata to comply with data governance policies while enabling cross-institutional data sharing for large-scale biological studies.",
    tags: ["FAIR Data", "GDPR", "Open Science"],
    image:
      "https://images.unsplash.com/photo-1628595351029-c2bf17511435?w=600&q=80",
  },
  {
    page: "UseCaseHPC",
    icon: FlaskConical,
    label: "Computational Science",
    title: "Accelerate HPC workflows with intelligent caching",
    description:
      "HPC centers use Onedata to pre-stage simulation input data and checkpoint outputs automatically. Reduce I/O bottlenecks in large-scale physics and chemistry simulations.",
    tags: ["MPI", "SLURM", "OpenMP"],
    image:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&q=80",
  },
];

export default function LandingUseCases() {
  return (
    <section id="use-cases" className="od-bg px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="od-border od-text-muted mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs">
            USE CASES
          </div>
          <h2 className="od-text mb-4 text-3xl font-bold md:text-5xl">
            Purpose-built for{" "}
            <span className="od-gradient-text">every discipline</span>
          </h2>
          <p className="od-text-muted mx-auto max-w-xl">
            From genomics to particle physics, Onedata adapts to the data needs
            of any scientific discipline.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2">
          {cases.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="od-card group block flex h-full flex-col overflow-hidden rounded-2xl">
                  <div className="h-40 overflow-hidden">
                    <img
                      src={c.image}
                      alt={c.label}
                      className="h-full w-full object-cover opacity-60 transition-all duration-500 group-hover:scale-105 group-hover:opacity-80"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-3 flex items-center gap-2">
                      <Icon className="od-accent-text h-4 w-4" />
                      <span className="od-accent-text text-xs font-semibold uppercase tracking-wide">
                        {c.label}
                      </span>
                    </div>
                    <h3 className="od-text mb-2 text-lg font-semibold leading-snug">
                      {c.title}
                    </h3>
                    <p className="od-text-muted mb-4 flex-1 text-sm leading-relaxed">
                      {c.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {c.tags.map((tag) => (
                        <span
                          key={tag}
                          className="od-text-faint od-border rounded-full border px-3 py-1 text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {/* TODO: implement use case pages */}
                    {/* <div className="od-accent-text flex items-center gap-1 text-xs font-medium">
                      Learn more <ArrowRight className="h-3.5 w-3.5" />
                    </div> */}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
