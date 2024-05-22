import React, { useState } from "react";

import ExpenseList from "./components/ExpenseList";
import ExpenseForm from "./components/ExpenseForm";
import { Expense, CategoryType } from "./models/Expense";
import produce from "immer";
import ExpenseForm2 from "./components/ExpenseForm2";

const App1 = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | "">(
    ""
  );

  const [list, setList] = useState<Expense[]>([
    { id: 1, description: "Milk", amount: 5, category: "Groceries" },
    { id: 2, description: "Bread", amount: 2, category: "Groceries" },
    { id: 3, description: "Roku TV", amount: 299, category: "Entertaintment" },
    { id: 4, description: "Filtrete", amount: 11.88, category: "Utilities" },
  ]);

  const filteredList = !!selectedCategory
    ? list.filter((item) => item.category === selectedCategory)
    : list;

  const [count, setCount] = useState(list.length + 1);

  const handleSubmit = (data: Expense) => {
    setList(
      produce((draft) => {
        setCount(count + 1);
        draft.push({ ...data, id: count });
      })
    );
  };

  const handleSubmit2 = (data: any) => {
    console.log(data);

    setList([...list, { ...data, id: count } as Expense]);
    setCount(count + 1);
  };

  const handleDelete = (id: number) => setList(list.filter((x) => x.id !== id));

  return (
    <div>
      {/* <ExpenseForm categories={categories} onSubmit={handleSubmit} /> */}
      <div className="mb-5">
        {/* <ExpenseForm2 onSubmit={handleSubmit2}/> */}
        <ExpenseForm2 onSubmit={handleSubmit2} />
      </div>

      <hr />
      <ExpenseList
        list={filteredList}
        selectedCategory={selectedCategory as CategoryType}
        onDelete={handleDelete}
        onSelectCategory={(filter) => setSelectedCategory(filter)}
      />
    </div>
  );
};

export default App1;
