"use client";

import { useEffect, useRef } from "react";
import type { CaseStudy as CaseStudyType } from "@/content/site";
import { useInView } from "@/lib/useInView";
import { useReducedMotion } from "@/lib/motion-context";
import ResilientMedia from "@/components/ResilientMedia";

type CaseStudyProps = {
  study: CaseStudyType;
  onOpen: (study: CaseStudyType, trigger: HTMLElement) => void;
};

export default function CaseStudy({ study, onOpen }: CaseStudyProps) {
  const { ref, inView, hasEntered } = useInView<HTMLDivElement>(0.3);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!videoRef.current) return;
    if (inView && !reducedMotion) videoRef.current.play().catch(() => {});
    else videoRef.current.pause();
  }, [inView, reducedMotion]);

  const visual = (
    <ResilientMedia
      media={study.media}
      sizes="100vw"
      videoRef={videoRef}
      autoPlay={inView && !reducedMotion}
      muted
      loop
      preload="none"
      decorative={!study.fullPiece}
    />
  );

  return (
    <article className="case-study">
      <div
        ref={ref}
        data-ratio={study.media.ratio}
        className={`case-media-frame ${hasEntered || reducedMotion ? "is-revealed" : ""}`}
      >
        {study.fullPiece ? (
          <button
            className="case-media-button"
            type="button"
            aria-label={`Play ${study.title}`}
            onClick={(event) => onOpen(study, event.currentTarget)}
          >
            {visual}
          </button>
        ) : (
          <div className="case-media">{visual}</div>
        )}
      </div>

      <div className="case-copy">
        <h3>{study.title}</h3>
        <dl className="case-facts">
          <div><dt>Challenge</dt><dd>{study.challenge}</dd></div>
          <div><dt>Execution</dt><dd>{study.execution}</dd></div>
          <div><dt>Result</dt><dd>{study.result}</dd></div>
        </dl>
        <dl className="case-stats">
          {study.stats.map((stat, index) => (
            <div key={`${stat.label}-${index}`}>
              <dt>{stat.value}</dt>
              <dd>{stat.label}</dd>
            </div>
          ))}
        </dl>
        {study.media.demo ? (
          <p className="concept-caption">Concept visual — open to preview the final interaction.</p>
        ) : null}
      </div>
    </article>
  );
}
