import { useLanguage } from "@/contexts/LanguageContext";
import { ChevronDown, Globe, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const navRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const langBtnRef = useRef<HTMLButtonElement>(null);
  const [langPos, setLangPos] = useState({ top: 0, right: 0 });

  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  const menuItems = ["home", "about", "products", "export", "gallery", "contact"];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const initObserver = () => {
    if (!isHomePage) return;

    observerRef.current?.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );

    menuItems.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });
  };

  useEffect(() => {
    initObserver();
    return () => observerRef.current?.disconnect();
  }, [isHomePage]);

  useEffect(() => {
    if (!navRef.current || !underlineRef.current) return;

    let targetBtn: HTMLElement | null = null;

    if (location.pathname.startsWith("/blog")) {
      targetBtn = navRef.current.querySelector(`a[href="/blog"]`);
    } else if (isHomePage) {
      targetBtn = navRef.current.querySelector(`[data-id="${activeSection}"]`);
    }

    if (!targetBtn) {
      underlineRef.current.style.transform = `scaleX(0)`;
      return;
    }

    const navRect = navRef.current.getBoundingClientRect();
    const btnRect = targetBtn.getBoundingClientRect();

    underlineRef.current.style.width = `${btnRect.width}px`;
    underlineRef.current.style.transform = `translateX(${btnRect.left - navRect.left}px) scaleX(1)`;
  }, [activeSection, location.pathname, isHomePage, language]); // tambahin language di dependency

  const scrollToSection = (id: string) => {
    if (!isHomePage) {
      navigate("/", { state: { scrollTo: id } });
      return;
    }

    observerRef.current?.disconnect();
    setActiveSection(id);

    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);

    setTimeout(initObserver, 1000);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langBtnRef.current && !langBtnRef.current.contains(e.target as Node) && !(e.target as HTMLElement).closest(".lang-dropdown")) {
        setShowLangDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isHomePage && location.state && (location.state as any).scrollTo) {
      const scrollTo = (location.state as any).scrollTo;
      setTimeout(() => {
        scrollToSection(scrollTo);
        window.history.replaceState({}, document.title);
      }, 100);
    }
  }, [isHomePage, location]);

  type Language = "en" | "id" | "ko";

  const languages: { code: Language; name: string }[] = [
    { code: "en", name: t("nav.languages.en") },
    { code: "id", name: t("nav.languages.id") },
    { code: "ko", name: t("nav.languages.ko") },
  ];

  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-colors duration-200 ${isScrolled || !isHomePage ? "bg-charcoal/85 backdrop-blur shadow-lg" : "bg-transparent"}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div onClick={() => scrollToSection("home")} className="cursor-pointer flex items-center gap-3">
              <img src="/web-app-manifest-192x192.png" className="w-7 rounded-full" />
              <h1 className="text-gold font-bold text-xl">{t("nav.brand")}</h1>
            </div>

            {/* DESKTOP MENU */}
            <div ref={navRef} className="relative hidden md:flex items-center gap-4">
              {menuItems
                .filter((id) => id !== "contact")
                .map((id) => (
                  <button key={id} data-id={id} onClick={() => scrollToSection(id)} className={`nav-link ${activeSection === id && isHomePage ? "nav-active" : ""}`}>
                    {t(`nav.${id}`)}
                  </button>
                ))}

              <Link to="/blog" className={`nav-link ${location.pathname.startsWith("/blog") ? "nav-active" : ""}`}>
                Blog
              </Link>

              <button data-id="contact" onClick={() => scrollToSection("contact")} className={`nav-link ${activeSection === "contact" && isHomePage ? "nav-active" : ""}`}>
                {t("nav.contact")}
              </button>

              <span ref={underlineRef} className="nav-underline" />
            </div>

            {/* LANGUAGE BUTTON */}
            <div className="hidden md:block">
              <button
                ref={langBtnRef}
                onClick={() => {
                  if (!langBtnRef.current) return;
                  const rect = langBtnRef.current.getBoundingClientRect();
                  setLangPos({
                    top: rect.bottom + 8, // pakai bottom + offset biar pasti di bawah tombol
                    right: window.innerWidth - rect.right,
                  });

                  setShowLangDropdown((prev) => !prev);
                }}
                className="nav-link flex items-center gap-2"
              >
                <Globe className="w-4 h-4" />
                {language.toUpperCase()}
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gold">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>

      {/* 🌍 LANGUAGE DROPDOWN (DI ATAS NAV, GA KECLIP) */}
      {showLangDropdown && (
        <div
          className="fixed z-[9999] bg-charcoal border border-white/10 rounded-lg shadow-xl overflow-hidden lang-dropdown"
          style={{
            top: langPos.top, // nanti setLangPos sudah pakai rect.bottom + offset
            right: langPos.right,
          }}
        >
          {languages.map((lang, idx) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code as "en" | "id" | "ko"); // type-safe
                setShowLangDropdown(false);
              }}
              className={`block w-full text-left px-5 py-3 text-sm rounded-sm hover:bg-white/10 ${language === lang.code ? "text-gold" : "text-white"} ${idx !== languages.length - 1 ? "border-b border-white/10" : ""}`} // border tipis kecuali terakhir
            >
              {lang.name}
            </button>
          ))}
        </div>
      )}

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm">
          <div className="absolute top-20 left-0 w-full bg-charcoal p-6 space-y-4">
            {menuItems
              .filter((id) => id !== "contact")
              .map((id) => (
                <button key={id} onClick={() => scrollToSection(id)} className={`block w-full text-left nav-link ${activeSection === id && isHomePage ? "nav-active" : ""}`}>
                  {t(`nav.${id}`)}
                </button>
              ))}

            <Link to="/blog" onClick={() => setIsOpen(false)} className={`block w-full text-left nav-link ${location.pathname.startsWith("/blog") ? "nav-active" : ""}`}>
              Blog
            </Link>

            <button onClick={() => scrollToSection("contact")} className={`block w-full text-left nav-link ${activeSection === "contact" && isHomePage ? "nav-active" : ""}`}>
              {t("nav.contact")}
            </button>
          </div>
        </div>
      )}

      <style>{`
        .nav-link {
          font-family: Onest, sans-serif;
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--foreground);
          padding: 8px 10px;
          border-radius: 6px;
        }
        .nav-active {
          color: #d4af37;
        }
        .nav-underline {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 2px;
          background: #d4af37;
          transform-origin: left;
          transform: scaleX(0);
          transition:
            width 0.25s cubic-bezier(0.4, 0, 0.2, 1),
            transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          transition-delay: 0s, 0.2s;
        }
      `}</style>
    </>
  );
};

export default Navbar;
