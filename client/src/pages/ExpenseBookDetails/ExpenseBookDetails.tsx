import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import expenseBookDetailsStyle from "./ExpenseBookDetails.module.scss";
import CardLayout from "../../components/CardLayout/CardLayout";
import { useParams } from "react-router-dom";
import SubscriberPageLayout from "../../layouts/SubscriberPageLayout";
import {
  getExpenseBookDetails,
  CreateExpenseCategoryProps,
  createExpenseCategory,
  CreateExpenseListProps,
  createExpenseList,
} from "../../services/API";
import ExpenseCategoryCard from "../ExpenseCategory/ExpenseCategoryCard";
import {
  ExpenseCountByCategory,
  TotalExpenseChartTypes,
  ExpenseList,
  ExpenseCategory,
  ExpenseBookInfo,
} from "../../services/DataProvider";
import ExpenseListCard from "../ExpenseList/ExpenseListCard";
import ModalBox from "../../components/Modal/ModalBox";
import Charts from "../../components/Charts/Charts";
import TotalExpenseByDateChart from "../../components/Charts/TotalExpenseByDateChart";
import TextField from "../../components/Input/TextField";
import { count } from "console";

const ExpenseBookDetails = () => {
  const { slug } = useParams();

  /****************************************/
  /********* Expense Book Details   ******/
  /****************************************/
  // expense book details
  const [expenseBookDetails, setExpenseBookDetails] =
    useState<ExpenseBookInfo>();
  // expense book category
  const [expenseBookCategory, setExpenseBookCategory] = useState<
    ExpenseCategory[]
  >([]);

  // expense book Expense list
  const [expenseBookList, setExpenseBookList] = useState<ExpenseList[]>([]);
  //expense book total amount count based on each category
  const [expenseListTotalAmount, setExpenseBookTotalAmount] = useState<
    ExpenseCountByCategory[]
  >([]);

  // expense book total expenses count by each date.
  const [expenseCountByDate, setExpenseCountByDate] = useState<
    ExpenseCountByCategory[]
  >([]);
  // expense book total expense count

  const [
    totalExpenseCountForEachExpenseBook,
    setTotalExpenseCountForEachExpenseBook,
  ] = useState<ExpenseCountByCategory[]>([]);

  const loadExpenseBookDetails = async () => {
    try {
      const res = await getExpenseBookDetails(slug!);

      if (res) {
        setExpenseBookDetails(res.data.singleExpenseBook);
        setExpenseBookCategory(res.data.expenseBookCategory);

        // To set default value for the category state in the select tag.
        // While user create expense list they need to choose category then the first item will be auto select
        // in the select tag.
        setExpenseCategory(res.data.expenseBookCategory[0]?.category_name);
        //End To default save the first category in the state
        
        setExpenseBookList(res.data.expenseList);
        setExpenseBookTotalAmount(res.data.totalExpenses);
        setExpenseCountByDate(res.data.totalExpensesCountByDate);
        setTotalExpenseCountForEachExpenseBook(
          res.data.totalExpensesForEachExpenseBook
        );
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  /****************************************/
  /******Modal Box to Create Category   ***/
  /****************************************/

  const [open, setOpen] = useState<boolean>(false);
  const onOpenModal = () => {
    setOpen(true);
  };
  const onCloseModal = () => {
    setOpen(false);
  };

  /****************************************/
  /****** Create Category   ***************/
  /****************************************/

  const [categoryName, setCategoryName] = useState<string>("");

  const onSubmitCreateCategory = async () => {
    try {
      const payload: CreateExpenseCategoryProps = {
        category_name: categoryName,
        expense_book_id: expenseBookDetails?._id!,
      };
      const res = await createExpenseCategory(payload);
      if (res) {
        toast.success("Successfully created category", {
          position: toast.POSITION.TOP_RIGHT,
        });
        loadExpenseBookDetails();
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  /****************************************/
  /***Modal Box to Create Expense List  ***/
  /****************************************/

  const [openCreateExpenseListModal, setOpenCreateExpenseListModal] =
    useState<boolean>(false);

  const onOpenCreateExpenseListModal = () => {
    setOpenCreateExpenseListModal(true);
  };
  const onCloseCreateExpenseListModal = () => {
    setOpenCreateExpenseListModal(false);
  };

  /****************************************/
  /****** Create Expense List    **********/
  /****************************************/

  // Here by default to save the first category in the category state while create expense list.

  const [expenseTitle, setExpenseTitle] = useState<string>("");
  const [expenseCategory, setExpenseCategory] = useState<string>("");
  const [expenseAmmount, setExpenseAmmount] = useState<string>("");

  const onSubmitCreateExpenseList = async () => {
    try {

      const payload: CreateExpenseListProps = {
        title: expenseTitle,
        expense_category: expenseCategory,
        amount: parseInt(expenseAmmount),
        expense_book_id: expenseBookDetails!._id,
      };

      const res = await createExpenseList(payload);

      if (res) {
        toast.success("Successfully created expense", {
          position: toast.POSITION.TOP_RIGHT,
        });
        loadExpenseBookDetails();
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  /****************************************/
  /****** Choose Chart Type     **********/
  /****************************************/

  // to choose chart type from a select option --- dropdown list

  const [chooseChartType, setChooseChartType] =
    useState<TotalExpenseChartTypes>(TotalExpenseChartTypes.Area_Chart);

  //This function is to set tab value,.when user click one option it set one interger value
  
  const [expenseChartType, setExpenseChartType] = useState<number>(1);

  const handleChartType = (position: number) => {
    setExpenseChartType(position);
  };

  /****************************************/
  /******To show debug mode api data  *****/
  /****************************************/

  const [showDebugData, setDebugData] = useState<boolean>(false);

  const handleDebugData = () => {
    setDebugData(!showDebugData);
  };

  const [count,setCount] = useState<number>(1);
  const handleCount = ()=>{
    setCount((prev)=>prev+5);
  }


  useEffect(() => {
    loadExpenseBookDetails();
  }, []);

  return (
    <SubscriberPageLayout>
      <div className="container">
        <div className="row">
          <div className="col-xl-8 col-lg-8">
            <CardLayout>
              {/* Tab option to choose graph item */}
              <div className={expenseBookDetailsStyle.selectChartDataTab}>
                <div
                  className={
                    expenseChartType === 1
                      ? expenseBookDetailsStyle.expenseCategoryButtonActive
                      : expenseBookDetailsStyle.expenseCategoryButton
                  }
                  onClick={() => handleChartType(1)}
                >
                  <h6>Category Expenses</h6>
                  {totalExpenseCountForEachExpenseBook &&
                    totalExpenseCountForEachExpenseBook.map((total: any) => (
                      <h5>{total.totalammount}.EUR</h5>
                    ))}
                </div>

                {/* Chart to show expenses based on each date */}
                <div
                  className={
                    expenseChartType === 2
                      ? expenseBookDetailsStyle.expenseTotalExpenseButtonActive
                      : expenseBookDetailsStyle.expenseTotalExpenseButton
                  }
                  onClick={() => handleChartType(2)}
                >
                  <h6> Day Expenses</h6>
                </div>
              </div>

              {/* To show chart */}

              {/* Chart to count total expenses by date */}

              {expenseChartType === 1 && (
                <>
                  <div className="choose_chart">
                    <select
                      className={expenseBookDetailsStyle.expenseChartSelection}
                      value={chooseChartType}
                      onChange={(e) =>
                        setChooseChartType(
                          e.target.value as TotalExpenseChartTypes
                        )
                      }
                    >
                      {Object.keys(TotalExpenseChartTypes).map((chart_type) => (
                        <option value={chart_type}>{chart_type}</option>
                      ))}
                    </select>
                  </div>
                  <Charts
                    expenseListTotalAmount={expenseListTotalAmount}
                    chooseChartType={chooseChartType}
                  />
                </>
              )}

              {/* Chart for showing expenses by category */}

              {expenseChartType === 2 && (
                <TotalExpenseByDateChart
                  totalExpensesByDate={expenseCountByDate}
                />
              )}
            </CardLayout>

            {/* To show debug option */}

            <CardLayout>
              <button className="btn btn-primary" onClick={handleDebugData}>
                Debug
              </button>
              {showDebugData && <h6>{JSON.stringify(expenseBookDetails)}</h6>}
              <button className="btn btn-success" onClick={handleCount}>CountChange</button>
              <h6>{count}</h6>
            </CardLayout>

            <CardLayout title="Expense Book Details">
              {expenseCategory}
            </CardLayout>

            {/* To Show Expense List 
            
            all the list of expense book
            */}

            <CardLayout
              title="Expense List"
              showAddIcon={true}
              openModal={onOpenCreateExpenseListModal}
            >
              {expenseBookList &&
                expenseBookList.map((list) => (
                  <ExpenseListCard key={list._id} expenseList={list} />
                ))}

              {/* Modal Box -To create expense list  
              
              in this modal box user will have option to create expense list for each expense book
              */}

              <ModalBox
                title="Create Expense Category"
                open={openCreateExpenseListModal}
                onCloseModal={onCloseCreateExpenseListModal}
                onSaveButton={onSubmitCreateExpenseList}
              >
                <label>Title:</label>

                <div className="form-group">
                  <input
                    type="text"
                    name="Name"
                    className={expenseBookDetailsStyle.expenseTitle}
                    placeholder="Title.."
                    value={expenseTitle}
                    onChange={(e) => setExpenseTitle(e.target.value)}
                  />
                </div>
                <label>Ammount:</label>

                <div className="form-group">
                  <input
                    type="number"
                    name="Name"
                    className={expenseBookDetailsStyle.expenseAmmount}
                    placeholder="Ammount.."
                    value={expenseAmmount}
                    onChange={(e) => setExpenseAmmount(e.target.value)}
                  />
                </div>
                <label>Choose type:</label>

                {expenseCategory}

                <div className="selected-dropdownlist">
                  <select
                    className={expenseBookDetailsStyle.expenseCategorySelect}
                    value={expenseCategory}
                    onChange={(e) => setExpenseCategory(e.target.value)}
                  >
                    {expenseBookCategory &&
                      expenseBookCategory.map((c) => (
                        <>
                          <option value={c.category_name} key={c._id}>
                            {c.category_name}
                          </option>
                        </>
                      ))}
                  </select>
                </div>
              </ModalBox>
            </CardLayout>
          </div>

          {/* To Show Expense Book Category 
          List of category for each expense book. This category list is inside of each expense book..
          */}

          <div className="col-xl-4 col-lg-4">
            <CardLayout
              title="Expense Category"
              showAddIcon={true}
              openModal={onOpenModal}
            >
              {expenseBookCategory &&
                expenseBookCategory.map((cat) => (
                  <ExpenseCategoryCard expense_category={cat} key={cat._id} />
                ))}
            </CardLayout>

            {/* Modal Box -To create category  */}

            <ModalBox
              title="Create Expense Category"
              open={open}
              onCloseModal={onCloseModal}
              onSaveButton={onSubmitCreateCategory}
            >
              <TextField
                label="Category"
                placeholder="Category name...."
                value={categoryName}
                setValue={setCategoryName}
              />
            </ModalBox>
          </div>
        </div>
      </div>
    </SubscriberPageLayout>
  );
};

export default ExpenseBookDetails;
