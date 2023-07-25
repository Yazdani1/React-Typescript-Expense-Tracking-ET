import { FC } from "react";
import { toast } from "react-toastify";

import { IncomeRecord } from "../../services/DataProvider";
import style from "./Income.module.scss";
import { deleteIncomeRecord } from "../../services/API";
import { useIncomeRecordContext } from "../../contextapi/IncomeRecordContext";

interface IncomeCardProps {
  incomeRecord: IncomeRecord;
  //This post id is just to test if saved post opiton and button change work
  postid: string;
}

const IncomeCard: FC<IncomeCardProps> = ({ incomeRecord,postid }) => {

  const { allIncomeRecords,loadLogedInUserIncomeRecords } = useIncomeRecordContext();

  /****************************************/
  /****** To delete income record  ********/
  /****************************************/
  
  const deleteSingleIncomeRecord = async () => {
    try {
      const res = await deleteIncomeRecord(incomeRecord._id);
      if (res) {
        toast.success("Income record deleted successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        loadLogedInUserIncomeRecords();
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (

    <div className={style.incomeRecordItems}>
      <h6>{incomeRecord.title}</h6>
      <h6>{incomeRecord.des}</h6>
      <h6>{incomeRecord.amount}</h6>
      <h6>{incomeRecord.date}</h6>
      <button className="btn btn-danger" onClick={deleteSingleIncomeRecord}>
        Delete
      </button>
      <p>{incomeRecord._id === postid && "Saved"} </p>
    </div>
  );
};

export default IncomeCard;
