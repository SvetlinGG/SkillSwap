

export interface Skill {
    _id?: string;
    title: string;
    description: string;
    category: string;
    level: 'Beginner' | 'Intermediate' | 'Advanced';
    owner: string;
    createdAt?: Date;
}