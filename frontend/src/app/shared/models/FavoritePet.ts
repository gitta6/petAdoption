import { Pet } from "./Pet";

export class FavoritePet{
    quantity: number = 1;
    constructor (public pet:Pet){
    }
}