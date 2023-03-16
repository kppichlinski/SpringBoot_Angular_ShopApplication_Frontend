import { Review } from "./review";

export interface ProductDetails {
    name: string,
    category: string,
    description: string,
    fullDescription: string,
    price: number,
    currency: string,
    image: string,
    slug: string,
    id: number,
    reviews: Array<Review>
}