import { Router } from 'express';
//import { getSkills, getSkillById, createSkill } from '../controllers/skillController.js';
import  Skill  from '../models/Skill.js'
import authMiddleware from '../middlewares/authMiddleware.js';

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


router.post('/', authMiddleware, async (req, res) => {
    try {
        const skill = await Skill.create({
            ...req.body,
            owner: req.user.id
        });
        
        res.status(201).json(skill);
    } catch (error) {
        res.status(400).json({ message: 'Failed to create skill'});
    }
});

router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const updatedSkill = await Skill.findById(req.params.id);

        if(!updatedSkill){
            return res.status(404).json({ message: 'Skill not found'});
        }

        if (updatedSkill.owner.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You are not the owner of this skill'});
        }

        updatedSkill.title = req.body.title;
        updatedSkill.description = req.body.description;
        updatedSkill.category = req.body.category;
        updatedSkill.level = req.body.level;

        await updatedSkill.save();

        res.json(updatedSkill);
    } catch (error) {
        res.status(400).json({ message: 'Failed to update skill'})
    }
});

router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const deletedSkill = await Skill.findById(req.params.id);

        if(!deletedSkill){
            return res.status(404).json({ message: 'Skill not found'});
        }


        if (deletedSkill.owner.toString() !== req.user.id){
            return res.status(403).json({ message: 'You are not the owner of this skill'});
        }

        await Skill.findByIdAndDelete(req.params.id);
        
        res.json({message: 'Skill deleted successfully'});
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete skill'})
    }
});

export default router;
