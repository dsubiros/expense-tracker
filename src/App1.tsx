import React, { useState } from "react";
import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import { Expense, CategoryType } from "./models/Expense";
import produce from "immer";

const App1 = () => {
  const [categoryFilter, setCategoryFilter] = useState<CategoryType | "">("");

  const [list, setList] = useState<Expense[]>([
    { id: 1, description: "Milk", amount: 5, category: "Groceries" },
    { id: 2, description: "Bread", amount: 2, category: "Groceries" },
    { id: 3, description: "Roku TV", amount: 299, category: "Entertaintment" },
    { id: 4, description: "Filtrete", amount: 11.88, category: "Utilities" },
  ]);
  const [count, setCount] = useState(list.length + 1);

  const [categories, setCategories] = useState<CategoryType[]>([
    "Groceries",
    "Utilities",
    "Entertaintment",
  ]);

  const handleSubmit = (data: Expense) => {
    setList(
      produce((draft) => {
        setCount(count + 1);
        draft.push({ ...data, id: count });
      })
    );
  };

  const handleDelete = (id: number) => setList(list.filter((x) => x.id !== id));

  return (
    <div>
      <ExpenseForm categories={categories} onSubmit={handleSubmit} />
      <ExpenseList
        list={list}
        categories={categories}
        categoryFilter={categoryFilter as CategoryType}
        onDelete={handleDelete}
        onFilter={filter => setCategoryFilter(filter)}
      />
    </div>
  );
};

export default App1;
