import React from 'react';
import Link from "next/link";

interface HeaderProps {
    withButton: boolean
}
const Header = (props: HeaderProps) => {
    return (
        <div className="w-full items-center justify-between font-mono text-sm flex p-10 pl-10 pr-10">
            <Link href={"/"} className="text-xl">
                Catho <b>Recrutamento</b>
            </Link>

            {props.withButton && (
                <Link
                    className={"bg-[#dd0059] p-2 rounded-md text-white text-sm text-center"}
                    href={"/candidato/novo"}
                >
                    Cadastrar Candidato
                </Link>
            )}
        </div>
    );
};

export default Header;
