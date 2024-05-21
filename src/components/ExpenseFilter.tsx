import React from "react";
import { CategoryType } from "../models/Expense";
import categories from "../categories";

interface Props {
  // categories: CategoryType[];
  selectedCategory: CategoryType;
  onSelectCategory: (name: CategoryType) => void;
}

const ExpenseFilter = ({ selectedCategory, onSelectCategory }: Props) => {
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
        <option>All categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ExpenseFilter;
