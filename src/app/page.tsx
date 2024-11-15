'use client'
import { FaWhatsapp } from "react-icons/fa";
import { GiPayMoney } from "react-icons/gi";

export default function Home() {
  return (
    <div className="w-full flex justify-center items-center h-full">
      <div
        className="w-full h-full bg-cover bg-center relative"
        style={{ backgroundImage: `url(/fundo-home.jpg)` }}
      >
        <div className="absolute inset-0 bg-black opacity-75"></div>
        <div className="w-full h-full relative z-10 flex text-white items-center justify-center px-[205px]">
          <div className="w-full flex flex-col justify-center items-start h-full">
            <h1 className="text-[#fe9d10] font-bold text-[80px]">Platafoma PX</h1>
            <p className="text-white font-bold text-5xl">
              Você merece pagar menos!
            </p>
            <div className="w-full flex justify-center items-center py-44 gap-5">
              <button className="bg-green-500 text-white px-8 py-3 rounded-sm shadow-md flex items-center gap-3 text-2xl hover:opacity-70 transition-all duration-300">
              <FaWhatsapp /> Contato via WhatsApp
              </button>
              <button className="bg-[#fe9d10] text-white px-8 py-3 rounded-sm shadow-md flex items-center gap-3 text-2xl hover:opacity-70 transition-all duration-300">
              <GiPayMoney /> Simule seu Empréstimo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}