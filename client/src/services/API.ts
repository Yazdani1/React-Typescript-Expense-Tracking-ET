import axios from "axios";
import { API_URL, headerConfig } from "./Config";

/****************************************/
/*********     User         *************/
/****************************************/

export interface UserRegistrationProps {
  name: string;
  email: string;
  password: string;
}

export const userRegistration = async (props: UserRegistrationProps) => {
  const res = await axios.post(API_URL + "/registration", { ...props });
  return res;
};

export interface UserLoginProps {
  email: string;
  password: string;
}

export const userLogin = async (props: UserLoginProps) => {
  const res = await axios.post(API_URL + "/login", { ...props });
  return res;
};

/****************************************/
/*********User Role For Admin Site ******/
/****************************************/

export const getUserRoleForAdmin = async () => {
  const res = await axios.get(API_URL + "/current-user-role", headerConfig());
  return res;
};

/****************************************/
/********* All User List Only Admin ******/
/****************************************/

export const getAllUserList = async () => {
  const res = await axios.get(API_URL + "/alluser", headerConfig());
  return res;
};

/****************************************/
/********* Expense Book            ******/
/****************************************/

export interface CreateExpenseProps {
  name: string;
  color: string;
}

export const createExpenseBook = async (props: CreateExpenseProps) => {
  const res = await axios.post(API_URL + "/create-expensebook", { ...props },headerConfig());
  return res;
};

export const getExpenseBookList = async () => {
  const res = await axios.get(
    API_URL + "/get-expensebook-list",
    headerConfig()
  );
  return res;
};


/****************************************/
/********* Expense Book Details   ******/
/****************************************/

export const getExpenseBookDetails = async(slug: string)=>{
  const res = await axios.get(API_URL + "/expense-book-details/"+slug,headerConfig());
  return res;
}

export interface CreateExpenseCategoryProps {
  category_name: string;
  expense_book_id: string;
}

export const createExpenseCategory = async(props:CreateExpenseCategoryProps)=>{
  const res = await axios.post(API_URL + "/create-expense-category",{...props},headerConfig());
  return res;
}

export interface CreateExpenseListProps {
  title: string;
  amount: number;
  expense_book_id: string;
  expense_category: string;
}

export const createExpenseList = async(props:CreateExpenseListProps)=>{
  const res = await axios.post(API_URL + "/create-expense-list",{...props},headerConfig());
  return res;
}