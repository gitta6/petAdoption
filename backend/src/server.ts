import express from "express";
import cors from "cors";
import { sample_categories, sample_pets } from "./data";

const app = express();
app.use(cors({
    credentials: true,
    origin: ["http://localhost:4200"]
}));

app.get("/api/pets", (req, res) => {
    res.send(sample_pets);
});

app.get("/api/pets/search/:searchTerm", (req, res) => {
    const searchTerm = req.params.searchTerm;
    const pets = sample_pets.filter(pet => pet.name.toLowerCase().includes(searchTerm.toLowerCase()));
    res.send(pets);
});

app.get("/api/pets/categories", (req, res) => {
    res.send(sample_categories);
});

app.get("/api/pets/category/:categoryName", (req, res) => {
    const categoryName = req.params.categoryName;
    const pets = sample_pets.filter(pet => pet.categories?.includes(categoryName));
    res.send(pets);
});

app.get("/api/pets/:petId", (req, res) => {
    const petID = req.params.petId;
    const pet = sample_pets.find(pet => pet.id == petID);
    res.send(pet);
});

const port = 5000;
app.listen(port, () => {
    console.log("Website served on http://localhost:" + port);
});
