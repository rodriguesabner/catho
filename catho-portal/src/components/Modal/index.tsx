import React, {useEffect} from 'react';
import {Candidate as ICandidate} from "@/interfaces/candidate.interface";
import Candidate from "@/components/Candidate";
import Skills from "@/components/Skills";

interface ModalProps {
    show: boolean;
    onClose: () => void;
    candidate?: ICandidate
}

const Modal = (props: ModalProps) => {
    useEffect(() => {
        if (props.show) {
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.body.style.overflow = "auto";
        }
    }, [props.show]);

    return (props.show && props.candidate != null) && (
        <div className={"absolute right-0 bg-white h-full sm:w-[350px] w-full z-40 m-auto shadow-2xl shadow-gray-700 p-10"}>
            <header className={"w-full justify-between flex"}>
                <h1>
                    Detalhes
                </h1>

                <button onClick={props.onClose}>
                    X
                </button>
            </header>

            <div className={"flex flex-col mt-5"}>
                <img
                    alt={props.candidate.name}
                    draggable={false}
                    className={"w-full h-30 rounded-sm"}
                    src={props.candidate.avatar}
                />
                <div className={"flex flex-col items-start mt-4"}>
                    <h2 className={"text-xl"}>{props.candidate.name}</h2>
                    <small className={"opacity-45"}>{props.candidate.email}</small>
                </div>
            </div>

            <Skills skills={props.candidate.skills}/>
        </div>
    );
};

export default Modal;
