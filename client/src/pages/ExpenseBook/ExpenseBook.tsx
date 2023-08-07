import React, { useEffect, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';

import { loginSuccess } from '../../redux/userSlice';
import { getExpenseBookList, createExpenseBook, CreateExpenseProps, getLogedInUserProfile } from '../../services/API';
import { ExpenseBookColor, ExpenseBookInfo, UserProfileDetails } from '../../services/DataProvider';
import SubscriberPageLayout from '../../layouts/SubscriberPageLayout';
import CardLayout from '../../components/CardLayout/CardLayout';
import expenseBookStyle from './ExpenseBook.module.scss';
import ExpenseBookCard from './ExpenseBookCard';
import ModalBox from '../../components/Modal/ModalBox';
import ConfirmModal from '../../components/Modal/ConfirmModal';
import { UserContext } from '../../contextapi/UserContext';
import { UserProfileDetailsContext } from '../../contextapi/UserProfileDetailsContext';
import { useUserContext } from '../../contextapi/UserContextCookies';

const ExpenseBook = () => {
  const dispatch = useDispatch();

  ///////////////////////////////////////////////////////////////////////
  // const [state, setState] = useContext(UserContext);
  // const { userProfileDetails, updateUserProfileDetails } = useContext(
  //   UserProfileDetailsContext
  // );
  //// Context API to update
  //const { setUser  } = useUserContext();
  ///////////////////////////////////////////////////////////////////////

  /****************************************/
  /******  To Open Modal Box     **********/
  /****************************************/

  const [open, setOpen] = useState<boolean>(false);

  const onOpenModal = () => {
    setOpen(true);
  };
  const onCloseModal = () => {
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

  const [allExpenseBook, setAllExpenseBook] = useState<ExpenseBookInfo[]>([]);

  /**
   * Here Promise<void> is a return type. it means this function return nothing..
   */

  const loadAllExpenseBookList = async (): Promise<void> => {
    try {
      const res = await getExpenseBookList();
      if (res) {
        setAllExpenseBook(res);
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

  const [expenseBookName, setExpenseBookName] = useState<string>('');

  const [expenseBookColor, setExpenseBookColor] = useState<ExpenseBookColor>(ExpenseBookColor.Orange);

  //////////////////////////////////////////////////////
  /////////////////    Radio button start ///////////////
  //////////////////////////////////////////////////////

  // to select expense book color from radio button
  const onChangeRadioButtonSelectExpenseBookColor = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExpenseBookColor(event.target.value as ExpenseBookColor);
  };

  const onSubmitCreateExpenseBook = async () => {
    try {
      const payload: CreateExpenseProps = {
        name: expenseBookName,
        color: expenseBookColor,
      };
      const res = await createExpenseBook(payload);
      if (res) {
        toast.success('You have Created Expense Book Successfully!', {
          position: toast.POSITION.BOTTOM_RIGHT,
        });
        dispatch(loginSuccess(res.addUserPoints));
        loadAllExpenseBookList();
        resetInputFields();

        ///////////////////////////////////////////////////
        // // To update the context api
        // updateUserProfileDetails(res.addUserPoints);
        // // To update Context API cookies
        // setUser(res.addUserPoints)
        ///////////////////////////////////////////////////
      }
    } catch (error: any) {
      toast.error(error.response && error.response.data.error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  /**
   * To reset input field if user click on the reset button or as soon as user create a expense book
   * Then user will see empty input fields
   */
  const resetInputFields = () => {
    setExpenseBookName('');
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
          <CardLayout title="All Expense Book" openModal={onOpenModal} showAddIcon={true}>
            <div className="row">
              {allExpenseBook &&
                allExpenseBook.map((expensebook) => (
                  <div className="col-xl-4 col-lg-4">
                    <ExpenseBookCard expense_book={expensebook} key={expensebook._id} />
                  </div>
                ))}
            </div>
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

            <div onChange={onChangeRadioButtonSelectExpenseBookColor} className={expenseBookStyle.chooseExpenseColorContainer}>
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
                    <input type="radio" value={color} name="color" checked={expenseBookColor === color} />
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
            <h6>Are you sure you want to discard this expense book? Your expense book won't be saved.</h6>
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
