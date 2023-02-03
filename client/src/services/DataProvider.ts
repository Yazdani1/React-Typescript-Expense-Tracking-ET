interface IBase {
  _id: string;
  slug: string;
  date: string;
}

/****************************************/
/*********       User             ******/
/****************************************/

export interface UserProfileDetailsProps extends IBase {
  name: string;
  role: string;
}

/****************************************/
/********* Expense Book            ******/
/****************************************/

export interface ExpenseBookProps extends IBase {
  name: string;
  color: string;
  postedBy: UserProfileDetailsProps;
}

export enum ExpenseBookColor {
  Orange = "Orange",
  Green = "Green",
  Yellow = "Yellow",
}

/****************************************/
/*** Expense Book Details         ******/
/****************************************/

export interface ExpenseCategoryProps extends IBase {
  category_name: string;
  expense_book_id: string;
  postedBy: UserProfileDetailsProps;
}

export interface ExpenseListProps extends IBase {
  title: string;
  amount: number;
  expense_book_id: string;
  expense_category: string;
  postedBy: UserProfileDetailsProps;
}

export interface ExpenseCountByCategory {
  _id: string;
  totalammount: number;
}


/****************************************/
/*** Chart Types                   ******/
/****************************************/

export enum TotalExpenseChartTypes {
  Line_Chart = "Line_Chart",
  Area_Chart = "Area_Chart",
  Bar_Chart = "Bar_Chart",
  Line_Bar_Area_Composed_Chart = "Line_Bar_Area_Composed_Chart",
  Pie_Chart = "Pie_Chart"
}
