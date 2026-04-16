import { Router } from 'express';
import { getSkills, getSkillById, createSkill } from '../controllers/skillController.js';

const router = Router();

router.get('/', getSkills);
router.get('/:id', getSkillById);
router.post('/', createSkill);

export default router;
