import express from 'express';
import { createProject,getAllProjects } from '../controllers/project.controller.js';
const router = express.Router();

router.get('/allprojects',getAllProjects)
router.get('/projects/:id',)
router.post('/createproject', createProject);

export default router;