import React, { useState } from "react";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import { Expense, CategoryType } from "./models/Expense";
import produce from "immer";

const App1 = () => {
  const [count, setCount] = useState(1);

  const [list, setList] = useState<Expense[]>([
    // { id: 1, description: "Milk", amount: 5, category: Category.Groceries },
    // { id: 2, description: "Bread", amount: 2, category: Category.Groceries },
    // { id: 3, description: "Cheese", amount: 3, category: Category.Groceries },

    { id: 1, description: "Milk", amount: 5, category: "Groceries" },
    { id: 2, description: "Bread", amount: 2, category: "Groceries" },
    { id: 3, description: "Roku TV", amount: 299, category: "Entertaintment" },
    { id: 4, description: "Filtrete", amount: 11.88, category: "Utilities" },
  ]);

  const [categories, setCategories] = useState<CategoryType[]>([
    "Groceries",
    "Utilities",
    "Entertaintment",
  ]);

  const handleSubmit = (data: Expense) => {
    setList(
      produce((draft) => {
        draft.push({ ...data, id: count + 1 });
        setCount(count + 1);
      })
    );
  };

  const handleDelete = (id: number) => {
    console.warn(`EXEC handleDelete with id=${id}`);

    setList(
      produce((draft) => {
        return draft.filter((x) => x.id !== id);
      })
    );
  };

  return (
    <div>
      <ExpenseForm categories={categories} onSubmit={handleSubmit} />
      <ExpenseList
        list={list}
        categories={categories}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default App1;
