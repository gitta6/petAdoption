import { Router } from "express";
import { sample_categories, sample_pets } from "../data";

const router = Router();

router.get("/", (req, res) => {
    res.send(sample_pets);
});

router.get("/search/:searchTerm", (req, res) => {
    const searchTerm = req.params.searchTerm;
    const pets = sample_pets.filter(pet => pet.name.toLowerCase().includes(searchTerm.toLowerCase()));
    res.send(pets);
});

router.get("/categories", (req, res) => {
    res.send(sample_categories);
});

router.get("/category/:categoryName", (req, res) => {
    const categoryName = req.params.categoryName;
    const pets = sample_pets.filter(pet => pet.categories?.includes(categoryName));
    res.send(pets);
});

router.get("/:petId", (req, res) => {
    const petID = req.params.petId;
    const pet = sample_pets.find(pet => pet.id == petID);
    res.send(pet);
});

export default router;