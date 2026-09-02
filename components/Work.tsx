"use client";

import { useCallback, useState } from "react";
import { site, type CaseStudy as CaseStudyType } from "@/content/site";
import CaseStudy from "@/components/CaseStudy";
import Lightbox from "@/components/Lightbox";

export default function Work() {
  const [active, setActive] = useState<CaseStudyType | null>(null);
  const [trigger, setTrigger] = useState<HTMLElement | null>(null);
  const close = useCallback(() => setActive(null), []);

  return (
    <section id="work" className="work" aria-labelledby="work-heading">
      <h2 id="work-heading" className="sr-only">Selected work</h2>
      {site.work.map((study) => (
        <CaseStudy
          key={study.id}
          study={study}
          onOpen={(next, nextTrigger) => {
            setTrigger(nextTrigger);
            setActive(next);
          }}
        />
      ))}
      <Lightbox
        open={Boolean(active)}
        media={active?.fullPiece ?? null}
        title={active?.title ?? "Case study"}
        onClose={close}
        returnFocus={trigger}
      />
    </section>
  );
}
