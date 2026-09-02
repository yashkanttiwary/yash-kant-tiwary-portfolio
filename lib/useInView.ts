"use client";

import { useEffect, useRef, useState } from "react";

type Listener = (entry: IntersectionObserverEntry) => void;
type Pool = { observer: IntersectionObserver; listeners: Map<Element, Listener> };

const pools = new Map<string, Pool>();

function getPool(threshold: number, rootMargin: string) {
  const key = `${threshold}:${rootMargin}`;
  const existing = pools.get(key);
  if (existing) return existing;

  const listeners = new Map<Element, Listener>();
  const observer = new IntersectionObserver(
    (entries) => entries.forEach((entry) => listeners.get(entry.target)?.(entry)),
    { threshold, rootMargin },
  );
  const pool = { observer, listeners };
  pools.set(key, pool);
  return pool;
}

export function useInView<T extends Element>(threshold = 0.3, rootMargin = "0px") {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") {
      setInView(true);
      setHasEntered(true);
      return;
    }

    const pool = getPool(threshold, rootMargin);
    const listener: Listener = (entry) => {
      setInView(entry.isIntersecting);
      if (entry.isIntersecting) setHasEntered(true);
    };

    pool.listeners.set(element, listener);
    pool.observer.observe(element);
    return () => {
      pool.observer.unobserve(element);
      pool.listeners.delete(element);
      if (pool.listeners.size === 0) {
        pool.observer.disconnect();
        pools.delete(`${threshold}:${rootMargin}`);
      }
    };
  }, [rootMargin, threshold]);

  return { ref, inView, hasEntered };
}
