import { Category } from './app/shared/models/Category';
import { Pet } from './app/shared/models/Pet';

export const sample_pets: Pet[] = [
    {
        id: '1',
        name: 'Mirci',
        age: 3,
        species: 'macska',
        breed: 'házimacska',
        gender: 'nőstény',
        favorite: false,
        imageUrl: 'assets/pet_id1.jpg',
        color: 'trikolor',
        description: 'szelíd, bújós, játékos',
        location: 'Egerszalók',
        categories: ['Cat', 'Female']
    },

    {
        id: '2',
        name: 'Pillecukor',
        age: 2,
        species: 'kutya',
        breed: 'mopsz',
        gender: 'hím',
        favorite: false,
        imageUrl: 'assets/pet_id2.jpg',
        color: 'őzbarna',
        description: 'energikus, barátságos, kedves',
        location: 'Budapest',
        categories: ['Dog', 'Male']
    },

    {
        id: '3',
        name: 'Pufi',
        age: 1,
        species: 'macska',
        breed: 'perzsa',
        gender: 'hím',
        favorite: true,
        imageUrl: 'assets/pet_id3.jpg',
        color: 'fehér',
        description: 'játékos, csendes, hűséges',
        location: 'Debrecen',
        categories: ['Cat', 'Male']
    },

    {
        id: '4',
        name: 'Foltos',
        age: 4,
        species: 'kutya',
        breed: 'foxterrier',
        gender: 'hím',
        favorite: false,
        imageUrl: 'assets/pet_id4.jpg',
        color: 'fekete-fehér',
        description: 'vidám, intelligens, odaadó',
        location: 'Szeged',
        categories: ['Dog', 'Male']
    },

    {
        id: '5',
        name: 'Sanyi',
        age: 2,
        species: 'macska',
        breed: 'bengáli',
        gender: 'nőstény',
        favorite: false,
        imageUrl: 'assets/pet_id5.jpg',
        color: 'barna-fekete',
        description: 'játékos, kíváncsi, édes',
        location: 'Győr',
        categories: ['Cat', 'Female']
    },

    {
        id: '6',
        name: 'Rexi',
        age: 5,
        species: 'kutya',
        breed: 'labrador',
        gender: 'hím',
        favorite: false,
        imageUrl: 'assets/pet_id6.jpg',
        color: 'barna',
        description: 'barátságos, derűs, gyengéd',
        location: 'Pécs',
        categories: ['Dog', 'Male']
    },

    {
        id: '7',
        name: 'Zizi',
        age: 3,
        species: 'macska',
        breed: 'egyiptomi mau',
        gender: 'nőstény',
        favorite: false,
        imageUrl: 'assets/pet_id7.jpg',
        color: 'szürke',
        description: 'elegáns, hűséges, nyugodt',
        location: 'Szombathely',
        categories: ['Cat', 'Female']
    },

    {
        id: '8',
        name: 'Bubu',
        age: 1,
        species: 'kutya',
        breed: 'puli',
        gender: 'nőstény',
        favorite: false,
        imageUrl: 'assets/pet_id8.jpg',
        color: 'fekete',
        description: 'játékos, éber, bátor',
        location: 'Miskolc',
        categories: ['Dog', 'Female']
    },

    {
        id: '9',
        name: 'Tappancs Professzor',
        age: 2,
        species: 'macska',
        breed: 'maine coon',
        gender: 'hím',
        favorite: true,
        imageUrl: 'assets/pet_id9.jpg',
        color: 'vörös',
        description: 'impozáns, barátságos, okos',
        location: 'Székesfehérvár',
        categories: ['Cat', 'Male']
    },

    {
        id: '10',
        name: 'Megatron',
        age: 1,
        species: 'kutya',
        breed: 'golden retriever',
        gender: 'hím',
        favorite: false,
        imageUrl: 'assets/pet_id10.jpg',
        color: 'arany',
        description: 'vidám, szeretetteljes, lelkes',
        location: 'Kecskemét',
        categories: ['Dog', 'Male']
    }
]

export const sample_categories: Category[] = [
    { name: 'All', count: 10 },
    { name: 'Dog', count: 5 },
    { name: 'Cat', count: 5 },
    { name: 'Male', count: 6 },
    { name: 'Female', count: 4 }
]