import mongoose, { Document, Model, Schema } from 'mongoose';

export interface Pet extends Document {
    id: string;
    name: string;
    age: number;
    species: string;
    breed: string;
    gender: 'Hím' | 'Nőstény';
    //imageUrl: string;
    image: String;
    color: string;
    description: string;
    location: string;
    categories: string[];
    //user: string[];
    ownerName: string;
    ownerPhoneNumber: string;
};

export const PetSchema = new Schema<Pet>({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    species: { type: String, required: true },
    breed: { type: String, required: true },
    gender: { type: String, required: true },
    //imageUrl: { type: String, required: false },
    image: { type: String, required: false },
    color: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    categories: { type: [String], required: true },
    ownerName: { type: String, required: true },
    ownerPhoneNumber: { type: String, required: true },
    //user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, {
    toJSON: {
        virtuals: true,
        transform: function (doc, ret) {
            return ret;
        }
    },
    toObject: {
        virtuals: true
    },
    timestamps: true
});

export const PetModel: Model<Pet> = mongoose.model<Pet>('Pet', PetSchema);
