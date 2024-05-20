import React, { useState } from 'react'
import ExpenseList from './components/ExpenseList';

const App1 = () => {
    const [list, setList] = useState<Expense[]>([
        {id: 1, description: 'Milk', amount: 5, category: 'Groceries'},
        {id: 2, description: 'Bread', amount: 2, category: 'Groceries'},
        {id: 3, description: 'Cheese', amount: 3, category: 'Groceries'},
    ]);

  return (
    <div>
        <ExpenseList list={list}/>
    </div>
  )
}

export default App1