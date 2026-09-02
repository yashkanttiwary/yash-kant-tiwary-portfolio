import { site } from "@/content/site";
import ResilientMedia from "@/components/ResilientMedia";

const ratioValues = { "16:9": "16 / 9", "4:5": "4 / 5", "3:2": "3 / 2", "1:1": "1 / 1" };
const responsiveSizes = [
  "(max-width: 640px) 44vw, 25vw",
  "(max-width: 640px) 44vw, 42vw",
  "(max-width: 640px) 39vw, 50vw",
  "(max-width: 640px) 44vw, 25vw",
  "(max-width: 640px) 76vw, 58vw",
];

export default function Playground() {
  return (
    <section className="playground" aria-labelledby="playground-heading">
      <h2 id="playground-heading" className="sr-only">Playground</h2>
      <div className="playground-frames">
        {site.playground.frames.map((frame, index) => (
          <figure
            className={`playground-frame playground-frame-${index + 1}`}
            key={frame.expected}
            style={{ aspectRatio: ratioValues[frame.ratio] }}
          >
            <ResilientMedia media={frame} sizes={responsiveSizes[index]} />
          </figure>
        ))}
      </div>
      <p className="playground-copy">{site.playground.words}</p>
      <p className="playground-demo-note">These are licensed concept photographs. Yash&apos;s final personal work will replace them.</p>
    </section>
  );
}
