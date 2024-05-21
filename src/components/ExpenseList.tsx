import { useState } from "react";
import { CategoryType, Expense } from "../models/Expense";
import ExpenseFilter from "./ExpenseFilter";

interface Props {
  list: Expense[];
  categories: CategoryType[];
  categoryFilter: CategoryType;
  onFilter: (name: CategoryType) => void;
  onDelete: (id: number) => void;
}

const ExpenseList = ({
  list,
  categories,
  categoryFilter,
  onDelete,
  onFilter,
}: Props) => {
  const filteredList = !!categoryFilter
    ? list.filter((item) => item.category === categoryFilter)
    : list;

  const computedTotal = filteredList.reduce(
    (sum, { amount }) => (sum += amount),
    0
  );

  return (
    <div>
      <h1 className="mb-3">My Expenses List</h1>

      {/* {_genCategoryFilter(setCategoryFilter, categories)} */}
      <ExpenseFilter
        categories={categories}
        categoryFilter={categoryFilter}
        onFilter={onFilter}
      />

      {!filteredList.length ? (
        <strong>No items were found</strong>
      ) : (
        _genTable(filteredList, onDelete, computedTotal)
      )}
    </div>
  );
};

// function _genCategoryFilter(
//   setCategoryFilter: Function,
//   categories: CategoryType[]
// ) {
//   return (

//   );
// }

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
            <td>${amount.toFixed(2)}</td>
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
          <td>${computedTotal.toFixed(2)}</td>
          <td></td>
        </tr>
      </tbody>
    </table>
  );
}

export default ExpenseList;