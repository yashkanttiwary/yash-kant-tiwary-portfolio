"use client";

import Image from "next/image";
import { useState, type RefObject } from "react";
import type { Media } from "@/content/site";
import Placeholder from "@/components/Placeholder";

type ResilientMediaProps = {
  media: Media;
  sizes?: string;
  priority?: boolean;
  decorative?: boolean;
  autoPlay?: boolean;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  preload?: "none" | "metadata" | "auto";
  preferPoster?: boolean;
  videoRef?: RefObject<HTMLVideoElement | null>;
  className?: string;
};

export default function ResilientMedia({
  media,
  sizes = "100vw",
  priority = false,
  decorative = false,
  autoPlay = false,
  controls = false,
  loop = false,
  muted = false,
  preload = "metadata",
  preferPoster = false,
  videoRef,
  className = "",
}: ResilientMediaProps) {
  const mediaKey = `${media.src ?? "missing"}:${media.poster ?? "no-poster"}:${preferPoster}`;
  const [status, setStatus] = useState({ key: mediaKey, failed: false, loaded: false });
  const failed = status.key === mediaKey && status.failed;
  const loaded = status.key === mediaKey && status.loaded;
  const markLoaded = () => setStatus({ key: mediaKey, failed: false, loaded: true });
  const markFailed = () => setStatus({ key: mediaKey, failed: true, loaded: false });

  const unavailable = !media.src || failed;
  const showPoster = media.kind === "video" && preferPoster && Boolean(media.poster);

  return (
    <div
      className={`resilient-media ${loaded ? "is-loaded" : "is-loading"} ${className}`.trim()}
      data-media-kind={media.kind}
      data-demo={media.demo ? "true" : undefined}
    >
      {unavailable ? (
        <Placeholder
          label={failed ? "Media could not be loaded" : media.expected}
          description={`${media.alt}. The visual is currently unavailable.`}
          className="media-fallback"
        />
      ) : showPoster ? (
        <Image
          src={media.poster as string}
          alt={decorative ? "" : media.alt}
          fill
          sizes={sizes}
          priority={priority}
          onLoad={markLoaded}
          onError={markFailed}
        />
      ) : media.kind === "image" ? (
        <Image
          src={media.src as string}
          alt={decorative ? "" : media.alt}
          fill
          sizes={sizes}
          priority={priority}
          placeholder={media.blurDataURL ? "blur" : "empty"}
          blurDataURL={media.blurDataURL}
          onLoad={markLoaded}
          onError={markFailed}
        />
      ) : (
        <video
          ref={videoRef}
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          controls={controls}
          playsInline
          preload={preload}
          poster={media.poster ?? undefined}
          aria-label={decorative ? undefined : media.alt}
          aria-hidden={decorative || undefined}
          tabIndex={decorative ? -1 : undefined}
          onCanPlay={markLoaded}
          onError={markFailed}
        >
          <source src={media.src as string} type={media.mimeType ?? "video/mp4"} />
          {media.captionSrc ? (
            <track kind="captions" src={media.captionSrc} srcLang="en" label="English" default />
          ) : null}
        </video>
      )}

      {!unavailable && !loaded ? <span className="media-loading" aria-hidden="true" /> : null}
      {media.demo ? <span className="concept-chip">Concept visual</span> : null}
    </div>
  );
}
