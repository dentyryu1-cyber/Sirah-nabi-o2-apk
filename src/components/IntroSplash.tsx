import { useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { SirahLogo } from './SirahLogo';

interface IntroSplashProps {
  onComplete: () => void;
}

const TITLE_WORDS = ['Sirah', 'Nabi'];
const GROUP_WORDS = ['Media', 'Pembelajaran', 'Kelompok', '3'];

const STARS = [
  { cx: '12%', cy: '18%', r: 1.6, delay: 0.2 },
  { cx: '24%', cy: '12%', r: 1.2, delay: 0.9 },
  { cx: '78%', cy: '15%', r: 1.8, delay: 0.5 },
  { cx: '88%', cy: '28%', r: 1.3, delay: 1.4 },
  { cx: '16%', cy: '76%', r: 1.4, delay: 1.1 },
  { cx: '84%', cy: '72%', r: 1.6, delay: 0.7 },
  { cx: '66%', cy: '10%', r: 1.1, delay: 1.6 },
  { cx: '34%', cy: '84%', r: 1.3, delay: 0.4 },
];

export function IntroSplash({ onComplete }: IntroSplashProps) {
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const durationMs = prefersReduced ? 3200 : 5800;
    const timer = window.setTimeout(onComplete, durationMs);
    return () => window.clearTimeout(timer);
  }, [onComplete, prefersReduced]);

  return (
    <motion.section
      key="intro-splash"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.03, filter: 'blur(6px)' }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden px-6 py-10 text-center select-none"
      style={{
        background:
          'radial-gradient(circle at 50% 38%, #155E4A 0%, #0B3A2D 48%, #06211A 100%)',
      }}
      aria-label="Pembuka Aplikasi Sirah Nabi"
    >
      {/* Subtle geometric lattice pattern */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]"
        aria-hidden="true"
      >
        <defs>
          <pattern id="islamicGrid" width="72" height="72" patternUnits="userSpaceOnUse">
            <path
              d="M36 0 L44 28 L72 36 L44 44 L36 72 L28 44 L0 36 L28 28 Z"
              fill="none"
              stroke="#FBE5A2"
              strokeWidth="0.9"
            />
            <circle cx="36" cy="36" r="10" fill="none" stroke="#FBE5A2" strokeWidth="0.7" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#islamicGrid)" />
      </svg>

      {/* Ambient celestial starfield */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        {STARS.map((star, idx) => (
          <motion.circle
            key={idx}
            cx={star.cx}
            cy={star.cy}
            r={star.r}
            fill="#FFF3C4"
            initial={{ opacity: 0.25 }}
            animate={
              prefersReduced
                ? { opacity: 0.5 }
                : { opacity: [0.2, 0.9, 0.2], scale: [1, 1.25, 1] }
            }
            transition={
              prefersReduced
                ? undefined
                : {
                    duration: 3.2,
                    delay: star.delay,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }
            }
          />
        ))}
      </svg>

      {/* Soft golden aura behind logo */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute h-80 w-80 rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(229, 180, 84, 0.28) 0%, rgba(229, 180, 84, 0.06) 52%, transparent 74%)',
          top: 'calc(50% - 14rem)',
        }}
        initial={prefersReduced ? false : { scale: 0.65, opacity: 0 }}
        animate={
          prefersReduced
            ? { scale: 1, opacity: 1 }
            : { scale: [0.85, 1.08, 1], opacity: [0, 0.95, 0.8] }
        }
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Main Centered Choreography */}
      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center">
        {/* 1. Custom Animated Logo */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 18, scale: 0.88 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 drop-shadow-[0_14px_34px_rgba(0,0,0,0.45)]"
        >
          <SirahLogo size={156} animated />
        </motion.div>

        {/* 2. Animated "Sirah Nabi" Display Title */}
        <h1
          className="flex flex-wrap items-center justify-center gap-x-4 text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl"
          style={{ fontFamily: 'var(--font-display)', textWrap: 'balance' }}
        >
          {TITLE_WORDS.map((word, wordIdx) => (
            <span key={word} className="inline-flex overflow-hidden py-1">
              {word.split('').map((char, charIdx) => {
                const index = wordIdx * 6 + charIdx;
                return (
                  <motion.span
                    key={`${word}-${charIdx}`}
                    initial={prefersReduced ? false : { y: '115%', opacity: 0 }}
                    animate={{ y: '0%', opacity: 1 }}
                    transition={{
                      duration: 0.55,
                      delay: prefersReduced ? 0 : 0.72 + index * 0.055,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="inline-block bg-gradient-to-b from-[#FFFDF7] via-[#FCE6A6] to-[#DDA43B] bg-clip-text text-transparent"
                  >
                    {char}
                  </motion.span>
                );
              })}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={prefersReduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.65,
            delay: prefersReduced ? 0 : 1.45,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mt-2 max-w-md text-sm font-medium tracking-wide text-[#DFECE4] sm:text-base"
        >
          Kelahiran &amp; Masa Kecil Nabi Muhammad SAW
        </motion.p>

        {/* 3. Ornamental Golden Divider */}
        <div className="my-6 flex w-full max-w-xs items-center justify-center gap-3">
          <motion.div
            className="h-[1px] flex-1 origin-right bg-gradient-to-l from-[#E5B454] to-transparent"
            initial={prefersReduced ? false : { scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 0.85 }}
            transition={{
              duration: 0.7,
              delay: prefersReduced ? 0 : 1.75,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
          <motion.svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            aria-hidden="true"
            initial={prefersReduced ? false : { scale: 0, rotate: -45, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: prefersReduced ? 0 : 1.9,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <polygon points="7,0 14,7 7,14 0,7" fill="#E5B454" />
          </motion.svg>
          <motion.div
            className="h-[1px] flex-1 origin-left bg-gradient-to-r from-[#E5B454] to-transparent"
            initial={prefersReduced ? false : { scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 0.85 }}
            transition={{
              duration: 0.7,
              delay: prefersReduced ? 0 : 1.75,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        </div>

        {/* 4. Animated "Media Pembelajaran Kelompok 3" with 3D Kelompok 3 */}
        <div
          className="flex flex-col items-center justify-center gap-3 px-2"
          aria-label="Media Pembelajaran Kelompok 3"
        >
          <div className="flex flex-wrap items-center justify-center gap-x-2.5">
            {GROUP_WORDS.slice(0, 2).map((word, idx) => (
              <motion.span
                key={word}
                initial={
                  prefersReduced
                    ? false
                    : { opacity: 0, y: 18, letterSpacing: '0.18em' }
                }
                animate={{ opacity: 1, y: 0, letterSpacing: '0.12em' }}
                transition={{
                  duration: 0.7,
                  delay: prefersReduced ? 0 : 2.05 + idx * 0.2,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block text-sm font-semibold uppercase tracking-[0.12em] text-[#DFECE4] sm:text-base"
              >
                {word}
              </motion.span>
            ))}
          </div>

          {/* 3D Perspective Stage for KELOMPOK 3 */}
          <div style={{ perspective: '900px' }}>
            <motion.div
              initial={
                prefersReduced
                  ? false
                  : { opacity: 0, rotateX: 38, rotateY: -14, scale: 0.82, y: 24 }
              }
              animate={
                prefersReduced
                  ? { opacity: 1 }
                  : {
                      opacity: 1,
                      rotateX: [8, 4, 8],
                      rotateY: [-5, 5, -5],
                      scale: 1,
                      y: 0,
                    }
              }
              transition={
                prefersReduced
                  ? { duration: 0.5 }
                  : {
                      opacity: { duration: 0.7, delay: 2.45 },
                      scale: { duration: 0.8, delay: 2.45, ease: [0.16, 1, 0.3, 1] },
                      y: { duration: 0.8, delay: 2.45, ease: [0.16, 1, 0.3, 1] },
                      rotateX: { duration: 5, delay: 2.45, repeat: Infinity, ease: 'easeInOut' },
                      rotateY: { duration: 6, delay: 2.45, repeat: Infinity, ease: 'easeInOut' },
                    }
              }
              style={{ transformStyle: 'preserve-3d' }}
              className="relative rounded-2xl border border-[#FBE5A2]/45 bg-gradient-to-br from-[#166D55]/95 via-[#0E4A39]/95 to-[#072B21]/95 px-7 py-3 shadow-[0_22px_40px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,248,214,0.45)]"
            >
              <span
                className="block text-2xl font-extrabold uppercase tracking-[0.09em] text-[#FFF4CC] sm:text-3xl md:text-4xl"
                style={{
                  transform: 'translateZ(20px)',
                  textShadow:
                    '0 1px 0 #D9A13B, 0 2px 0 #BD8726, 0 3px 0 #9D6C17, 0 4px 0 #7E530D, 0 5px 0 #5E3C06, 0 10px 20px rgba(0, 0, 0, 0.55)',
                }}
              >
                Kelompok 3
              </span>
            </motion.div>
          </div>
        </div>

        {/* 5. Progress Bar & Direct Enter Action */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: prefersReduced ? 0 : 2.95,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mt-10 flex w-full max-w-xs flex-col items-center gap-4"
        >
          <div className="h-1 w-full overflow-hidden rounded-full bg-white/15">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#C88D2B] via-[#FCE6A6] to-[#E5B454]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: prefersReduced ? 3.0 : 5.5,
                ease: 'linear',
              }}
              style={{ transformOrigin: 'left center' }}
            />
          </div>

          <button
            type="button"
            onClick={onComplete}
            className="inline-flex min-h-[44px] items-center justify-center gap-2 rounded-xl border border-[#E5B454]/55 bg-[#FFFDF9] px-6 py-2.5 text-sm font-semibold text-[#0B3A2D] shadow-lg transition-transform duration-150 hover:-translate-y-0.5 hover:bg-[#FCE9C4] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FBE5A2] active:scale-95 whitespace-nowrap cursor-pointer"
          >
            <span>Masuk Aplikasi</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
}
