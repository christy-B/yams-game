export interface IPatrie{
    name: string;
    image: string;
    stock: number;
    quantityWon: number;
    winners?: { email: string; quantityWon: number }[];
}