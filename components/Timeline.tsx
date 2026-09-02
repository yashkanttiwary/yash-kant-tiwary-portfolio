import { site } from "@/content/site";

export default function Timeline() {
  return (
    <section className="timeline" aria-label="Creative career timeline">
      <div className="timeline-inner">
        <p>{site.timeline.line}</p>
        <ol className="timeline-track">
          {site.timeline.nodes.map((node) => (
            <li key={node.year}>
              <span className="timeline-label">{node.label}</span>
              <i aria-hidden="true" />
              <span className="timeline-year">{node.year}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
