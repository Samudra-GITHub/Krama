import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <>
      <Nav />
      <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20 text-center">
        <div className="absolute inset-0" style={{ background: "var(--krama-gradient-hero)" }} />
        <div className="noise-overlay" />
        <div className="absolute inset-0 bg-krama-bg/75" />

        <div className="relative z-10 flex flex-col items-center gap-4">
          <span className="font-display text-[7rem] font-bold leading-none text-krama-text-primary sm:text-[9rem]">
            404
          </span>
          <h1 className="font-display text-2xl font-bold uppercase text-krama-text-primary">
            This Drop Doesn&apos;t Exist
          </h1>
          <p className="max-w-sm text-sm text-krama-text-primary/60">
            The page you&apos;re looking for has either sold out or never dropped. Let&apos;s get
            you back on track.
          </p>
          <Link
            href="/"
            data-cursor="interactive"
            className="mt-4 rounded-pill bg-krama-accent px-8 py-3.5 text-xs font-semibold uppercase tracking-label text-[#04150a] shadow-[0_0_32px_rgba(34,197,94,0.45)] transition-transform hover:scale-[1.03]"
          >
            Back to Home
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
