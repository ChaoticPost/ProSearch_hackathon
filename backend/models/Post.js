import mongoose from "mongoose";

const JobPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    costFrom: {
        type: Number,
        required: true,
    },
    costTo: Number,
    leadTime: {
        type: String,
        required: true,
    },
    location: String,
    tags: {
        type: Array,
        default: [],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
},
{
    timestamps: true,
})

export default mongoose.model('JobPost', JobPostSchema);