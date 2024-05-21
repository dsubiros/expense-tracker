import React, { useState } from "react";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import { Expense, CategoryType } from "./models/Expense";
import produce from "immer";

const App1 = () => {
  const [list, setList] = useState<Expense[]>([
    // { id: 1, description: "Milk", amount: 5, category: Category.Groceries },
    // { id: 2, description: "Bread", amount: 2, category: Category.Groceries },
    // { id: 3, description: "Cheese", amount: 3, category: Category.Groceries },

    { id: 1, description: "Milk", amount: 5, category: "Groceries" },
    // { id: 2, description: "Bread", amount: 2, category: "Groceries" },
    // { id: 3, description: "Roku TV", amount: 299, category: "Entertaintment" },
  ]);

  const [categories, getCategories] = useState<CategoryType[]>([
    "Groceries",
    "Utilities",
    "Entertaintment",
  ]);

  const handleSubmit = (data: Expense) => {
    setList(
      produce((draft) => {
        draft.push({ ...data, id: draft.length + 1 });
      })
    );
  };

  console.log("FROM App1");

  return (
    <div>
      <ExpenseForm categories={categories} onSubmit={handleSubmit} />
      <ExpenseList list={list} />
    </div>
  );
};

export default App1;
