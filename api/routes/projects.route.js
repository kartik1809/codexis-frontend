import express from 'express';
import { createProject,getAllProjects,newFolder,getFolder,createItem,getItem,renameItem,deleteItem} from '../controllers/project.controller.js';
const router = express.Router();

router.post('/allprojects',getAllProjects)
router.get('/projects/:id',)
router.post('/createproject', createProject);
router.post('/newfolder',newFolder)
router.post('/getfolder',getFolder)
router.post('/createitem',createItem)
router.get('/getitem',getItem)
router.post('/renameitem',renameItem)
router.post('/deleteitem',deleteItem)
export default router;