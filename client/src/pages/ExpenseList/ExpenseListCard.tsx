import { FC } from "react";
import moment from "moment";

import expenseListCardStyle from "./ExpenseListCard.module.scss";
import { ExpenseList } from "../../services/DataProvider";

interface ExpenseListCardProps {
  expenseList: ExpenseList;
}

const ExpenseListCard: FC<ExpenseListCardProps> = ({ expenseList }) => {
  return (
    <div className={expenseListCardStyle.expenseListCardContainer}>
      <div className="row">
        <div className="col-xl-3 col-lg-2 col-md-12 col-sm-6">
          <h6>{expenseList.title}</h6>
        </div>
        <div className="col-xl-3 col-lg-2 col-md-12 col-sm-6">
          <h6>{expenseList.amount}</h6>
        </div>
        <div className="col-xl-3 col-lg-2 col-md-12 col-sm-6">
          <h6>{expenseList.expense_category}</h6>
        </div>

        <div className="col-xl-3 col-lg-2 col-md-12 col-sm-6">
          <h6> {moment(expenseList.date).format("MMM Do YY")}</h6>
        </div>
        
      </div>
    </div>
  );
};

export default ExpenseListCard;
