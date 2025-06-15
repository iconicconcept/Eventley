import Event from "../models/event.js"
import fs from 'fs';

export async function getEvents (_, res){
    try {
        const events = await Event.find().sort({createdAt: -1})
        res.status(200).json(events)
        console.log("Events fetched successfully");
    } catch (error) {
        console.log("Error fetching Events", error);
        res.status(500).json({message: "Internal server error"})
    }
};

export const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id);
        if (!event) {
            return res.status(404).json({ message: "Event not found" });
        }
        res.status(200).json(event);
    } catch (error) {
        console.error("Error fetching the event data", error);
        res.status(500).json({ message: "Server error fetching event data" });
    }
};

export async function createEvent (req, res){
    try {
        if (!req.file) {
            return (
                res.status(400).json({ message: "Image file is required." }),
                console.log("Image file is required.")
            );
        }
        const { title, description, venue, date, time} = req.body;
        if(!title || !description || !venue || !date || !time) {
            if (req.file) {
                fs.unlink(req.file.path, (unlinkErr) => {
                if (unlinkErr) console.error('Error deleting uploaded file due to missing text fields:', unlinkErr);
            });
            }
            return res.status(400).json({message: "All fields are required"});
        }
        
        const imagePath = `src/uploads/${req.file.filename}`; 

        const event = new Event({title, description, venue, date, time, image: imagePath });
        const savedEvent = await event.save();
        res.status(201).json(savedEvent);
        console.log("Event created successfully");    
    } catch (error) {
        console.log("Error creating Event", error);
        // If DB error occurs after file upload, delete the file
        if (req.file && req.file.path) {
            fs.unlink(req.file.path, (unlinkErr) => {
                if (unlinkErr && unlinkErr.code !== 'ENOENT') console.error('Error deleting uploaded file due to DB error:', unlinkErr);
            });
        }
        res.status(500).json({message: "Internal server error"})
    }
};

export async function editEvent (req, res){
    try {
        const {title, description, venue, date, time} = req.body;
        const updateData = {title, description, venue, date, time};

        if (req.file) {
            updateData.image = `/uploads/${req.file.filename}`;
        }

        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, updateData, {new: true});
        if(!updatedEvent) return res.status(404).json({message: "Event not found!"})
        res.status(200).json(updatedEvent);
        console.log("Event edited successfully");
    } catch (error) {
        console.log("Error editing Event", error);
        res.status(500).json({message: "Internal server error"})
    }
};

export async function deleteEvent (req, res){
    try {
        const deletedEvent = await Event.findByIdAndDelete(req.params.id);
        if(!deletedEvent) return res.status(404).json({message: "Event not found!"})
        res.status(200).json({message: "Event deleted successfully"});
        console.log("Event deleted successfully");
    } catch (error) {
        console.log("Error deleting Event", error);
        res.status(500).json({message: "Internal server error"})
    }
};