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
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({
    credentials: true,
    origin: ["http://localhost:4200"]
}));



app.use("/api/pets", petRouter);
app.use("/api/users", userRouter);

app.post('/api/pet-upload', upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No image file uploaded' });
        }

        const { name, age, species, breed, gender, color, description, location, categories, ownerName, ownerPhoneNumber } = req.body;

        console.log('Uploaded file details:', req.file);

        const imageBase64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

        const parsedCategories = JSON.parse(categories);

        const newPet = new PetModel({
            name,
            age,
            species,
            breed,
            gender,
            image: imageBase64,
            color,
            description,
            location,
            categories: parsedCategories,
            ownerName,
            ownerPhoneNumber
        });

        await newPet.save();

        console.log('New pet saved to database:', newPet);
        res.json({ pet: newPet }); 
    } catch (error) {
        console.error('Error uploading pet:', error);
        res.status(500).json({ message: 'Failed to upload pet', error });
    }
});

app.get('/api/pets/:id', async (req, res) => {
    try {
        const pet = await PetModel.findById(req.params.id);
        if (pet) {
            res.json(pet);
        } else {
            res.status(404).json({ message: 'Pet not found' });
        }
    } catch (error) {
        console.error('Error fetching pet:', error);
        res.status(500).json({ message: 'Failed to fetch pet', error });
    }
});

const port = 5000;
app.listen(port, () => {
    console.log("Website served on http://localhost:" + port);
});
