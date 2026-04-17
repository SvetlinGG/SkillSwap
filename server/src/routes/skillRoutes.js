import { Router } from 'express';
//import { getSkills, getSkillById, createSkill } from '../controllers/skillController.js';
import  Skill  from '../models/Skill.js'

const router = Router();

router.get('/', async (req, res) => {
    try {
        const skills = await Skill.find().sort({ createdAt: -1});
        res.json(skills);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch skills'})
    }
});


router.get('/:id', async (req, res) => {

    try {
        const skill = await Skill.findById(req.params.id);

        if (!skill) return res.status(404).json({ message: 'Skill not found' });
        res.json(skill);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch skill details'});
    }
    
});


router.post('/', async (req, res) => {
    try {
        const skill = new Skill(req.body);
        await skill.save();
        res.status(201).json(skill);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create skill'});
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedSkill = await Skill.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true}
        );

        if(!updatedSkill){
            return res.status(404).json({ message: 'Skill not found'});
        }

        res.json(updatedSkill);
    } catch (error) {
        res.status(400).json({ message: 'Failed to update skill'})
    }
})

export default router;
