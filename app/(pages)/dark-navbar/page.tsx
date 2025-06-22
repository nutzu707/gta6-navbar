"use client";

import { useEffect } from "react";

export default function Darknavbar() {
  useEffect(() => {
    const prevBg = document.documentElement.style.backgroundColor;
    document.documentElement.style.backgroundColor = "black";
    return () => {
      document.documentElement.style.backgroundColor = prevBg;
    };
  }, []);

  return (
    <div className="w-full h-full">
      <img className="w-full h-full" src="/Jason_Duval_06.jpg" />
      <img className="w-full h-full" src="/Lucia_Caminos_06.jpg" />
      <img className="w-full h-full" src="/DreQuan_Priest_03.webp" />
      <div
        className="fixed left-1/2 top-1/2 z-50"
        style={{
          transform: "translate(-50%, -50%)",
          background: "rgba(30, 30, 30, 0.7)",
          borderRadius: "1rem",
          padding: "2.5rem 3rem",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          color: "white",
          maxWidth: "90vw",
          textAlign: "center",
          backdropFilter: "blur(8px)",
        }}
      >
        <h1 className="text-5xl font-bold mb-4">GTA VI WEBSITE INSPIRED NAVBAR</h1>
        <p className="text-2xl ">
          Hey! This is a fun, open source navbar that takes inspiration from the official{" "}
          <a
            href="https://www.rockstargames.com/gta6/"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#7ed0ff", textDecoration: "underline" }}
          >
            GTA VI website
          </a>
          . It&apos;s built to look and feel just like the real thing, it is very nicely animated and has a dark and light mode, but you can totally tweak it and drop it into your own projects however you want.
        </p>
      </div>
    </div>
  );    
}
