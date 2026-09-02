"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { site } from "@/content/site";
import { useReducedMotion } from "@/lib/motion-context";
import Lightbox from "@/components/Lightbox";
import ResilientMedia from "@/components/ResilientMedia";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) videoRef.current?.pause();
    else videoRef.current?.play().catch(() => {});
  }, [reducedMotion]);

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-media" aria-hidden="true">
        <ResilientMedia
          media={site.hero.loop}
          videoRef={videoRef}
          autoPlay={!reducedMotion}
          muted
          loop
          preload="auto"
          decorative
          priority
        />
        {site.hero.loop.poster ? (
          <Image
            className="hero-reduced-still"
            src={site.hero.loop.poster}
            alt=""
            fill
            sizes="100vw"
            priority
          />
        ) : null}
      </div>
      <div className="hero-shade" />
      {site.hero.fullReel ? (
        <button
          ref={triggerRef}
          className="hero-reel-button"
          type="button"
          onClick={() => setOpen(true)}
        >
          <span aria-hidden="true">▶</span>
          Play concept reel
        </button>
      ) : null}
      <div className="hero-copy">
        <h1 id="hero-title">{site.hero.name}</h1>
        <p>{site.hero.line}</p>
        <nav aria-label="Portfolio sections">
          {site.hero.links.map((link) => (
            <a key={link.href} href={link.href}>{link.label}</a>
          ))}
        </nav>
      </div>
      <Lightbox
        open={open}
        media={site.hero.fullReel}
        title="Yash Kant Tiwary showreel"
        onClose={() => setOpen(false)}
        returnFocus={triggerRef.current}
      />
    </section>
  );
}
