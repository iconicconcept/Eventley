import express from "express"
import { getEvents, getEventById, createEvent, editEvent, deleteEvent } from "../controllers/eventController.js"
import multer from "multer"
import path from "path"

// Multer storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/uploads/') // Ensure 'src/uploads/' directory exists in your backend
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image")) {
            cb(null, true);
        } else {
            cb(new Error("Not an image! Please upload only images."), false);
        }
    }
});

const router = express.Router()

router.get("/", getEvents)
router.get("/:id", getEventById)
router.post("/", upload.single('image'), createEvent) // Apply multer middleware
router.put("/:id", upload.single('image'), editEvent) // Apply multer middleware
router.delete("/:id", deleteEvent)

export default router;