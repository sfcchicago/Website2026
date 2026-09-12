import { motion, useReducedMotion } from "framer-motion";

const ease = [0.22, 1, 0.36, 1];

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
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease }}
          >
            <span className="badge-dot" />
            {badgeText}
          </motion.span>
        )}

        <motion.h1
          className="page-title"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6, ease }}
        >
          {title}
        </motion.h1>

        {leadText && (
          <motion.p
            className="page-lead"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5, ease }}
          >
            {leadText}
          </motion.p>
        )}
      </div>
    </div>
  );
}
