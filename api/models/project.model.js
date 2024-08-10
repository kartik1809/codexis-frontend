import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    uuid: {
        type: String,
        required: true
    },
    webProjects: [{
        project_id: {
            type: String,
            required: true
        },
        project_name: {
            type: String,
            required: true
        },
        project_description: {
            type: String
        },
        html: {
            type: String
        },
        css: {
            type: String
        },
        js: {
            type: String
        },
        last_mod: {
            type: Date
        }
    }],
    folders: [{
        folder_id: {
            type: String,
            required: true
        },
        folder_name: {
            type: String,
            required: true
        },
        folder_description: {
            type: String
        },
        last_mod: {
            type: Date
        }
    }]
});

const Project = mongoose.model('Project', projectSchema);

export default Project;
