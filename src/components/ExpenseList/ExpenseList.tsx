import React from "react";

interface Props {
  list: Expense[];
}

const ExpenseList = ({ list }: Props) => {
  const computedTotal = list.reduce((sum, { amount }) => (sum += amount), 0);

  return (
    <div>
      <strong>My Expenses List</strong>
      <table className="table table-bordered">
        <tr>
          <td>Description</td>
          <td>Amount</td>
          <td>Catregory</td>
        </tr>
        {list.map(({ id, description, amount, category }) => (
          <tr key={id}>
            <td>{description}</td>
            <td>{amount}</td>
            <td>{category}</td>
          </tr>
        ))}
        <tr>
          <td>Total</td>
          <td>${computedTotal}</td>
          <td></td>
        </tr>
      </table>
    </div>
  );
};

export default ExpenseList;
