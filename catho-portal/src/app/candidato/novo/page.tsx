"use client"
import Link from "next/link";
import {useEffect, useState} from "react";
import Skills from "@/components/Skills";
import api from "@/service/api";

function CandidatesPage() {
    const [canSave, setCanSave] = useState(false)
    const [name, setName] = useState("")
    const [skill, setSkill] = useState<string>("")
    const [skills, setSkills] = useState<string[]>([])

    useEffect(() => {
        setCanSave(name.length > 3 && skills.length > 0)
    }, [name, skills]);

    const handleClickAddSkill = () => {
        if (!skill) return;
        if (skills.includes(skill)) return;

        setSkills(prevState => [...prevState, skill])
        setSkill("");
    }

    const handleClickRemoveSkill = (skill: string) => {
        setSkills(prevState => prevState.filter(s => s !== skill))
    }

    const handleChangeName = (value: string) => {
        setName(value)
    }

    async function saveCandidate() {
        try {
            await api.post(`/candidates`, {
                name,
                skills: skills
            })
            alert("Candidato salvo com sucesso!");
        } catch (e) {
            alert("Já existe um candidato com este nome.")
        }
    }

    return (
        <div className={"flex flex-row items-start w-full justify-between"}>
            <form className={"flex flex-col gap-5 mt-5 pl-10 pr-10 w-full md:w-1/2"}>
                <div>
                    <Link
                        className={"text-sm opacity-50"}
                        href={"/"}
                    >
                        Voltar
                    </Link>

                    <h1 className={"font-medium text-2xl mt-2"}>Novo Candidato</h1>
                    <small className={"opacity-70"}>
                        Gostou de um candidato e deseja adiciona-lo em nossa plataforma?<br/>
                        Basta preencher o formulário abaixo com os dados solicitados.
                    </small>
                </div>

                <div className={"flex flex-col mt-5"}>
                    <small>Nome Completo</small>
                    <input
                        name={"name"}
                        onChange={(e) => handleChangeName(e.target.value)}
                        className={"border-b-2 border-b-gray-100 outline-none"}
                        placeholder={"Marina Silva"}
                    />
                </div>

                <div className={"flex flex-col w-full"}>
                    <small>Skills</small>
                    <div className={"w-full flex flex-row"}>
                        <input
                            value={skill}
                            name={"skills"}
                            className={"border-b-2 border-b-gray-100 outline-none w-full"}
                            placeholder={"React"}
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
                    <small className={"opacity-70"}>
                        Sinta-se a vontade para adicionar quantas skills quiser.
                    </small>

                    <Skills skills={skills} handleClickRemoveSkill={handleClickRemoveSkill}/>

                    <button
                        type={"button"}
                        disabled={!canSave}
                        onClick={() => saveCandidate()}
                        className={"bg-[#dd0059] p-2 mt-6 rounded-md text-white disabled:bg-[#999] disabled:cursor-not-allowed"}
                    >
                        Salvar Candidato
                    </button>
                </div>
            </form>

            <div className={"h-full w-1/2 absolute right-0 top-0 invisible md:visible"}>
                <img
                    draggable={false}
                    className={"w-full h-screen object-cover"}
                    src={"https://images.pexels.com/photos/4344860/pexels-photo-4344860.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
                />
            </div>
        </div>
    );
}

export default CandidatesPage;
