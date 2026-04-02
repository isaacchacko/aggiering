"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function ViewCounter() {
  const pathname = usePathname();
  const [count, setCount] = useState<number | null>(null);
  const [show, setShow] = useState(true);

  useEffect(() => {
    const ac = new AbortController();
    (async () => {
      try {
        const res = await fetch("/api/views", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pathname }),
          signal: ac.signal,
        });
        if (!res.ok) {
          setShow(false);
          return;
        }
        const data = (await res.json()) as { count: number };
        if (!ac.signal.aborted) {
          setCount(data.count);
        }
      } catch {
        if (!ac.signal.aborted) {
          setShow(false);
        }
      }
    })();
    return () => ac.abort();
  }, [pathname]);

  if (!show) {
    return null;
  }

  if (count === null) {
    return (
      <p
        className="min-w-0 text-right text-[11px] tabular-nums text-neutral-400 dark:text-neutral-500 sm:text-xs"
        aria-hidden
      >
        …
      </p>
    );
  }

  return (
    <p
      className="min-w-0 text-right text-[11px] tabular-nums text-neutral-500 dark:text-neutral-400 sm:text-xs"
      title={`${count.toLocaleString()} page views`}
      aria-live="polite"
    >
      {count.toLocaleString()} views
    </p>
  );
}
