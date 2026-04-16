import { Router } from 'express';
//import { getSkills, getSkillById, createSkill } from '../controllers/skillController.js';
import  Skill  from '../models/Skill.js'

const router = Router();

router.get('/', async (req, res) => {
    const skills = await Skill.find();
    res.json(skills);
});


router.get('/:id', async (req, res) => {
    const skill = await Skill.findById(req.params.id);
    if (!skill) return res.status(404).json({ message: 'Skill not found' });
    res.json(skill);
});


router.post('/', async (req, res) => {
    const skill = new Skill(req.body);
    await skill.save();
    res.status(201).json(skill);
});

export default router;
