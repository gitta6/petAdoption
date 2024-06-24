import { Router, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import { User, UserModel } from "../models/user.model";
import { PetModel } from "../models/pet.model";
import authMiddleware, { AuthRequest } from '../middleware/middleware.auth';
import { HTTP_BAD_REQUEST } from "../constants/httpStatus";
import { sample_users } from '../data';

const router = Router();

router.get("/seed", asyncHandler(async (req, res) => {
    const usersCount = await UserModel.countDocuments();
    if (usersCount > 0) {
        res.send("Seed is already done");
        return;
    }
    await UserModel.create(sample_users);
    res.send("Seed is done");
}));

router.post("/login", asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
        res.send(generateTokenResponse(user));
    } else {
        res.status(HTTP_BAD_REQUEST).json({ message: "Incorrect username or password!" });
    }
}));

router.post('/register', asyncHandler(async (req, res) => {
    const { name, email, password, address } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
        res.status(HTTP_BAD_REQUEST).json({ message: "This user already exists. Please sign in!" });
        return;
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    const newUser: User = {
        id: '',
        name,
        email: email.toLowerCase(),
        password: encryptedPassword,
        address,
        isAdmin: false,
        favorites: []
    };
    const dbUser = await UserModel.create(newUser);
    res.send(generateTokenResponse(dbUser));
}));

const generateTokenResponse = (user: User) => {
    const token = jwt.sign({
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin
    }, process.env.JWT_SECRET!, {
        expiresIn: "30d"
    });

    return {
        id: user.id,
        email: user.email,
        name: user.name,
        address: user.address,
        isAdmin: user.isAdmin,
        token: token
    };
};

router.post('/add', authMiddleware, async (req: AuthRequest, res: Response) => {
    const { petId } = req.body;
    const userId = req.auth?.id;

    try {
        const user = await UserModel.findById(userId);
        const pet = await PetModel.findById(petId);

        if (!user) {
            return res.status(HTTP_BAD_REQUEST).json({ message: "User not found" });
        }

        if (!pet) {
            return res.status(HTTP_BAD_REQUEST).json({ message: "Pet not found" });
        }

        if (user.favorites.includes(petId)) {
            return res.status(HTTP_BAD_REQUEST).json({ message: "Pet already in favorites" });
        }

        user.favorites.push(petId);
        await user.save();

        res.json({ message: "Pet added to favorites", user });
    } catch (error) {
        console.error("Error adding pet to favorites:", error);
        res.status(HTTP_BAD_REQUEST).json({ message: "Failed to add pet to favorites" });
    };
});

router.post('/remove', authMiddleware, async (req: AuthRequest, res: Response) => {
    const { petId } = req.body;
    const userId = req.auth?.id;

    try {
        const user = await UserModel.findById(userId);
        const pet = await PetModel.findById(petId);

        if (!user) {
            return res.status(HTTP_BAD_REQUEST).json({ message: "User not found" });
        };

        if (!pet) {
            return res.status(HTTP_BAD_REQUEST).json({ message: "Pet not found" });
        };

        user.favorites = user.favorites.filter(fav => fav.toString() !== petId);
        await user.save();

        res.json({ message: "Pet removed from favorites", user });
    } catch (error) {
        console.error("Error removing pet from favorites:", error);
        res.status(HTTP_BAD_REQUEST).json({ message: "Failed to remove pet from favorites" });
    };
});

router.get('/favorites', authMiddleware, async (req: AuthRequest, res: Response) => {
    const userId = req.auth?.id;
    if (!userId) {
        return res.status(400).json({ message: "User not authenticated" });
    };

    try {
        console.log(`Fetching user with ID: ${userId}`);
        const user = await UserModel.findById(userId).populate('favorites');
        if (!user) {
            console.log("User not found");
            return res.status(404).json({ message: "User not found" });
        }
        const favoritePets = await PetModel.find({ _id: { $in: user.favorites } });

        res.json(favoritePets);
    } catch (error) {
        console.error("Error fetching favorite pets:", error);
        res.status(500).json({ message: "Failed to fetch favorite pets" });
    };
});

export default router;
