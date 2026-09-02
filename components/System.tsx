"use client";

import type { CSSProperties } from "react";
import { site } from "@/content/site";
import { useInView } from "@/lib/useInView";
import { useReducedMotion } from "@/lib/motion-context";

function delayStyle(delay: number) {
  return { "--delay": `${delay}ms` } as CSSProperties;
}

export default function System() {
  const { ref, hasEntered } = useInView<HTMLElement>(0.4);
  const reducedMotion = useReducedMotion();
  const active = hasEntered || reducedMotion;

  return (
    <section ref={ref} id="system" aria-labelledby="system-heading" className={`system ${active ? "system--active" : ""}`}>
      <div className="system-inner">
        <div className="system-intro">
          <h2 id="system-heading">{site.system.heading}</h2>
          <p>{site.system.body}</p>
        </div>

        <div className="system-diagram" aria-label="A seven-step content system with a feedback loop">
          <ol className="system-flow">
            {site.system.nodes.map((node, index) => (
              <li className="system-flow-node" key={node} style={delayStyle(index * 100)}>
                <span className="system-step" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <span>{node}</span>
              </li>
            ))}
          </ol>
          <p className="system-loop-label">
            <span aria-hidden="true">↳</span> {site.system.loopLabel}
          </p>
        </div>

        <div className="turnaround" aria-label="Turnaround reduced from one to one and a half days to about half a day">
          <div className="turnaround-row turnaround-before">
            <span>{site.system.before.label}</span>
            <div className="turnaround-track"><i /></div>
            <strong>{site.system.before.value}</strong>
          </div>
          <div className="turnaround-row turnaround-after">
            <span>{site.system.after.label}</span>
            <div className="turnaround-track"><i style={{ width: `${site.system.after.weight * 100}%` }} /></div>
            <strong>{site.system.after.value}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}
