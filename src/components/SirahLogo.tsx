import { motion, useReducedMotion } from 'motion/react';
import sirahAppLogo from '../assets/images/sirah_app_logo_1795337863325.jpg';

interface SirahLogoProps {
  size?: number;
  animated?: boolean;
  className?: string;
}

export function SirahLogo({ size = 160, animated = false, className = '' }: SirahLogoProps) {
  const prefersReduced = useReducedMotion();
  const shouldAnimate = animated && !prefersReduced;
  const ringPad = size >= 96 ? 12 : 4;

  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {shouldAnimate && (
        <motion.svg
          width={size + ringPad}
          height={size + ringPad}
          viewBox="0 0 200 200"
          fill="none"
          aria-hidden="true"
          className="pointer-events-none absolute"
          animate={{ rotate: 360 }}
          transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
        >
          <circle
            cx="100"
            cy="100"
            r="96"
            stroke="#FBE5A2"
            strokeWidth="1.4"
            strokeDasharray="4 6"
            opacity="0.65"
          />
        </motion.svg>
      )}

      <motion.img
        src={sirahAppLogo}
        alt="Logo Aplikasi Sirah Nabi"
        referrerPolicy="no-referrer"
        initial={shouldAnimate ? { scale: 0.78, opacity: 0, rotate: -10 } : false}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="h-full w-full rounded-full object-cover shadow-[0_6px_18px_rgba(11,58,45,0.28)] ring-2 ring-[#E5B454]/80"
      />
    </div>
  );
}
