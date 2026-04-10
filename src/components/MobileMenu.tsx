import { useState } from "react";
import XCross from "./icons/XCross";
import Hamburger from "./icons/Hamburger";

export function MobileMenu() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <button
        className="mobile-menu-toggle"
        aria-label="Menu"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <XCross /> : <Hamburger />}
      </button>

      <div
        className={`mobile-menu-container od-bg-card od-border od-text-muted absolute left-0 right-0 top-full flex flex-col gap-3 border-t px-6 py-4 text-sm shadow-xl md:hidden ${menuOpen ? "" : "hidden"}`}
      >
        <a
          href="/#how-it-works"
          className="mobile-menu-item"
          onClick={() => setMenuOpen(false)}
        >
          How it works
        </a>
        <a
          href="/quick-start"
          className="mobile-menu-item"
          onClick={() => setMenuOpen(false)}
        >
          Quick Start
        </a>
        <a
          href="/docs"
          className="mobile-menu-item"
          onClick={() => setMenuOpen(false)}
        >
          Docs
        </a>
        <a
          href="/api"
          className="mobile-menu-item"
          onClick={() => setMenuOpen(false)}
        >
          API
        </a>
      </div>
    </>
  );
}
