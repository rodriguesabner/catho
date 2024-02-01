"use client"
import Header from "@/components/Header";
import Skills from "@/components/Skills";
import {useLayoutEffect, useState} from "react";
import api from "@/service/api";
import Candidate from "@/components/Candidate";
import {Candidate as ICandidate} from "@/interfaces/candidate.interface";
import Modal from "@/components/Modal";

export default function Home() {
    const [candidates, setCandidates] = useState<ICandidate[]>([]);
    const [skill, setSkill] = useState("");
    const [skills, setSkills] = useState<string[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState<ICandidate | undefined>(undefined)

    useLayoutEffect(() => {
        async function fetchCandidates() {
            const {data}: { data: ICandidate[] } = await api.get(`/candidates`)
            setCandidates(data);
        }

        void fetchCandidates();
    }, [])

    const handleClickAddSkill = () => {
        if (!skill) return;
        if (skills.includes(skill)) return;

        setSkills(prevState => [...prevState, skill])
        setSkill("");
    }

    const handleClickRemoveSkill = (skill: string) => {
        setSkills(prevState => prevState.filter(s => s !== skill))
    }

    async function handleClickSearch() {
        if (skills.length <= 0) return;

        const skillsToQuery = encodeURIComponent(skills.join(","));
        const {data}: { data: ICandidate[] } = await api.get(`/candidates/search?skills=${skillsToQuery}`)
        setCandidates(data);
    }

    const handleChooseCandidate = (candidate: ICandidate) => {
        setShowModal(true);
        setSelectedCandidate(candidate);
    }

    return (
        <main className="flex min-h-screen flex-col w-full">
            <Header withButton={true}/>
            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                candidate={selectedCandidate}
            />

            <div className={"flex flex-col bg-[#1250c3] w-full p-10 relative overflow-hidden"}>
                <img
                    draggable={false}
                    className={"absolute right-0 left-0 w-full top-0 opacity-10 z-0"}
                    src={"https://images.pexels.com/photos/5989927/pexels-photo-5989927.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                />

                <div className={"z-10 flex flex-col xl:flex-row w-full"}>
                    <div className={"xl:w-1/2"}>
                        <h1 className={"text-3xl text-white font-bold"}>
                            Aqui você encontra os melhores<br/>
                            candidatos para sua empresa!{"\n"}
                        </h1>
                        <p className={"text-white text-sm opacity-70 mt-3"}>
                            Conheça nossa I.A que reúne os melhores candidatos na plataforma,<br/>
                            e encontre os melhores candidatos para sua empresa!{"\n"}
                        </p>
                    </div>
                    <div className={"xl:w-1/2 bg-white p-4 flex flex-col rounded-md max-w-[650px] mt-10 xl:max-w-full"}>
                        <div className={"w-full flex flex-row"}>
                            <input
                                value={skill}
                                name={"skills"}
                                className={"border-b-2 border-b-gray-100 outline-none w-full"}
                                placeholder={"React, Node, Vue, Go"}
                                onChange={(e) => setSkill(e.target.value)}
                            />
                            <button
                                type={"button"}
                                className={"ml-4 bg-[#1250c3] p-2 pl-4 pr-4 rounded-md text-white text-sm font-bold"}
                                onClick={() => handleClickAddSkill()}
                            >
                                +
                            </button>
                        </div>
                        <small className={"opacity-45"}>
                            Adicione as skills para pesquisa clicando no botão +
                        </small>

                        <Skills skills={skills} handleClickRemoveSkill={handleClickRemoveSkill}/>

                        <button
                            onClick={() => handleClickSearch()}
                            className={"bg-[#dd0059] p-2 mt-6 rounded-md text-white disabled:bg-[#999] disabled:cursor-not-allowed"}
                        >
                            Pesquisar
                        </button>
                    </div>
                </div>
            </div>

            <ul className={"grid xl:grid-cols-3 gap-10 w-ful p-10 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1"}>
                {candidates.map((candidate) => (
                    <li
                        className={"flex flex-row items-start hover:bg-gray-100 p-4 cursor-pointer duration-150 rounded-md"}
                        key={candidate.id}
                        onClick={() => handleChooseCandidate(candidate)}
                    >
                        <Candidate {...candidate}/>
                    </li>
                ))}
            </ul>
        </main>
    );
}
