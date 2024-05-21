import React from "react";
import { CategoryType } from "../models/Expense";

interface Props {
  categories: CategoryType[];
  selectedCategory: CategoryType;
  onSelectCategory: (name: CategoryType) => void;
}

const ExpenseFilter = ({ categories, selectedCategory, onSelectCategory }: Props) => {
  return (
    <div className="mb-5">
      <label htmlFor="" className="form-label">
        Select to filter by catgory
      </label>
      <select
        onChange={({ currentTarget: { value } }) => {
          console.log(value);
        //   setCategoryFilter(value);
          onSelectCategory(value as CategoryType);
        }}
        id="categoryId"
        className="form-select mb-5"
      >
        <option></option>
        {categories.map((cat) => (
          <option key={cat} value={cat} label={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ExpenseFilter;