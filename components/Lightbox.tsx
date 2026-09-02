"use client";

import { useEffect, useId, useRef } from "react";
import type { Media } from "@/content/site";
import ResilientMedia from "@/components/ResilientMedia";

type LightboxProps = {
  open: boolean;
  media: Media | null;
  title: string;
  onClose: () => void;
  returnFocus?: HTMLElement | null;
};

export default function Lightbox({ open, media, title, onClose, returnFocus }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open && !dialog.open) {
      const previousOverflow = document.body.style.overflow;
      document.body.dataset.lightboxOpen = "true";
      document.body.style.overflow = "hidden";
      dialog.showModal();
      dialog.querySelector<HTMLButtonElement>(".lightbox-close")?.focus();

      return () => {
        if (dialog.open) dialog.close();
        delete document.body.dataset.lightboxOpen;
        document.body.style.overflow = previousOverflow;
        returnFocus?.focus();
      };
    }

    if (!open && dialog.open) dialog.close();
  }, [open, returnFocus]);

  if (!media) return null;

  return (
    <dialog
      ref={dialogRef}
      className="lightbox"
      aria-labelledby={titleId}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.currentTarget === event.target) onClose();
      }}
    >
      <div className="lightbox-panel">
        <h2 id={titleId} className="sr-only">{title}</h2>
        <button className="lightbox-close" type="button" onClick={onClose}>Close</button>
        <div className="lightbox-media" style={{ aspectRatio: media.ratio.replace(":", " / ") }}>
          <ResilientMedia
            media={media}
            sizes="(max-width: 800px) 94vw, 1200px"
            autoPlay={media.kind === "video"}
            controls={media.kind === "video"}
            preload="auto"
          />
        </div>
        {media.demo ? (
          <p className="lightbox-note">Concept visual only — replace with Yash&apos;s final project media before launch.</p>
        ) : null}
      </div>
    </dialog>
  );
}
