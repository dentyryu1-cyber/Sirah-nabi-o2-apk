import { useState } from 'react';
import { ExternalLink, Laptop, MonitorSmartphone, Smartphone, X } from 'lucide-react';
import { usePWAInstall } from '../hooks/usePWAInstall';

export function PWAInstallButton() {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showGuide, setShowGuide] = useState(false);

  if (isInstalled) {
    return null;
  }

  const isInIframe = typeof window !== 'undefined' && window.self !== window.top;

  const handleClick = async () => {
    if (isInstallable) {
      await install();
      return;
    }
    setShowGuide(true);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className="inline-flex min-h-[34px] shrink-0 items-center gap-1.5 rounded-lg border border-[#E5B454]/45 bg-[#1B2654] px-2 sm:px-2.5 py-1.5 text-xs font-semibold text-[#FCE6A6] transition-colors hover:border-[#E5B454] hover:bg-[#24326B] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E5B454] whitespace-nowrap cursor-pointer"
        title="Pasang sebagai aplikasi di HP atau Laptop"
      >
        <MonitorSmartphone className="h-3.5 w-3.5 text-[#E5B454]" aria-hidden="true" />
        <span className="sm:hidden">{isInstallable ? 'Install' : 'Pasang'}</span>
        <span className="hidden sm:inline">
          {isInstallable ? 'Install App' : isIOS ? 'Pasang iOS' : 'Pasang di HP & Laptop'}
        </span>
      </button>

      {showGuide && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#030716]/80 p-4 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowGuide(false);
          }}
        >
          <div className="w-full max-w-md rounded-2xl border border-[#E5B454]/35 bg-[#0C1436] p-5 text-[#EAEAF5] shadow-2xl">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#E5B454]/35 bg-[#182356] text-[#F6CB77]">
                  <MonitorSmartphone className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-[#FCE6A6]">
                    Pasang di HP &amp; Laptop
                  </h3>
                  <p className="text-xs text-[#B9C2E3]">
                    Berjalan seperti aplikasi mandiri (PWA) &amp; mendukung mode offline
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowGuide(false)}
                className="rounded-lg p-1.5 text-[#B9C2E3] hover:bg-[#192456] hover:text-white cursor-pointer"
                aria-label="Tutup panduan instalasi"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {isInIframe && (
              <div className="mt-3.5 rounded-xl border border-[#E5B454]/35 bg-[#1B2552] p-3 text-xs text-[#FCE6A6]">
                <p className="leading-relaxed">
                  Saat ini Anda membuka pratinjau di dalam frame. Buka langsung di tab browser agar tombol <strong>Install App</strong> aktif:
                </p>
                <a
                  href={window.location.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-[#E5B454] px-3 py-1.5 text-xs font-bold text-[#140E02] hover:opacity-90"
                >
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Buka di Tab Browser Penuh</span>
                </a>
              </div>
            )}

            <div className="mt-4 space-y-2.5 text-xs leading-relaxed text-[#D8DFF6]">
              {isIOS ? (
                <div className="rounded-xl border border-[#E5B454]/20 bg-[#121D4A] p-3">
                  <p className="flex items-center gap-1.5 font-bold text-[#FCE6A6]">
                    <Smartphone className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Di iPhone / iPad (Safari):</span>
                  </p>
                  <p className="mt-1 text-[#C4CDE9]">
                    1. Ketuk tombol <strong>Bagikan (Share)</strong> di bilah bawah Safari.<br />
                    2. Pilih <strong>Tambah ke Layar Utama (Add to Home Screen)</strong>.
                  </p>
                </div>
              ) : (
                <>
                  <div className="rounded-xl border border-[#E5B454]/20 bg-[#121D4A] p-3">
                    <p className="flex items-center gap-1.5 font-bold text-[#FCE6A6]">
                      <Smartphone className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Di HP Android (Jadi Aplikasi Layar Utama):</span>
                    </p>
                    <p className="mt-1 text-[#C4CDE9]">
                      Buka link langsung di Chrome → ketuk menu <strong>⋮</strong> di kanan atas → pilih <strong>Install aplikasi / Tambahkan ke layar utama</strong>. Ikon Sirah Nabi akan muncul di HP dan terbuka layar penuh tanpa browser (bisa offline).
                    </p>
                  </div>
                  <div className="rounded-xl border border-[#E5B454]/20 bg-[#121D4A] p-3">
                    <p className="flex items-center gap-1.5 font-bold text-[#FCE6A6]">
                      <Laptop className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Di Laptop (Windows / Mac — Chrome, Edge, Safari):</span>
                    </p>
                    <p className="mt-1 text-[#C4CDE9]">
                      Klik ikon <strong>Install (⊕ / layar dengan panah)</strong> di kanan bilah alamat browser, atau menu <strong>⋮ → Apps → Install Sirah Nabi</strong> (di Safari Mac: <strong>File → Add to Dock</strong>).
                    </p>
                  </div>
                  <div className="rounded-xl border border-[#E5B454]/15 bg-[#0F183E] p-2.5 text-[11px] text-[#B9C2E3]">
                    Butuh file installer <strong className="text-[#FCE6A6]">.apk</strong>? Deploy ke GitHub Pages lalu masukkan URL-nya ke <strong className="text-[#FCE6A6]">pwabuilder.com</strong> untuk membungkusnya menjadi APK Android.
                  </div>
                </>
              )}
            </div>

            <button
              type="button"
              onClick={() => setShowGuide(false)}
              className="mt-4 w-full rounded-xl bg-gradient-to-r from-[#E5B454] to-[#C88D2B] py-2.5 text-xs font-bold text-[#140E02] hover:opacity-95 cursor-pointer"
            >
              Mengerti
            </button>
          </div>
        </div>
      )}
    </>
  );
}
