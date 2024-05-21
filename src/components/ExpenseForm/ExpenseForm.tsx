import React, { FormEvent } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  id: z.number().optional(),
  description: z.string().min(1, { message: "Value is required" }),
//   amount: z.number().min(0.01).or(z.literal('')),
  amount: z.number().min(0.01).or(z.literal(0)),
  category: z.string().min(1, { message: "Value is required" }),
});

type FormData = z.infer<typeof schema>;

const ExpenseForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  console.log(errors);
  console.log(`isValid: ${isValid}`);

  const onSubmit = (data: FieldValues) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-5">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input
          {...register("description")}
          id="description"
          type="text"
          className="form-control"
        />

        <div className="mb-5">
          <label htmlFor="amount" className="form-label">
            Amount
          </label>
          <input
            {...register("amount", { valueAsNumber: true })}
            id="amount"
            type="number"
            className="form-control"
          />
          <button className="btn btn-primary mt-3" type="submit">
            Submit
          </button>
        </div>
      </div>

      {/* <hr /> */}
    </form>
  );
};

export default ExpenseForm;
