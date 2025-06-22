"use client";
import { useState, useEffect, useRef, CSSProperties } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useNavbar } from "./navbar-context";

type PreviewKey = "home" | "test" | "projects" | "none" | null;

// When hovering over a link, preview content of the section
// is displayed over the blurred background on selected links
// otherwise, the logo is displayed over the blurred background
const LINK_PREVIEWS: Array<{ key: PreviewKey; content: React.ReactNode }> = [
  {
    key: "home",
    content: (
      <div className="w-full h-full text-white text-5xl font-bold flex items-center justify-center">
        HOME
      </div>
    ),
  },
  {
    key: "test",
    content: (
      <div className="w-full h-full text-white text-5xl font-bold flex items-center justify-center">
        TEST
      </div>
    ),
  },
  {
    key: "projects",
    content: (
      <div className="w-full h-full text-white text-5xl font-bold flex items-center justify-center">
        PROJECTS
      </div>
    ),
  },
];

const SECTION_LIST = ["Section1", "Section2", "Photos", "Legal", "About"];

export default function Nav() {
  const {
    isOpen,
    setIsOpen,
    activeSection,
    setActiveSection,
    shouldRender,
    setShouldRender,
    isAnimating,
    setIsAnimating,
    hoveredPreviewKey,
    setHoveredPreviewKey,
    fadeKey,
    setFadeKey,
    contentVisible,
    setContentVisible,
    pendingSection,
    setPendingSection,
    burgerAnim,
    setBurgerAnim,
    burgerColorState,
    setBurgerColorState,
  } = useNavbar();

  const [indicatorStyle, setIndicatorStyle] = useState<CSSProperties>({});
  const pathname = usePathname();

  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  useEffect(() => {
    if (!shouldRender) return;
    const idx = SECTION_LIST.indexOf(activeSection);
    const btn = buttonRefs.current[idx];
    if (btn) {
      const rect = btn.getBoundingClientRect();
      const parentRect = btn.parentElement?.getBoundingClientRect();
      if (parentRect) {
        setIndicatorStyle({
          left: `${rect.left - parentRect.left}px`,
          width: `${rect.width}px`,
          height: `${rect.height}px`,
          top: `${rect.top - parentRect.top}px`,
          opacity: 1,
        });
      }
    }
  }, [activeSection, shouldRender]);

  const toggleOverlay = () => {
    if (!isOpen) setShouldRender(true);
    setIsOpen(!isOpen);
    setIsAnimating(true);
  };

  const INDICATOR_TRANSITION_MS = 100;

  const handleSectionClick = (section: string) => {
    if (section === activeSection) return;
    setContentVisible(false);
    setPendingSection(section);
    setTimeout(() => {
      setActiveSection(section);
      setFadeKey(fadeKey + 1);
      setContentVisible(true);
      setTimeout(() => setPendingSection(null), INDICATOR_TRANSITION_MS);
    }, 0);
  };

  useEffect(() => {
    const html = document.documentElement;
    html.style.overflow = isOpen || isAnimating ? "hidden" : "";
    return () => {
      html.style.overflow = "";
    };
  }, [isOpen, isAnimating]);

  useEffect(() => {
    if (isOpen) setActiveSection("Section1");
  }, [isOpen, setActiveSection]);

  const handleAnimationEnd = () => {
    if (!isOpen) setShouldRender(false);
    setIsAnimating(false);
  };

  //each section has its own content (link to pages, images, custom content, etc.)
  const sectionContent: Record<string, React.ReactNode> = {
    Section1: (
      <div className="w-[100%] h-[100%] flex flex-col justify-center pl-16 text-7xl font-bold uppercase overflow-auto">
        <NavLink
          label="Home"
          href="/"
          isActive={pathname === "/"}
          onMouseEnter={() => setHoveredPreviewKey("home")}
          onMouseLeave={() => setHoveredPreviewKey(null)}
          onClick={toggleOverlay}
        />
        <NavLink
          label="Dark Navbar Variant"
          href="/dark-navbar"
          isActive={pathname === "/randompage"}
          onMouseEnter={() => setHoveredPreviewKey("test")}
          onMouseLeave={() => setHoveredPreviewKey(null)}
          onClick={toggleOverlay}
        />
        <NavLink
          label="Light Navbar Variant"
          href="/"
          isActive={pathname === "/randompage"}
          onMouseEnter={() => setHoveredPreviewKey("projects")}
          onMouseLeave={() => setHoveredPreviewKey(null)}
          onClick={toggleOverlay}
        />
        <NavLink
          label="About"
          href="/about"
          isActive={pathname === "/about"}
          onMouseEnter={() => setHoveredPreviewKey(null)}
          onMouseLeave={() => setHoveredPreviewKey(null)}
          onClick={toggleOverlay}
        />
        <NavLink
          label="Contact"
          href="/contact"
          isActive={pathname === "/contact"}
          onMouseEnter={() => setHoveredPreviewKey(null)}
          onMouseLeave={() => setHoveredPreviewKey(null)}
          onClick={toggleOverlay}
        />
        <NavLink
          label="Thing"
          href="/thing"
          isActive={pathname === "/thing"}
          onMouseEnter={() => setHoveredPreviewKey(null)}
          onMouseLeave={() => setHoveredPreviewKey(null)}
          onClick={toggleOverlay}
        />
      </div>
    ),
    Photos: (
      <div className="w-[100%] h-[100%] flex flex-col gap-4 pl-16 pr-16 text-7xl font-bold uppercase overflow-auto">
        <img className="w-full h-full" src="/Jason_Duval_06.jpg"></img>
        <img className="w-full h-full" src="/DreQuan_Priest_03.webp"></img>
      </div>
    ),
    Section2: (
      <div className="w-[100%] h-[100%] flex flex-col justify-center pl-16 text-7xl font-bold uppercase overflow-auto">
        <NavLink
          label="Home"
          href="/"
          isActive={pathname === "/"}
          onMouseEnter={() => setHoveredPreviewKey("home")}
          onMouseLeave={() => setHoveredPreviewKey(null)}
          onClick={toggleOverlay}
        />
        <NavLink
          label="Test"
          href="/"
          isActive={pathname === "/randompage"}
          onMouseEnter={() => setHoveredPreviewKey("test")}
          onMouseLeave={() => setHoveredPreviewKey(null)}
          onClick={toggleOverlay}
        />
        <NavLink
          label="ajdjdaj"
          href="/"
          isActive={pathname === "/randompage"}
          onMouseEnter={() => setHoveredPreviewKey("projects")}
          onMouseLeave={() => setHoveredPreviewKey(null)}
          onClick={toggleOverlay}
        />
        <NavLink
          label="asdh"
          href="/"
          isActive={pathname === "/randompage"}
          onMouseEnter={() => setHoveredPreviewKey(null)}
          onMouseLeave={() => setHoveredPreviewKey(null)}
          onClick={toggleOverlay}
        />
        <NavLink
          label="asgagag"
          href="/"
          isActive={pathname === "/randompage"}
          onMouseEnter={() => setHoveredPreviewKey(null)}
          onMouseLeave={() => setHoveredPreviewKey(null)}
          onClick={toggleOverlay}
        />
      </div>
    ),
    Legal: (
      <div className="w-full h-full text-5xl font-bold flex flex-col justify-center pl-16">
        {Array.from({ length: 7 }).map((_, i) => (
          <h1 key={i}>text</h1>
        ))}
      </div>
    ),
    About: (
      <div className="w-full h-full text-5xl font-bold flex flex-col justify-center pl-16">
        {Array.from({ length: 4 }).map((_, i) => (
          <h1 key={i}>text</h1>
        ))}
      </div>
    ),
  };

  function NavLink({
    label,
    href,
    isActive,
    onMouseEnter,
    onMouseLeave,
    onClick,
  }: {
    label: string;
    href: string;
    isActive: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onClick: () => void;
  }) {
    return (
      <Link
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onClick={onClick}
        className={`w-fit transition-transform duration-100 ${
          isActive
            ? "text-pink-500"
            : "hover:text-yellow-500 hover:translate-x-1"
        }`}
        href={href}
      >
        {label}
      </Link>
    );
  }

  const defaultPreviewContent = (
    <div className="w-[100%] h-[100%] flex items-center justify-center">
      <p className="text-5xl font-bold uppercase text-white">LOGO</p>
    </div>
  );

  const previewContent =
    hoveredPreviewKey && hoveredPreviewKey !== "none"
      ? LINK_PREVIEWS.find((s) => s.key === hoveredPreviewKey)?.content
      : null;

  useEffect(() => {
    let colorTimeout: NodeJS.Timeout | null = null;
    if (isOpen) {
      setBurgerColorState("black");
      const t = setTimeout(() => setBurgerAnim("open"), 10);
      return () => {
        clearTimeout(t);
        if (colorTimeout) clearTimeout(colorTimeout);
      };
    } else {
      setBurgerAnim("");
      colorTimeout = setTimeout(
        () => setBurgerColorState("white"),
        350
      );
      return () => {
        if (colorTimeout) clearTimeout(colorTimeout);
      };
    }
  }, [isOpen, setBurgerAnim, setBurgerColorState]);

  return (
    <>
      <button
        className={`burger-btn${burgerAnim ? " open" : ""} burger-color-${burgerColorState}`}
        onClick={toggleOverlay}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        type="button"
        style={{
          position: "fixed",
          top: 56,
          right: 56,
          zIndex: 1001,
          width: 64,
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "none",
          cursor: "pointer",
          background: "transparent",
          transition: "background 0.2s",
          padding: 0,
        }}
      >
        <span className="burger-lines">
          <span className="burger-line top" />
          <span className="burger-line middle" />
          <span className="burger-line bottom" />
        </span>
      </button>
      {shouldRender && (
        <>
          <div
            onAnimationEnd={handleAnimationEnd}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backdropFilter: "blur(100px)",
              zIndex: 999,
              animation: `${isOpen ? "fadein" : "fadeout"} .5s forwards`,
            }}
          >
            <div className="w-[50%] h-[100%] select-none relative">
              <div className="w-[100%] h-[100%] absolute top-0 left-0 flex items-center justify-center">
                {previewContent || defaultPreviewContent}
              </div>
            </div>
          </div>
          <div
            className="w-[50%] h-[100%] bg-white mr-0 ml-auto flex flex-col overflow-auto"
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              zIndex: 1000,
              animation: `${isOpen ? "slidein" : "slideout"} .5s forwards ${
                isOpen
                  ? "cubic-bezier(0.645,0.045,0.355,1)"
                  : "cubic-bezier(0.42,0,0.58,1)"
              }`,
            }}
          >
            <div
              className="w-[100%] h-64 flex flex-row items-center pl-16 relative"
              style={{
                maskImage:
                  "linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)",
              }}
            >
              <span
                className="section-indicator"
                style={{
                  position: "absolute",
                  borderRadius: "1.5rem",
                  background: "black",
                  transition:
                    "left 0.18s cubic-bezier(0.77,0,0.175,1), width 0.18s cubic-bezier(0.77,0,0.175,1), height 0.18s cubic-bezier(0.77,0,0.175,1), top 0.18s cubic-bezier(0.77,0,0.175,1), opacity 0.2s",
                  zIndex: 0,
                  ...indicatorStyle,
                  pointerEvents: "none",
                }}
              />
              {SECTION_LIST.map((section, idx) => {
                const isActive = activeSection === section && !pendingSection;
                const isPending = pendingSection === section;
                return (
                  <button
                    key={section}
                    ref={(el) => {
                      buttonRefs.current[idx] = el;
                    }}
                    onClick={() => handleSectionClick(section)}
                    style={{
                      backgroundColor: "transparent",
                      position: "relative",
                      zIndex: 1,
                    }}
                    className={`text-2xl font-bold px-4 py-2 rounded-full cursor-pointer ${
                      isActive
                        ? "text-white"
                        : isPending
                        ? "text-yellow-500"
                        : "text-black hover:text-yellow-500"
                    }`}
                  >
                    {section}
                  </button>
                );
              })}
            </div>
            <div className="w-[100%] h-[100%] relative">
              <div
                key={fadeKey}
                className="section-fade-content"
                style={{
                  animation: contentVisible
                    ? "fadeinSection .5s"
                    : "fadeoutSection 0.2s",
                  opacity: contentVisible ? 1 : 0,
                  width: "100%",
                  position: "absolute",
                  height: "100%",
                  top: 0,
                  left: 0,
                }}
              >
                {sectionContent[activeSection as keyof typeof sectionContent]}
              </div>
            </div>
            <div className="w-[100%] flex items-center overflow-auto h-48 mt-auto mb-0 pl-16 gap-4">
              <button className="text-2xl font-bold px-4 py-2 rounded-full cursor-pointer bg-black text-white">
                Button
              </button>
            </div>
          </div>
        </>
      )}

      <style jsx>{`
        @keyframes fadein {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes fadeout {
          from {
            opacity: 1;
          }
          to {
            opacity: 0;
          }
        }
        @keyframes slidein {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        @keyframes slideout {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(100%);
          }
        }
        .section-indicator {
          box-shadow: 0 2px 16px 0 rgba(0,0,0,0.08);
        }
        @keyframes fadeinSection {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeoutSection {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        .section-fade-content {
          will-change: opacity;
        }
        .burger-btn {
          outline: none;
          transition: background 0.2s;
        }
        .burger-btn:hover {
          .burger-line {
            background: #efb100;
          }
        }
        .burger-lines {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          width: 64px;
          height: 64px;
          position: relative;
        }
        .burger-line {
          display: block;
          width: 64px;
          height: 8px;
          position: absolute;
          left: 0;
          transition: 
            transform 0.36s cubic-bezier(0.77,0,0.175,1),
            opacity 0.22s cubic-bezier(0.77,0,0.175,1),
            background 0.2s,
            top 0.36s cubic-bezier(0.77,0,0.175,1);
        }
        .burger-line.top {
          top: 12px;
          transform: rotate(0deg);
        }
        .burger-line.middle {
          top: 28px;
          opacity: 1;
          transform: none;
        }
        .burger-line.bottom {
          top: 44px;
          transform: rotate(0deg);
        }
        .burger-color-white .burger-line {
          background: #fff;
        }
        .burger-color-black .burger-line {
          background: #000;
        }
        .burger-btn.open .burger-line.top {
          top: 28px;
          transform: rotate(45deg);
        }
        .burger-btn.open .burger-line.middle {
          opacity: 0;
          transform: scaleX(0.5);
        }
        .burger-btn.open .burger-line.bottom {
          top: 28px;
          transform: rotate(-45deg);
        }
      `}</style>
    </>
  );
}