import React, { useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function MouseGlow() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth trail config
  const springConfig = { damping: 25, stiffness: 150 };
  const dx = useSpring(mouseX, springConfig);
  const dy = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Use clientX/Y for "fixed" positioning relative to the viewport
      mouseX.set(e.clientX - 250);
      mouseY.set(e.clientY - 250);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      style={{
        translateX: dx,
        translateY: dy,
      }}
      // Combined into a single className
      className="pointer-events-none fixed top-0 left-0 z-[1] size-[500px] rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.08)_0%,rgba(59,130,246,0.03)_40%,transparent_70%)] blur-3xl"
    />
  );
}