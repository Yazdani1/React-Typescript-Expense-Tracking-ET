import { FC } from "react";

import style from "./ExpenseCategoryCard.module.scss";
import { ExpenseCategory } from "../../services/DataProvider";
import DropDownList from "../../components/DropDown/DropDownList";

interface ExpenseCategoryCardProps {
  expense_category: ExpenseCategory;
}

const ExpenseCategoryCard: FC<ExpenseCategoryCardProps> = ({
  expense_category,
}) => {

  return (
    <div className={style.categoryCardContainer}>
      <p>
        {expense_category.category_name}
        <DropDownList />
      </p>
    </div>
  );
  
};

export default ExpenseCategoryCard;
