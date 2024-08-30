import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    labels: [
        {
            type: String
        }
    ],
    description: {
        type: String
    },
    date: {
        type: String,
        required: true
    }
});

const boardSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    tasks: [taskSchema]
});

const kanbanSchema = new Schema({
    uuid: {
        type: String,
        required: true
    },
    kanbanBoards: [boardSchema]
});

const Kanban = mongoose.model('Kanban', kanbanSchema);
export const Board=mongoose.model('Board',boardSchema);

export default Kanban;
