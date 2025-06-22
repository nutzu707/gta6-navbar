"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface NavbarContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  shouldRender: boolean;
  setShouldRender: (render: boolean) => void;
  isAnimating: boolean;
  setIsAnimating: (animating: boolean) => void;
  hoveredPreviewKey: "home" | "test" | "projects" | "none" | null;
  setHoveredPreviewKey: (key: "home" | "test" | "projects" | "none" | null) => void;
  fadeKey: number;
  setFadeKey: (key: number) => void;
  contentVisible: boolean;
  setContentVisible: (visible: boolean) => void;
  pendingSection: string | null;
  setPendingSection: (section: string | null) => void;
  burgerAnim: string;
  setBurgerAnim: (anim: string) => void;
  burgerColorState: string;
  setBurgerColorState: (color: string) => void;
}

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

export function NavbarProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [shouldRender, setShouldRender] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hoveredPreviewKey, setHoveredPreviewKey] = useState<"home" | "test" | "projects" | "none" | null>(null);
  const [fadeKey, setFadeKey] = useState(0);
  const [contentVisible, setContentVisible] = useState(true);
  const [pendingSection, setPendingSection] = useState<string | null>(null);
  const [burgerAnim, setBurgerAnim] = useState("");
  const [burgerColorState, setBurgerColorState] = useState("white");

  return (
    <NavbarContext.Provider
      value={{
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
      }}
    >
      {children}
    </NavbarContext.Provider>
  );
}

export function useNavbar() {
  const context = useContext(NavbarContext);
  if (context === undefined) {
    throw new Error("useNavbar must be used within a NavbarProvider");
  }
  return context;
} 