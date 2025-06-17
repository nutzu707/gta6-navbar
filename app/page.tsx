import Image from "next/image";
import Navbar from "./components/navbar";

export default function Home() {
  return (
    <div className="w-full h-full">
      <img className="w-full h-full" src="/Jason_Duval_06.jpg"></img>
      <img className="w-full h-full" src="/DreQuan_Priest_03.webp"></img>

      <Navbar />
    </div>
  );
}
