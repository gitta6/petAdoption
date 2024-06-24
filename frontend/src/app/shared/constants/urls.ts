const BASE_URL = 'http://localhost:5000';

export const PETS_URL = BASE_URL + '/api/pets';
export const PETS_BY_SEARCH_URL = PETS_URL + '/search/';
export const PETS_CATEGORIES_URL = PETS_URL + '/categories';
export const PETS_BY_ID_URL = PETS_URL + '/';
export const PETS_BY_CATEGORY_URL = PETS_URL + '/category/';
export const USER_LOGIN_URL = BASE_URL + '/api/users/login';
export const USER_REGISTER_URL = BASE_URL + '/api/users/register';
export const USER_FAVORITES_ADD_URL = BASE_URL + '/api/users/add';
export const USER_FAVORITES_REMOVE_URL = BASE_URL + '/api/users/remove';
export const USER_FAVORITES_URL = BASE_URL + '/api/users/favorites';
export const PET_UPLOAD_URL = BASE_URL + '/api/pet-upload';
export const PET_DELETE_URL = (petId: string) => `${PETS_URL}/delete/${petId}`;

