import mongoose from 'mongoose';
const { Schema } = mongoose;

const itemSchema = new Schema({
  id: { type: String, required: true },
  label: { type: String, required: true },
  isFolder: { type: Boolean, required: true },
  url: { type: String },
  items: [{ type: Schema.Types.ObjectId, ref: 'Item' }]
});

const Item = mongoose.model('Item', itemSchema);

const projectSchema = new Schema({
  uuid: { type: String, required: true },
  webProjects: [{
    project_id: { type: String, required: true },
    project_name: { type: String, required: true },
    project_description: { type: String },
    html: { type: String },
    css: { type: String },
    js: { type: String },
    last_mod: { type: Date }
  }],
  folders: [{
    folder_id: { type: String, required: true },
    folder_name: { type: String, required: true },
    folder_description: { type: String },
    items: [{ type: Schema.Types.ObjectId, ref: 'Item' }],
    last_mod: { type: Date }
  }]
});

const Project = mongoose.model('Project', projectSchema);

export { Item, Project };
