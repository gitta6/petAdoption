import { Router } from "express";
import { sample_categories, sample_pets } from "../data";
import asyncHandler from 'express-async-handler';
import { PetModel } from "../models/pet.model";

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
        const pets = await PetModel.find({ name: { $regex: searchRegex } });
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

export default router;