import { ArrowRight } from "lucide-react";
import Logo from "../../../assets/landingimg/logo.svg"; // apna svg yaha import karna

export default function Header() {
  return (
    <div className="w-full bg-[#E9E9E9] py-8 flex justify-center">
      <div className="w-[95%] bg-[#63316F] rounded-[50px] px-10 h-[70px] flex items-center justify-between">
        {/* Left SVG Logo */}
        <div className="flex items-center ml-50">
          <img src={Logo} alt="logo" className="h-10 w-auto object-contain" />
        </div>

        {/* Center Text */}
        <h1 className="text-white text-xl font-medium tracking-wide">
          WingMann
        </h1>

        {/* Right Button */}
        <button className="bg-[#F3F3F3] text-black  h-8 r-16 px-6 py-2.5 rounded-full text-sm font-medium flex items-center gap-5 hover:bg-white transition">
          Start Meeting
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}
