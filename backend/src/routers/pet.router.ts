import { Router } from "express";
import { sample_categories, sample_pets } from "../data";
import asyncHandler from 'express-async-handler';
import { PetModel } from "../models/pet.model";
import mongoose from "mongoose";

const router = Router();

router.get("/seed", asyncHandler(
    async (req, res) => {
        const petsCount = await PetModel.countDocuments();
        if (petsCount > 0) {
            res.send("Seed is already done");
            return;
        }
        await PetModel.create(sample_pets);
        res.send("Seed is done");
    }
));

router.get("/", asyncHandler(
    async (req, res) => {
        const pets = await PetModel.find();
        res.send(pets);
    }
));

router.get("/search/:searchTerm", asyncHandler(
    async (req, res) => {
        const searchRegex = new RegExp(req.params.searchTerm, 'i');
        const pets = await PetModel.find({
            $or: [
                { name: { $regex: searchRegex } },
                { species: { $regex: searchRegex } },
                { breed: { $regex: searchRegex } },
                { gender: { $regex: searchRegex } },
                { color: { $regex: searchRegex } },
                { location: { $regex: searchRegex } },
                { description: { $regex: searchRegex } },
                { categories: { $regex: searchRegex } },
            ]
        });
        res.send(pets);
    }
));

router.get("/categories", asyncHandler(
    async (req, res) => {
        const categories = await PetModel.aggregate([
            {
                $unwind: '$categories'
            },
            {
                $group: {
                    _id: '$categories',
                    count: { $sum: 1 }
                }
            },
            {
                $project: {
                    _id: 0,
                    name: '$_id',
                    count: '$count'
                }
            }
        ]).sort({ count: -1 });
        const all = {
            name: 'All',
            count: await PetModel.countDocuments()
        }
        categories.unshift(all);
        res.send(categories);
    }
));

router.get("/category/:categoryName", asyncHandler(
    async (req, res) => {
        const pets = await PetModel.find({ categories: req.params.categoryName });
        res.send(pets);
    }
));

router.get("/:petId", asyncHandler(
    async (req, res) => {
        const pet = await PetModel.findById(req.params.petId);
        res.send(pet);
    }
));

router.delete("/delete/:petId", asyncHandler(
    async (req, res) => {
        const { petId } = req.params;

        if (!mongoose.isValidObjectId(petId)) {
            res.status(400).send({ message: 'Invalid pet ID.' });
            return;
        }

        const deletedPet = await PetModel.findByIdAndDelete(petId);

        if (deletedPet) {
            res.status(200).send({ message: 'Pet deleted successfully.', deletedPet });
        } else {
            res.status(404).send({ message: 'Pet not found.' });
        }
    }
));

export default router;