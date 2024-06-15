import express from "express";
import cors from "cors";
import { sample_categories, sample_pets, sample_users } from "./data";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());
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

app.post("/api/users/login", (req, res) => {
    const { email, password } = req.body;
    const user = sample_users.find(user => user.email === email && user.password === password);
    if (user) {
        res.send(generateTokenResponse(user));
    } else {
        res.status(400).send("Incorrect username or password!");
    };
});

const generateTokenResponse = (user: any) => {
    const token = jwt.sign({
        email: user.email, isAdmin: user.isAdmin
    }, "asd", {
        expiresIn: "30d"
    });
    user.token = token;
    return user;
}

const port = 5000;
app.listen(port, () => {
    console.log("Website served on http://localhost:" + port);
});
