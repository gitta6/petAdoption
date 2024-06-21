import mongoose, { Document, Schema } from 'mongoose';

export interface Pet extends Document {
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
    user: string;
};

export const PetSchema = new Schema<Pet>({
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
    categories: { type: [String], required: true },
    user: [{ type: Schema.Types.ObjectId, ref: 'user', required: true }],
}, {
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    },
    timestamps: true
});

export const PetModel = mongoose.model<Pet>('Pet', PetSchema);
