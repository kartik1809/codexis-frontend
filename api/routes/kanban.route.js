import express from 'express';
import { updateKanban,getKanban,addTask,deleteTask,updateTask} from '../controllers/kanban.controller.js';
const router = express.Router();

router.post('/kanban',getKanban);
router.post('/updatekanban',updateKanban);
router.post('/addtask',addTask);
router.post('/deletetask',deleteTask);
router.post('/updatetask',updateTask);

export default router;