import { BasketItem } from './basketItem';

export interface Basket {
    id: string;
    count: number;
    totalPrice: number;
    items: BasketItem[];
}
