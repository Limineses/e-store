export interface Product {
    id: number;
    category: string;
    price: number;
    brand: string;
    model: string;
    releaseYear: number;
    description: string;
    images: string[];
    // technicalSpecifications: object;
    technicalSpecifications: Map<string, Map<string, string>>;
}
