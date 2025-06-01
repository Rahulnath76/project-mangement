import mongoose from "mongoose";

const typeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
    }],
});

const Type = mongoose.model("Type", typeSchema);
export default Type;