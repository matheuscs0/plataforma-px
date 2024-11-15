import Link from "next/link"

export const NavBar = () => {
    return(
        <nav className="w-full h-24 flex justify-around items-center bg-black fixed top-0 z-50">
            <div className="flex items-center">
                <Link href="/" className="text-[#fe9d10] font-bold text-4xl">Plataforma PX</Link>
            </div>
            <div className="flex items-center gap-10">
                <ul className="flex items-center gap-7 text-[#fe9d10] text-md font-bold">
                    <Link href="/">HOME</Link>
                </ul>
                <div className="flex items-center gap-3">
                <Link href="/cadastrar-chave-pix" className="bg-[#fe9d10] text-white px-3 py-2 rounded-sm shadow-md hover:opacity-70 transition-all duration-300">
                    CADASTRE-SE
                </Link>
                <button className="bg-[#fe9d10] text-white px-3 py-2 rounded-sm shadow-md hover:opacity-70 transition-all duration-300">
                    ENTRAR
                </button>
                </div>
            </div>
        </nav>
    )
}