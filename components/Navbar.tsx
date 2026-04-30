"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Services", path: "/services" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={`sticky top-0 z-50 px-6 py-4 text-white transition-all duration-300 ${
        scrolled
          ? "bg-[#0B2E4F] shadow-xl"
          : "bg-[#0B2E4F]/90 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo.png"
            alt="TAMAR Logo"
            width={220}
            height={90}
            className="h-16 w-auto object-contain scale-180"
            priority
          />
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link key={link.name} href={link.path} className="group relative">
              <span
                className={`transition ${
                  pathname === link.path
                    ? "text-[#D4AF37]"
                    : "hover:text-[#D4AF37]"
                }`}
              >
                {link.name}
              </span>

              <span
                className={`absolute -bottom-1 left-0 h-[2px] bg-[#D4AF37] transition-all duration-300 ${
                  pathname === link.path ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          ))}

          <Link
            href="/enquiry"
            className="rounded-lg bg-[#D4AF37] px-5 py-2 font-semibold text-black transition hover:scale-105"
          >
            Enquire Now
          </Link>
        </div>

        <div className="md:hidden">
          <button
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-2xl text-[#D4AF37]"
          >
            ☰
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="mt-4 space-y-4 bg-[#0B2E4F] pb-4 text-center md:hidden">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`block ${
                pathname === link.path
                  ? "text-[#D4AF37]"
                  : "hover:text-[#D4AF37]"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          <Link
            href="/enquiry"
            onClick={() => setMenuOpen(false)}
            className="inline-block rounded-lg bg-[#D4AF37] px-5 py-2 font-semibold text-black"
          >
            Enquire Now
          </Link>
        </div>
      )}
    </nav>
  );
}