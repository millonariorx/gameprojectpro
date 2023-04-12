export class Category {
    CategoryId!: number;
    CategoryName!: string;
    constructor(CategoryId: number,CategoryName: string) {
        this.CategoryId = CategoryId;
        this.CategoryName = CategoryName
    }
    
}