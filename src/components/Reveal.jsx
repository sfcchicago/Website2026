import { motion, useReducedMotion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];

export function Reveal({ children, className = "", delay = 0, y = 10, x = 0 }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.05 }}
      transition={{ duration: 0.28, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHead({ eyebrow, title, lead, center }) {
  return (
    <div className={`section-head${center ? " center" : ""}`}>
      {eyebrow && (
        <span className="badge">
          <span className="badge-dot" />
          {eyebrow}
        </span>
      )}
      {title && <h2 className="section-title" dangerouslySetInnerHTML={{ __html: title }} />}
      {lead && <p className="section-subtitle">{lead}</p>}
    </div>
  );
}
