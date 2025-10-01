import Link from "next/link";

export function CTA({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-xl px-5 py-3 font-semibold text-white
                 bg-[linear-gradient(120deg,#7C3AED_0%,#FF6B2C_45%,#FACC15_100%)]
                 shadow-[0_28px_90px_-40px_rgba(255,107,44,0.85)] transition-transform hover:scale-[1.03]"
    >
      {children}
    </Link>
  );
}