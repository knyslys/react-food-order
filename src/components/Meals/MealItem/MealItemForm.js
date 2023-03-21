import React, { useRef, useState } from "react";
import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";
function MealItemForm(props) {
  const amountInputRef = useRef();
  const [formIsValid, setIsFormValid] = useState(true);
  const submitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = +amountInputRef.current.value;

    if (enteredAmount === 0 || enteredAmount < 1 || enteredAmount > 5) {
      setIsFormValid(false);
      return;
    }

    props.onAddToCart(enteredAmount);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>Add</button>
      {!formIsValid && <p>Please enter a valid amount</p>}
    </form>
  );
}

export default MealItemForm;
