import { site } from "@/content/site";

export default function ProofStrip() {
  return (
    <section className="proof-strip" aria-label="Production scale">
      <div className="proof-inner">
        {site.proof.map((stat) => (
          <div className="proof-stat" key={stat.label}>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
