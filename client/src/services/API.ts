import axios from 'axios';

import { API_URL, headerConfig } from './Config';
import {
  UserRole,
  ExpenseBookInfo,
  IncomeRecord,
  UserProfileUpdate,
  UserAward,
  NationalID,
  UserProfileDetails,
  ExpenseCategory,
  ExpenseList,
  CreateExpenseBook,
} from '../services/DataProvider';

/****************************************/
/*********     User         *************/
/****************************************/

export interface UserRegistrationProps {
  name: string;
  email: string;
  password: string;
  city: string;
  countryName: string;
  continent: string;
  latitude: number;
  longitude: number;
}

export const userRegistration = async (props: UserRegistrationProps) => {
  const res = await axios.post(API_URL + '/registration', { ...props });
  return res;
};

export interface UserLoginProps {
  email: string;
  password: string;
}

export const userLogin = async (props: UserLoginProps) => {
  const res = await axios.post(API_URL + '/login', { ...props });
  return res;
};

export interface UserDetailsUpdateProps {
  name: string;
  email: string;
  role: UserRole;
  blockUser: boolean;
  award: UserAward[];
}

export const updateUserDetails = async (id: string, props: UserDetailsUpdateProps): Promise<UserProfileDetails> => {
  const res = await axios.put(API_URL + '/update-user-profile/' + id, { ...props }, headerConfig());
  return res.data;
};

export const getUserAccountRegistrationLocation = async (latitude: number, longitude: number) => {
  const res = await axios.get(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
  );
  return res;
};

// Update loged in user profile

export interface UpdateUserProfileProps {
  name: string;
  email: string;
  imageUrl: string;
  skills: string[];
}
export const updateSingleUserProfile = async (id: string, props: UpdateUserProfileProps): Promise<UserProfileUpdate> => {
  const res = await axios.put(API_URL + '/update-single-user-profile/' + id, { ...props }, headerConfig());
  return res.data;
};

// To get loged in user profile and its only for test purpose and maybe can use in the profile page and context api
export const getLogedInUserProfile = async (): Promise<UserProfileDetails> => {
  const res = await axios.get(API_URL + '/user-profile', headerConfig());
  return res.data as UserProfileDetails;
};

/****************************************/
/*********User Role For Admin Site ******/
/****************************************/

export const getUserRoleForAdmin = async (): Promise<UserProfileDetails> => {
  const res = await axios.get(API_URL + '/current-user-role', headerConfig());
  return res.data as UserProfileDetails;
};

/****************************************/
/********* All User List Only Admin ******/
/****************************************/

export const getAllUserList = async (): Promise<UserProfileDetails[]> => {
  const res = await axios.get(API_URL + '/alluser', headerConfig());
  return res.data as UserProfileDetails[];
};

/****************************************/
/********* Expense Book            ******/
/****************************************/

export interface CreateExpenseProps {
  name: string;
  color: string;
}

export const createExpenseBook = async (props: CreateExpenseProps): Promise<CreateExpenseBook> => {
  const res = await axios.post(API_URL + '/create-expensebook', { ...props }, headerConfig());
  return res.data;
};

export const getExpenseBookList = async (): Promise<ExpenseBookInfo[]> => {
  const res = await axios.get(API_URL + '/get-expensebook-list', headerConfig());
  return res.data as ExpenseBookInfo[];
};

/****************************************/
/********* Expense Book Details   ******/
/****************************************/

export const getExpenseBookDetails = async (slug: string) => {
  const res = await axios.get(API_URL + '/expense-book-details/' + slug, headerConfig());
  return res;
};

export interface CreateExpenseCategoryProps {
  category_name: string;
  expense_book_id: string;
}

export const createExpenseCategory = async (props: CreateExpenseCategoryProps): Promise<ExpenseCategory> => {
  const res = await axios.post(API_URL + '/create-expense-category', { ...props }, headerConfig());
  return res.data;
};

export interface CreateExpenseListProps {
  title: string;
  amount: number;
  expense_book_id: string;
  expense_category: string;
}

export const createExpenseList = async (props: CreateExpenseListProps): Promise<ExpenseList> => {
  const res = await axios.post(API_URL + '/create-expense-list', { ...props }, headerConfig());
  return res.data;
};

// This api end point and function is from Heme rental platform and i am using it here in the context api.
// Its for testing purpose -  to implement context api and multiple data in one api end point.
const HRP_API = 'https://home-renting-platform-node-js-server-hrp.vercel.app/api/v0';

export const getAllHomeRentPosts = async () => {
  const res = await axios.get(HRP_API + '/getall-home-rent-post');
  return res;
};

export const getAllUserLists = async () => {
  const res = await axios.get(HRP_API + '/alluser');
  return res;
};

/****************************************/
/********* Nationa Id            ********/
/****************************************/

export const searchNationalId = async (nationalid: number): Promise<NationalID> => {
  const res = await axios.get(API_URL + `/search-nationalid?nationalid=${nationalid}`);
  return res.data as NationalID;
};

/****************************************/
/************ Income Record  *************/
/****************************************/

export interface CreateIncomeRecordProps {
  title: string;
  des: string;
  amount: number;
}

export const createIncomeRecord = async (props: CreateIncomeRecordProps): Promise<IncomeRecord> => {
  const res = await axios.post(API_URL + '/create-income-record', { ...props }, headerConfig());
  return res.data;
};

export const getLogedInUserIncomeRecord = async (): Promise<IncomeRecord[]> => {
  const res = await axios.get(API_URL + '/get-income-record', headerConfig());
  return res.data as IncomeRecord[];
};

export const deleteIncomeRecord = async (id: string) => {
  const res = await axios.delete(API_URL + '/delete-single-income-record/' + id, headerConfig());
  return res;
};
