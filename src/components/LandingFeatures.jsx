import { motion } from "motion/react";
import { Database, HardDrive, Lock, Zap, Globe, Layers } from "lucide-react";

const features = [
  {
    icon: Database,
    title: "Unified Virtual Filesystem",
    description:
      "Mount any storage backend — S3, POSIX, Ceph, NFS — as a single global namespace. No data migration needed.",
    color: "from-red-500 to-orange-500",
    page: "FeatureUnifiedFS",
  },
  {
    icon: Zap,
    title: "High-Performance Data Access",
    description:
      "Optimized for AI training workloads. Stream petabytes across WAN with minimal latency using our intelligent caching layer.",
    color: "from-rose-500 to-red-500",
    page: "FeatureHighPerformance",
  },
  {
    icon: Globe,
    title: "Hybrid Cloud Ready",
    description:
      "Seamlessly span on-premises HPC clusters, AWS, GCP, Azure, and institutional storage in one unified environment.",
    color: "from-orange-500 to-amber-500",
    page: "FeatureHybridCloud",
  },
  {
    icon: HardDrive,
    title: "S3 & POSIX Hybrid Access",
    description:
      "Access the same dataset via a fully S3-compatible API or mount it as a native POSIX filesystem — no duplication, no trade-offs. Ideal for cloud-native pipelines and HPC workloads alike.",
    color: "from-red-600 to-rose-400",
    page: "FeatureS3POSIX",
  },
  {
    icon: Lock,
    title: "Fine-Grained Access Control",
    description:
      "Attribute-based access control per dataset, file, or directory. Built for multi-organization research collaborations.",
    color: "from-rose-600 to-pink-500",
    page: "FeatureFineGrained",
  },
  {
    icon: Layers,
    title: "Space & Replication Policies",
    description:
      "Define exactly where and how many replicas of your data exist. Auto-balance storage across federated providers.",
    color: "from-red-500 to-rose-600",
    page: "FeatureSpaceReplication",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function LandingFeatures() {
  return (
    <section id="features" className="od-bg px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="od-border od-text-muted mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs">
            PLATFORM CAPABILITIES
          </div>
          <h2 className="od-text mb-4 text-3xl font-bold md:text-5xl">
            Built for the complexity of{" "}
            <span className="od-gradient-text">modern research</span>
          </h2>
          <p className="od-text-muted mx-auto max-w-xl">
            Onedata addresses the real challenges of managing petabyte-scale
            datasets across heterogeneous compute and storage environments.
          </p>
        </motion.div>

        <div className="grid auto-rows-fr gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <div className="feature-container">
                <motion.div
                  custom={i}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                  viewport={{ once: true, margin: "-60px" }}
                  className="od-card group relative overflow-hidden rounded-2xl p-6"
                  style={{ transition: "box-shadow 0.3s" }}
                >
                  {/* Subtle glow on hover */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
                  />

                  {/* Icon with spin-in + hover pulse */}
                  <motion.div
                    initial={{ scale: 0.7, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 + 0.2 }}
                    whileHover={{
                      scale: 1.15,
                      rotate: 6,
                      transition: { duration: 0.2 },
                    }}
                    className={`inline-flex rounded-xl bg-gradient-to-br p-2.5 ${feature.color} mb-4 opacity-90`}
                  >
                    <Icon className="h-5 w-5 text-white" />
                  </motion.div>

                  <h3 className="od-text mb-2 text-lg font-semibold">
                    {feature.title}
                  </h3>
                  <p className="od-text-muted text-sm leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Bottom accent line slides in on hover */}
                  <motion.div
                    className={`absolute bottom-0 left-0 right-0 h-0.5 rounded-b-2xl bg-gradient-to-r ${feature.color}`}
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{ originX: 0 }}
                  ></motion.div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
