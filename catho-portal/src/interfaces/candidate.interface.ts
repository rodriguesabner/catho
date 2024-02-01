interface Candidate {
    id: string;
    name: string;
    email: string;
    avatar: string;
    skills: string[];
    matchPercentage?: number;
}

export type { Candidate };
