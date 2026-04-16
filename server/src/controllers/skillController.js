import Skill from '../models/Skill.js';

export const getSkills = async (req, res) => {
    const skills = await Skill.find();
    res.json(skills);
};

export const getSkillById = async (req, res) => {
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).json({ message: 'Skill not found' });
    res.json(skill);
};

export const createSkill = async (req, res) => {
    const skill = await Skill.create(req.body);
    res.status(201).json(skill);
};
