"use client";

import { useEffect } from "react";
import NavDark from "@/app/components/navbardark";

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
      <img className="w-full h-full" src="/Jason_Duval_06.jpg"></img>
      <img className="w-full h-full" src="/DreQuan_Priest_03.webp"></img>
      <img className="w-full h-full" src="/Jason_Duval_06.jpg"></img>
      <img className="w-full h-full" src="/DreQuan_Priest_03.webp"></img>
      <img className="w-full h-full" src="/Jason_Duval_06.jpg"></img>
      <img className="w-full h-full" src="/DreQuan_Priest_03.webp"></img>

      <NavDark />
    </div>
  );    
}
