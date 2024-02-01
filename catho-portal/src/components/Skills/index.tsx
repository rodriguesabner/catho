import React from 'react';

interface SkillsProps {
    skills: string[];
    handleClickRemoveSkill?: (skill: string) => void;
}

const Skills = (props: SkillsProps) => {
    return (
        <ul className={"flex flex-wrap gap-2 mt-3"}>
            {
                props.skills?.length > 0 &&
                props.skills.map((skill) => (
                    <li
                        key={skill}
                        className={"bg-gray-100 rounded-full p-2 text-xs opacity-70"}
                    >
                        {skill}
                        {props.handleClickRemoveSkill != null && (
                            <button
                                className={"ml-2"}
                                onClick={() => props.handleClickRemoveSkill != null && props.handleClickRemoveSkill(skill)}
                            >
                                <b>X</b>
                            </button>
                        )}
                    </li>
                ))
            }
        </ul>
    );
};

export default Skills;
