import { ArchiveItem } from './archiveItem';
import { Card } from './card';
import { Address } from './address';

export interface User {
    id: string;
    email: string;
    basket: string;
    address: Address;
    card: Card;
    archive: ArchiveItem[];
}
