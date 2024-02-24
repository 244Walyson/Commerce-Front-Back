import { Category } from "./CategoryModel";

export class ProductDTO {
    id: number;
    name: string;
    price: number;
    imgUrl: string;
    categories: Category[];
    description: string;

    constructor(id: number, description: string, name: string, price: number, imgUrl: string, categories: Category[]) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.imgUrl = imgUrl;
        this.categories = categories;
        this.description = description;
    }
}
