import { Reviews } from './reviews';

export interface Product {
    id: number;
    category: string;
    price: number;
    brand: string;
    model: string;
    releaseYear: number;
    description: string;
    images: string[];
    reviews: Reviews;
    technicalSpecifications: Map<string, Map<string, string>>;
}
