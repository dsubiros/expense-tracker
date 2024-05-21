export type CategoryType = "Groceries" | "Utilities" | "Entertaintment";

export interface Expense {
  id: number;
  description: string;
  amount: number;
  category: CategoryType;
  // category: Category;
}

// export enum Category {
//   Groceries = 1,
//   Utilities = 2,
//   Enterntaintment = 3,
// }
