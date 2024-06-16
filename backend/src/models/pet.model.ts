import { model, Schema } from "mongoose";

export interface Pet {
    id: string;
    name: string;
    age: number;
    species: string;
    breed: string;
    gender: string;
    favorite: boolean;
    imageUrl: string;
    color: string;
    description: string;
    location: string;
    categories: string[];
};

export const PetSchema = new Schema<Pet>(
    {
        name: { type: String, required: true },
        age: { type: Number, required: true },
        species: { type: String, required: true },
        breed: { type: String, required: true },
        gender: { type: String, required: true },
        favorite: { type: Boolean, default: false },
        imageUrl: { type: String, required: true },
        color: { type: String, required: true },
        description: { type: String, required: true },
        location: { type: String, required: true },
        categories: { type: [String], required: true }
    },
    {
        toJSON: {
            virtuals: true
        },
        toObject: {
            virtuals: true
        },
        timestamps: true
    }
);

export const PetModel = model<Pet>('pet', PetSchema);