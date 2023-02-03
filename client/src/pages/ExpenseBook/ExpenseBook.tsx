import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  getExpenseBookList,
  createExpenseBook,
  CreateExpenseProps,
} from "../../services/API";
import { ExpenseBookColor } from "../../services/DataProvider";
import SubscriberPageLayout from "../../layouts/SubscriberPageLayout";
import CardLayout from "../../components/CardLayout/CardLayout";
import expenseBookStyle from "./ExpenseBook.module.scss";
import ExpenseBookCard from "./ExpenseBookCard";
import ModalBox from "../../components/Modal/ModalBox";
import ConfirmModal from "../../components/Modal/ConfirmModal";

const ExpenseBook = () => {
  const imgData = [
    {
      url: "https://images.pexels.com/photos/10288854/pexels-photo-10288854.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    },
    {
      url: "https://images.pexels.com/photos/6012657/pexels-photo-6012657.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      url: "https://images.pexels.com/photos/12940682/pexels-photo-12940682.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
    {
      url: "https://images.pexels.com/photos/7403915/pexels-photo-7403915.jpeg?auto=compress&cs=tinysrgb&w=1600&lazy=load",
    },
  ];

  /****************************************/
  /******  To Open Modal Box     **********/
  /****************************************/

  const [open, setOpen] = useState<boolean>(false);

  const onOpenModal = () => {
    setOpen(true);
  };
  const onCloseModal = () => {
    // setOpen(false);
    onOpenDiscardModal();
  };
  /****************************************/
  /** Discard Modal for Discard Box    ****/
  /****************************************/

  const [openDiscardModal, setOpenDiscardModal] = useState<boolean>(false);

  const onOpenDiscardModal = () => {
    setOpenDiscardModal(true);
  };

  const onCloseDiscardModal = () => {
    setOpenDiscardModal(false);
  };

  // to discard post, When user click on the exit button a new modal box should open
  // to show if user really want to discard the post.

  const discardCreatingExpenseBookModal = () => {
    setOpenDiscardModal(false);
    setOpen(false);
    resetInputFields();
  };

  // to keep adding post, This will open a modal and when user click on the Keep button it should 
  // disable the modal box.

  const keepAddingExpenseBook = () => {
    setOpenDiscardModal(false);
  };

  /****************************************/
  /****** Load All Expense Book      ******/
  /****************************************/

  const [allExpenseBook, setAllExpenseBook] = useState([]);

  const loadAllExpenseBookList = async () => {
    try {
      const res = await getExpenseBookList();

      if (res) {
        setAllExpenseBook(res.data);
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  /****************************************/
  /****** Create  Expense Book      *******/
  /****************************************/

  const [expenseBookName, setExpenseBookName] = useState<string>("");
  const [expenseBookColor, setExpenseBookColor] = useState<string>(
    ExpenseBookColor.Orange
  );

  // test to add image in an array

  const [tags, setTags] = useState<any>([]);

  const addTest = (value: string) => {
    setTags([...tags, value]);
  };

   //end test to add image in an array

  //////////////////////////////////////////////////////
  /////////////////    Radio button start ///////////////
  //////////////////////////////////////////////////////

  // to select expense book color from radio button
  const onChangeRadioButtonSelectExpenseBookColor = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setExpenseBookColor(event.target.value);
  };

  const onSubmitCreateExpenseBook = async () => {
    try {
      const payload: CreateExpenseProps = {
        name: expenseBookName,
        color: expenseBookColor,
      };
      const res = await createExpenseBook(payload);
      if (res) {
        toast.success("You have Created Expense Book Successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        loadAllExpenseBookList();
        setExpenseBookName("");
        setExpenseBookColor(ExpenseBookColor.Orange);
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  // to reset input field

  const resetInputFields = () => {
    setExpenseBookName("");
    setExpenseBookColor(ExpenseBookColor.Orange);
  };

  /****************************************/
  /**    End Create Expense Book Section **/
  /****************************************/

  useEffect(() => {
    loadAllExpenseBookList();
  }, []);

  return (
    <SubscriberPageLayout>
      <div className="row">
        <div className="col-xl-8 col-lg-8 col-md-8 col-sm-12">
          <CardLayout
            title="All Expense Book"
            openModal={onOpenModal}
            showAddIcon={true}
          >
            <div className="row">
              {allExpenseBook &&
                allExpenseBook.map((expensebook: any, index) => (
                  <div className="col-xl-4 col-lg-4">
                    <ExpenseBookCard expense_book={expensebook} />
                  </div>
                ))}
            </div>

            {imgData.map((imageurl: any) => (
              <>
                <img
                  src={imageurl.url}
                  height="100px"
                  width="100px"
                  style={{ margin: "10px" }}
                  onClick={() => addTest(imageurl.url)}
                />
                {/* <button
                  onClick={() => addTest(imageurl.url)}
                  className="btn btn-info"
                >
                  Select Image
                </button> */}
              </>
            ))}

            {/* //End Test to add multiple image into an array in database*/}
          </CardLayout>

          {/***  Creat Expense Book Modal Box  ******/}

          <ModalBox
            open={open}
            onCloseModal={onCloseModal}
            title="Create Expense Book"
            onResetButton={resetInputFields}
            onSaveButton={onSubmitCreateExpenseBook}
          >
            {/* Radio button to choose expense book color*/}
            <div
              onChange={onChangeRadioButtonSelectExpenseBookColor}
              className={expenseBookStyle.chooseExpenseColorContainer}
            >
              {/* To loop color from enum and set into the radio button */}
              {Object.keys(ExpenseBookColor).map((color) => (
                <div
                  className={
                    ExpenseBookColor.Orange === color
                      ? expenseBookStyle.chooseExpenseOrangeColorDesign
                      : ExpenseBookColor.Yellow === color
                      ? expenseBookStyle.chooseExpenseYellowColorDesign
                      : expenseBookStyle.chooseExpenseGreenColorDesign
                  }
                >
                  <label>
                    <input
                      type="radio"
                      value={color}
                      name="color"
                      checked={expenseBookColor === color}
                    />
                  </label>
                </div>
              ))}

              {/* <div className={expenseBookStyle.chooseExpenseOrangeColorDesign}>
                <label>
                  <input
                    type="radio"
                    value={ExpenseBookColor.Orange}
                    name="color"
                    checked={expenseBookColor === ExpenseBookColor.Orange}
                  />

                </label>
              </div> */}

              {/* <div className={expenseBookStyle.chooseExpenseGreenColorDesign}>
                <label>
                  <input
                    type="radio"
                    value={ExpenseBookColor.Green}
                    name="color"
                    checked={expenseBookColor === ExpenseBookColor.Green}
                  />
                 
                </label>
              </div> */}

              {/* 
              <div className={expenseBookStyle.chooseExpenseYellowColorDesign}>
                <label>
                  <input
                    type="radio"
                    value={ExpenseBookColor.Yellow}
                    name="color"
                    checked={expenseBookColor === ExpenseBookColor.Yellow}
                  />
                </label>
              </div> */}
            </div>

            <div className="form-group">
              <input
                type="text"
                name="Name"
                // className={expenseBookStyle.expenseBookName}
                className={
                  ExpenseBookColor.Orange === expenseBookColor
                    ? expenseBookStyle.selectExpenseColorOrange
                    : ExpenseBookColor.Yellow === expenseBookColor
                    ? expenseBookStyle.selectExpenseColorYellow
                    : expenseBookStyle.selectExpenseColorGreen
                }
                placeholder="Book name..*"
                value={expenseBookName}
                onChange={(e) => setExpenseBookName(e.target.value)}
              />
            </div>
          </ModalBox>

          {/*** Distcard Confirm Modal Box  ******/}

          <ConfirmModal
            keepAddingExpenseBook={keepAddingExpenseBook}
            discardPost={discardCreatingExpenseBookModal}
            title="Discard Expense Book?"
            onCloseModal={onCloseDiscardModal}
            open={openDiscardModal}
            showDiscardButton={true}
          >
            <h6>
              Are you sure you want to discard this expense book? Your expense
              book won't be saved.
            </h6>
          </ConfirmModal>
        </div>
        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
          <CardLayout title="Recently Opened"></CardLayout>
        </div>
      </div>
    </SubscriberPageLayout>
  );
};

export default ExpenseBook;
