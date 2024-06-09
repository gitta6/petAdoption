import { Pet } from "./Pet";

export class FavoritePet{
    quantity: number = 1;   //neccessary?
    constructor (public pet:Pet){
    }
}