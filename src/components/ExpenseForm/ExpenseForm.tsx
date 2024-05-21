import React, { FormEvent } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { literal, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { CategoryType, Expense } from "../../models/Expense";

interface Props {
  categories: CategoryType[];
  onSubmit: (data: Expense) => void;
}

const schema = z.object({
  id: z.number().optional(),
  description: z.string().min(1, { message: "Value is required" }),
  // amount: z.coerce.number({ invalid_type_error: "Value is required" }).min(1),
  amount: z.number().positive(),
  // amount: z
  // .preprocess(
  //   (a) => parseFloat(z.string().parse(a)),
  //   z.number({
  //     invalid_type_error: "Amount must be Number",
  //   })
  // )
  // .optional(),
  category: z.string().min(1, { message: "Value is required" }),
});

type FormData = z.infer<typeof schema>;

const ExpenseForm = ({ categories, onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  // console.log(errors);
  // console.log(`isValid: ${isValid}`);
  // console.log(getValues());

  // const onSubmit = (data: FieldValues) => {
  //   console.log(`Submitting data`);
  //   onSubmit(data);
  // };

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data as Expense);
        reset();
      })}
      noValidate
    >
      <p>{JSON.stringify(getValues())}</p>
      <div className="mb-5">
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          <input
            {...register("description")}
            id="description"
            type="text"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">
            Amount
          </label>
          <input
            {...register("amount", {
              valueAsNumber: true,
            })}
            id="amount"
            type="number"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="categoryId" className="form-label">
            Category
          </label>
          <select
            {...register("category")}
            onChange={(item) => console.log(item)}
            id="categoryId"
            className="form-select"
          >
            <option>Select category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat} label={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <button className="btn btn-primary mt-1" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;
