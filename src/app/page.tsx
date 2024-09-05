"use client";

import { images } from "@/utils/data";
import { motion, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import { useEffect, useRef } from "react";

export default function Home() {
  const scrollWrapper = useRef(null);
  const scrollContent = useRef(null);

  // Smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      wrapper: scrollWrapper.current || undefined,
      content: scrollContent.current || undefined,
      orientation: "horizontal",
      gestureOrientation: "horizontal",
    });
    function raf(time: any) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  // Progress tracking
  const { scrollXProgress } = useScroll({
    container: scrollWrapper,
  });

  const progress = useTransform(scrollXProgress, [0, 1], ["0%", "100%"]);

  return (
    <main className="flex flex-col items-center min-h-screen px-20">
      <div className="w-full">
        <h1 className="font-bold tracking-wide text-[12rem] uppercase text-neutral-200">
          Images
        </h1>
      </div>
      <div
        ref={scrollWrapper}
        className="relative left-0 right-0 w-screen overflow-x-auto hide-scrollbar"
      >
        <div ref={scrollContent} className="flex px-20">
          {images.map((p) => (
            <div
              className="flex-shrink-0 w-3/4 max-h-[50vh] aspect-landscape"
              key={`project-${p.id}`}
            >
              <img
                className="w-full h-full object-cover bg-neutral-300"
                src={p.imgUrl}
                alt={p.title}
              />
            </div>
          ))}
          <div className="flex-shrink-0 w-24 pointer-events-none" />
        </div>
      </div>
      <div className="mt-6">
        <div className="w-40 h-1 rounded-full bg-neutral-200 overflow-hidden">
          <motion.div
            className="h-full bg-neutral-500"
            style={{ width: progress }}
          />
        </div>
      </div>
    </main>
  );
}
