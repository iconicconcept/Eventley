import mongoose from "mongoose"

const eventSchema = new mongoose.Schema({
    image: {
        type:  String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    venue: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
}, {timestamps: false})

const Event = mongoose.model("Event", eventSchema)

export default Event