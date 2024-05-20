
type Category = 'Groceries' | 'Utilities' | 'Entertaintment';

// interface Category {

// }

interface Expense {
    id: number;
    description: string;
    amount: number;
    category: Category;
}