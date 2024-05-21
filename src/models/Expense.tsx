// import { Category } from "../App1";

export type CategoryType = "Groceries" | "Utilities" | "Entertaintment";

// interface Category {

// }

export interface Expense {
  id: number;
  description: string;
  amount: number;
  category: CategoryType;
  // category: Category;
}

// export enum Category {
//   Groceries,
//   Utilities,
//   Enterntaintment,
// }

// export interface Category {
//   name: CategoryType;
// }

// export enum Category {
//   Groceries = 1,
//   Utilities = 2,
//   Enterntaintment = 3,
// }
