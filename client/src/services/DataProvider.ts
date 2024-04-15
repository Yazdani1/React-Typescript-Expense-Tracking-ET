interface IBase {
	_id: string;
	slug: string;
	date: string;
}

/****************************************/
/*********       User             ******/
/****************************************/
export enum UserRole {
	Admin = 'Admin',
	Subscriber = 'Subscriber',
	Instructor = 'Instructor',
	Employer = 'Employer',
}
export enum AccountType {
	Silver = 'Silver',
	Gold = 'Gold',
	Premium = 'Premium',
}
export enum UserAward {
	PullShark = 'PullShark',
	QuickDraw = 'QuickDraw',
	Yolo = 'Yolo',
	GoldVolt = 'GoldVolt',
}
export interface UserProfileDetails extends IBase {
	name: string;
	role: UserRole;
	email: string;
	imageUrl: string;
	blockUser: boolean;
	accountType: AccountType;
	city: string;
	countryName: string;
	continent: string;
	latitude: number;
	longitude: number;
	points: number;
	award: UserAward[];
	skills: string[];
}
export interface UserProfileUpdate {
	user: UserProfileDetails;
}
//To get user location data
export interface LocationData {
	city: string;
	countryName: string;
	latitude: number;
	longitude: number;
	continent: string;
}

/****************************************/
/********* Expense Book            ******/
/****************************************/
export interface ExpenseBookInfo extends IBase {
	name: string;
	color: string;
	postedBy: UserProfileDetails;
}
// This interface to add as a promise when user create the expense book and also update the user points
// in the backend
export interface CreateExpenseBook extends IBase {
	saveExpenseBook: ExpenseBookInfo;
	addUserPoints: UserProfileDetails;
}
export enum ExpenseBookColor {
	Orange = 'Orange',
	Green = 'Green',
	Yellow = 'Yellow',
}

/****************************************/
/*** Expense Book Details         ******/
/****************************************/

// This to show in the expense book detials and for other properties.
// Cause when visit the detials page it returns other inof as well
// This one will have to add in the API.ts file for this funciton getExpenseBookDetails();--panding

export interface ExpenseBookDetails {
	singleExpenseBook: ExpenseBookInfo;
	expenseBookCategory: ExpenseCategory[];
	expenseList: ExpenseList[];
}

/****************************************/
/* Expense Book Category, ExpenseList   */
/****************************************/
export interface ExpenseCategory extends IBase {
	category_name: string;
	expense_book_id: string;
	postedBy: UserProfileDetails;
}
export interface ExpenseList extends IBase {
	title: string;
	amount: number;
	expense_book_id: string;
	expense_category: string;
	postedBy: UserProfileDetails;
}
export interface ExpenseCountByCategory {
	_id: string;
	totalammount: number;
}

/****************************************/
/*** Chart Types                   ******/
/****************************************/
export enum TotalExpenseChartTypes {
	Line_Chart = 'Line_Chart',
	Area_Chart = 'Area_Chart',
	Bar_Chart = 'Bar_Chart',
	Line_Bar_Area_Composed_Chart = 'Line_Bar_Area_Composed_Chart',
	Pie_Chart = 'Pie_Chart',
}

/****************************************/
/************* Nationa Id   *************/
/****************************************/

export interface NationalID extends IBase {
	firstName: string;
	lastName: string;
	photo: string;
	nationalIdNumber: number;
	dateOfBirth: string;
	phoneNumber: string;
	city: string;
	fatherName: string;
	motherName: string;
	street: string;
	houseNumber: number;
	postalCode: number;
	postedBy: UserProfileDetails;
}

/****************************************/
/************ Income Record  *************/
/****************************************/

export interface IncomeRecord extends IBase {
	title: string;
	des: string;
	amount: number;
	postedBy: UserProfileDetails;
}

/****************************************/
/*********** Instructor    *************/
/****************************************/

export interface Course extends IBase {
	title: string;
	des: string;
	coupon: string;
	maxStudents: number;
	enrolledStudents: number;
	postedBy: UserProfileDetails;
}
export interface Lecture extends IBase {
	lectureTitle: string;
	lectureDes: string;
	courseId: Course;
	position: number;
	postedBy: UserProfileDetails;
}
export interface CourseDetails {
	singleCourse: Course;
	lectureLists: Lecture[];
	enroledStudents: CourseEnrolmentItems[];
}
export enum FilterCourseByTitle {
	Ascending = 1,
	Descending = -1,
}

/****************************************/
/*********  Course Enrolment  ***********/
/****************************************/
export interface CourseEnrolmentItems extends IBase {
	courseInstructorId: UserProfileDetails;
	courseId: Course;
	coupon: string;
	enrolledBy: UserProfileDetails;
}

/****************************************/
/********* Job Posts          ***********/
/****************************************/

export enum Visibility {
	Private = 'Private',
	Public = 'Public',
}
export enum Status {
	Panding = 'Panding',
	Approved = 'Approved',
}
export interface JobPosts extends IBase {
	title: string;
	des: string;
	jobCity: string;
	jobSkills: string[];
	visibility: Visibility;
	status: Status;
	totalApplication: number;
	approvedBy: UserProfileDetails;
	approvedDate: string;
	postedBy: UserProfileDetails;
}
export interface JobWishList extends IBase {
	jobPostPublishedBy: UserProfileDetails;
	jobPostId: JobPosts;
	postedBy: UserProfileDetails;
}
export interface JobPostDetails {
	singleJob: JobPosts;
	simmilarJobBySameEmployer: JobPosts[];
}
export enum JobApplicationStatus {
	Applied = 'Applied',
	InReview = 'InReview',
	NotFit = 'NotFit',
	ShortListed = 'ShortListed',
}
export interface JobApplication extends IBase {
	jobPostOwnerId: UserProfileDetails;
	jobPostId: JobPosts;
	status: JobApplicationStatus;
	jobAppliedBy: UserProfileDetails;
}
export interface EmployerJobDetailsItem extends IBase {
	singleJobDetails: JobPosts;
	jobApplicationList: JobApplication[];
}
