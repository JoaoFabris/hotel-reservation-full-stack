import React from "react";
import Image from "next/image";

const Footer = () => {
    return (
        <div className="bg-walterWhite p-5 justify-center flex flex-col items-center">
            <Image src="/logo.png" width={133} height={23} alt="logo"/>
            <p className="text-sm font-medium text-primaryDarker mt-1">Todos os direitos reservados.</p>
        </div>
    )
}

export default Footer;  