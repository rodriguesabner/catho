import React from 'react';
import Skills from "@/components/Skills";
import {Candidate} from "@/interfaces/candidate.interface";

const Candidate = (candidate: Candidate) => {
    return (
        <div className={"flex flex-col items-start w-full"}>
            {candidate.matchPercentage != null && (
                <small className={"opacity-50 mb-5"}>
                    <b className={"text-emerald-700"}>{candidate.matchPercentage}% de match</b> com este candidato
                </small>
            )}

            <div className={"flex flex-row items-center"}>
            <img
                    alt={candidate.name}
                    draggable={false}
                    className={"w-10 h-10 rounded-full"}
                    src={candidate.avatar}
                />
                <div className={"ml-3"}>
                    <h2>{candidate.name}</h2>
                    <small className={"opacity-45"}>{candidate.email}</small>
                </div>
            </div>

            <Skills skills={candidate.skills}/>
        </div>
    );
};

export default Candidate;
