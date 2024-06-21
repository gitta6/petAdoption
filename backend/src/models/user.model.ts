import mongoose, { model, Schema } from "mongoose";

export interface User {
    id: string;
    email: string;
    password: string;
    name: string;
    address: string;
    isAdmin: boolean;
    favorites: string[];
};

export const UserSchema = new Schema<User>({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    address: { type: String, required: true },
    isAdmin: { type: Boolean, required: true },
    favorites: [{ type: Schema.Types.ObjectId, ref: 'Pet' }]
},
    {
        timestamps: true,
        toJSON: {
            virtuals: true
        },
        toObject: {
            virtuals: true
        }
    }
);

export const UserModel = mongoose.model<User>('user', UserSchema);