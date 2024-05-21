import { useState } from "react";
import { CategoryType, Expense } from "../models/Expense";
import ExpenseFilter from "./ExpenseFilter";

interface Props {
  list: Expense[];
  categories: CategoryType[];
  selectedCategory: CategoryType;
  onSelectCategory: (name: CategoryType) => void;
  onDelete: (id: number) => void;
}

const ExpenseList = ({
  list,
  categories,
  selectedCategory,
  onDelete,
  onSelectCategory,
}: Props) => {

  const computedTotal = list.reduce(
    (sum, { amount }) => (sum += amount),
    0
  );

  return (
    <div>
      <strong>My Expenses List</strong>

      <ExpenseFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={onSelectCategory}
      />

      {!list.length ? (
        <strong>No items were found</strong>
      ) : (
        _genTable(list, onDelete, computedTotal)
      )}
    </div>
  );
};

function _genTable(
  list: Expense[],
  onDelete: (id: number) => void,
  computedTotal: number
) {
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <td>ID</td>
          <td>Description</td>
          <td>Amount</td>
          <td>Catregory</td>
        </tr>
      </thead>
      <tbody>
        {list.map(({ id, description, amount, category }) => (
          <tr key={id}>
            <td>{id}</td>
            <td>{description}</td>
            <td>{amount}</td>
            <td>{category}</td>
            <td>
              <button
                onClick={() => onDelete(id)}
                className="btn btn-danger btn-sm"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
        <tr>
          <td>
            <strong>Total</strong>
          </td>
          <td>${computedTotal}</td>
          <td></td>
        </tr>
      </tbody>
    </table>
  );
}

export default ExpenseList;
