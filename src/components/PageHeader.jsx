import { motion, useReducedMotion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

export default function PageHeader({ eyebrow, badge, title, lead, subtitle, className = "" }) {
  const reduce = useReducedMotion();
  const badgeText = eyebrow || badge;
  const leadText = lead || subtitle;

  return (
    <div className={`page-header ${className}`.trim()}>
      <div className="container">
        {badgeText && (
          <motion.span
            className="badge"
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22, ease }}
          >
            <span className="badge-dot" />
            {badgeText}
          </motion.span>
        )}

        <motion.h1
          className="page-title"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.04, duration: 0.26, ease }}
        >
          {title}
        </motion.h1>

        {leadText && (
          <motion.p
            className="page-lead"
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.24, ease }}
          >
            {leadText}
          </motion.p>
        )}
      </div>
    </div>
  );
}
