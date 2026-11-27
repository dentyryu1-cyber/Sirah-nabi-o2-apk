import { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Download, RotateCcw } from 'lucide-react';
import { IntroSplash } from './components/IntroSplash';
import { OfflineIndicator } from './components/OfflineIndicator';
import { PWAInstallButton } from './components/PWAInstallButton';
import { SirahLogo } from './components/SirahLogo';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [introRunId, setIntroRunId] = useState(0);
  const isNativeApp =
    import.meta.env.VITE_CAPACITOR === 'true' ||
    (typeof window !== 'undefined' &&
      Boolean(
        (window as unknown as { Capacitor?: { isNativePlatform?: () => boolean } })
          .Capacitor?.isNativePlatform?.()
      ));

  const handleCompleteIntro = useCallback(() => {
    setShowIntro(false);
  }, []);

  const handleReplayIntro = () => {
    setIntroRunId((prev) => prev + 1);
    setShowIntro(true);
  };

  return (
    <div className="flex h-dvh w-screen flex-col overflow-hidden bg-[#070D24] text-[#EAEAF5]">
      <AnimatePresence mode="wait">
        {showIntro && (
          <IntroSplash
            key={`intro-${introRunId}`}
            onComplete={handleCompleteIntro}
          />
        )}
      </AnimatePresence>

      {/* Slim 3-zone cosmic glass top bar above the 3D orbital workspace */}
      <header className="flex h-11 shrink-0 items-center justify-between gap-2 border-b border-[#E5B454]/20 bg-[#0B1230]/95 px-2.5 backdrop-blur-md sm:gap-4 sm:px-6">
        <div className="flex items-center gap-2 shrink-0 min-w-0">
          <SirahLogo size={26} />
          <span
            className="text-sm sm:text-base font-bold tracking-tight text-[#FCE6A6] whitespace-nowrap"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Sirah Nabi
          </span>
        </div>

        <p className="hidden text-xs font-medium text-[#B9C2E3] md:block truncate">
          Media Pembelajaran Kelompok 3
        </p>

        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {!isNativeApp && <PWAInstallButton />}

          <button
            type="button"
            onClick={handleReplayIntro}
            className="inline-flex min-h-[34px] shrink-0 items-center gap-1.5 rounded-lg border border-[#E5B454]/35 bg-[#121D47]/80 px-2 sm:px-2.5 py-1.5 text-xs font-semibold text-[#FCE6A6] transition-colors hover:border-[#E5B454] hover:bg-[#1B2A63] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E5B454] whitespace-nowrap cursor-pointer"
            title="Putar ulang animasi pembuka"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="hidden sm:inline">Putar Intro</span>
          </button>

          {!isNativeApp && (
            <a
              href={`${import.meta.env.BASE_URL}sirah-nabi-kelompok-3.html`}
              download="sirah-nabi-kelompok-3.html"
              className="inline-flex min-h-[34px] shrink-0 items-center gap-1.5 rounded-lg bg-gradient-to-r from-[#E5B454] to-[#C88D2B] px-2.5 sm:px-3 py-1.5 text-xs font-bold text-[#140E02] shadow-[0_2px_10px_rgba(229,180,84,0.3)] transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FCE6A6] whitespace-nowrap"
              title="Unduh versi HTML mandiri untuk dijalankan offline di HP atau Laptop"
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="sm:hidden">Unduh</span>
              <span className="hidden sm:inline">Unduh HTML</span>
            </a>
          )}
        </div>
      </header>

      {/* Embedded Sirah Nabi 3D Orbital interactive learning module */}
      <motion.main
        className="relative flex-1 min-h-0 w-full bg-[#070D24]"
        initial={false}
        animate={{ opacity: showIntro ? 0.25 : 1 }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
      >
        <iframe
          src={`${import.meta.env.BASE_URL}assets/aistudio/sirah-nabi-1_c78321d8.html`}
          title="Sirah Nabi — Kelahiran & Masa Kecil Nabi Muhammad SAW"
          className="block h-full w-full border-0"
          allowFullScreen
          allow="fullscreen"
        />
      </motion.main>

      <OfflineIndicator />
    </div>
  );
}
