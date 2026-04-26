export interface SkillOwner {
    _id: string;
    username: string;
    email: string;
}

export interface SkillComment {
    _id?: string;
    user: SkillOwner;
    text: string;
    createdAt: string;
}




export interface Skill {
    _id?: string;
    title: string;
    description: string;
    category: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    owner: string | SkillOwner;
    likes?: string[];
    createdAt?: string;
    updatedAt?: string;
}