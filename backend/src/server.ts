import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import cors from "cors";
import petRouter from './routers/pet.router';
import userRouter from './routers/user.router';
import { dbConnect } from './configs/database.config';
import { PetModel } from './models/pet.model';
import multer from 'multer';

dbConnect();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const app = express();
app.use(express.json());
app.use(cors({
    credentials: true,
    origin: ["http://localhost:4200"]
}));

app.use("/api/pets", petRouter);
app.use("/api/users", userRouter);

app.post('/api/pet-upload', upload.single('image'), async (req, res) => {
    try {
        console.log('Request received:', req.body, req.file);
        const { name, age, species, breed, gender, color, description, location, categories } = req.body;
        const imageUrl = req.file ? req.file.path : '';
        const parsedCategories = JSON.parse(categories);

        const newPet = new PetModel({
            name,
            age,
            species,
            breed,
            gender,
            color,
            imageUrl,
            description,
            location,
            categories: parsedCategories
        });

        await newPet.save();

        console.log('New pet saved to database:', newPet);
        res.json({ pet: newPet }); 
    } catch (error) {
        console.error('Error uploading pet:', error);
        res.status(500).json({ message: 'Failed to upload pet', error });
    }
});

const port = 5000;
app.listen(port, () => {
    console.log("Website served on http://localhost:" + port);
});
