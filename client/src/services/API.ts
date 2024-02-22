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
	Course,
	CourseDetails,
	Lecture,
	CourseEnrolmentItems,
	JobPosts,
	Visibility,
	Status,
	JobWishList,
	JobPostDetails,
	JobApplication,
	EmployerJobDetailsItem,
} from '../services/DataProvider';

const getResponse = async (url: string) => {
	try {
		await axios.get(url);
	} catch (error) {}
};

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

export const updateUserDetails = async (
	id: string,
	props: UserDetailsUpdateProps
): Promise<UserProfileDetails> => {
	const res = await axios.put(
		API_URL + '/update-user-profile/' + id,
		{ ...props },
		headerConfig()
	);
	return res.data;
};

export const getUserAccountRegistrationLocation = async (
	latitude: number,
	longitude: number
) => {
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
export const updateSingleUserProfile = async (
	id: string,
	props: UpdateUserProfileProps
): Promise<UserProfileUpdate> => {
	const res = await axios.put(
		API_URL + '/update-single-user-profile/' + id,
		{ ...props },
		headerConfig()
	);
	return res.data;
};
// Forgot password and reset password
export interface ForgotPasswordProps {
	email: string;
}
export const createForgotPassword = async (
	props: ForgotPasswordProps
): Promise<UserProfileDetails> => {
	const res = await axios.post(API_URL + '/forgot-password', { ...props });
	return res.data;
};
export interface ResetNewPasswordProps {
	email: string;
	verificationCode: string;
	newPassowrd: string;
}
export const createResetPassword = async (
	props: ResetNewPasswordProps
): Promise<UserProfileDetails> => {
	const res = await axios.post(API_URL + '/reset-password', { ...props });
	return res.data;
};
// To get loged in user profile and its only for test purpose and maybe can use in the profile page and context api
export const getLogedInUserProfile = async (): Promise<UserProfileDetails> => {
	const res = await axios.get(API_URL + '/user-profile', headerConfig());
	return res.data as UserProfileDetails;
};
/****************************************/
/********* User role based access ******/
/****************************************/

export const getUserRoleForAdmin = async (): Promise<UserProfileDetails> => {
	const res = await axios.get(API_URL + '/current-user-role', headerConfig());
	return res.data as UserProfileDetails;
};
export const getInstructorRole = async (): Promise<UserProfileDetails> => {
	const res = await axios.get(API_URL + '/instructor-profile', headerConfig());
	return res.data as UserProfileDetails;
};
export const getEmployerRole = async (): Promise<UserProfileDetails> => {
	const res = await axios.get(API_URL + '/employer-profile', headerConfig());
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

export const createExpenseBook = async (
	props: CreateExpenseProps
): Promise<CreateExpenseBook> => {
	const res = await axios.post(
		API_URL + '/create-expensebook',
		{ ...props },
		headerConfig()
	);
	return res.data;
};

export const getExpenseBookList = async (): Promise<ExpenseBookInfo[]> => {
	const res = await axios.get(
		API_URL + '/get-expensebook-list',
		headerConfig()
	);
	return res.data as ExpenseBookInfo[];
};

/****************************************/
/********* Expense Book Details   ******/
/****************************************/

export const getExpenseBookDetails = async (slug: string) => {
	const res = await axios.get(
		API_URL + '/expense-book-details/' + slug,
		headerConfig()
	);
	return res;
};

export interface CreateExpenseCategoryProps {
	category_name: string;
	expense_book_id: string;
}

export const createExpenseCategory = async (
	props: CreateExpenseCategoryProps
): Promise<ExpenseCategory> => {
	const res = await axios.post(
		API_URL + '/create-expense-category',
		{ ...props },
		headerConfig()
	);
	return res.data;
};
export interface CreateExpenseListProps {
	title: string;
	amount: number;
	expense_book_id: string;
	expense_category: string;
}

export const createExpenseList = async (
	props: CreateExpenseListProps
): Promise<ExpenseList> => {
	const res = await axios.post(
		API_URL + '/create-expense-list',
		{ ...props },
		headerConfig()
	);
	return res.data;
};
// This api end point and function is from Heme rental platform and i am using it here in the context api.
// Its for testing purpose -  to implement context api and multiple data in one api end point.
const HRP_API =
	'https://home-renting-platform-node-js-server-hrp.vercel.app/api/v0';
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

export const searchNationalId = async (
	nationalid: number
): Promise<NationalID> => {
	const res = await axios.get(
		API_URL + `/search-nationalid?nationalid=${nationalid}`
	);
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
export const createIncomeRecord = async (
	props: CreateIncomeRecordProps
): Promise<IncomeRecord> => {
	const res = await axios.post(
		API_URL + '/create-income-record',
		{ ...props },
		headerConfig()
	);
	return res.data;
};
export const getLogedInUserIncomeRecord = async (): Promise<IncomeRecord[]> => {
	const res = await axios.get(API_URL + '/get-income-record', headerConfig());
	return res.data as IncomeRecord[];
};
export const deleteIncomeRecord = async (id: string) => {
	const res = await axios.delete(
		API_URL + '/delete-single-income-record/' + id,
		headerConfig()
	);
	return res;
};
/****************************************/
/********    Course     *****************/
/****************************************/

export interface CreateCourseProps {
	title: string;
	des: string;
	coupon: string;
	maxStudents: Number;
}

export const createCourse = async (
	props: CreateCourseProps
): Promise<Course> => {
	const res = await axios.post(
		API_URL + '/create-course',
		{ ...props },
		headerConfig()
	);
	return res.data;
};

export interface CreateLectureProps {
	lectureTitle: string;
	lectureDes: string;
	courseId: string;
}

export const createLecture = async (
	props: CreateLectureProps
): Promise<Lecture> => {
	const res = await axios.post(
		API_URL + '/create-lectures',
		{ ...props },
		headerConfig()
	);
	return res.data;
};

export interface UpdateLectureProps {
	lectureTitle?: string;
	lectureDes?: string;
	position?: Number;
}

export const updateLecture = async (
	id: string,
	props: UpdateLectureProps
): Promise<Lecture> => {
	const res = await axios.put(
		API_URL + '/update-lecture/' + id,
		{ ...props },
		headerConfig()
	);
	return res.data;
};

export const getCourseLists = async (): Promise<Course[]> => {
	const res = await axios.get(
		API_URL + '/get-instructor-courses',
		headerConfig()
	);
	return res.data as Course[];
};

export const getSingleCourseLectures = async (
	slug: string
): Promise<CourseDetails> => {
	const res = await axios.get(
		API_URL + '/get-course-lectures/' + slug,
		headerConfig()
	);
	return res.data as CourseDetails;
};

export const filterInstructorCourse = async (
	sortbytitle: number
): Promise<Course[]> => {
	const res = await axios.get(
		API_URL + `/search-instrcutor-course?sortbytitle=${sortbytitle}`,
		headerConfig()
	);
	return res.data as Course[];
};

// For subscriber
export const getCourseListsForSubscriber = async (): Promise<Course[]> => {
	const res = await axios.get(API_URL + '/get-all-courses', headerConfig());
	return res.data as Course[];
};

export const getSingleCourseDetailsForSubscriber = async (
	slug: string
): Promise<Course> => {
	const res = await axios.get(
		API_URL + '/get-single-course-details/' + slug,
		headerConfig()
	);
	return res.data as Course;
};

/****************************************/
/*********  Course Enrolment  ***********/
/****************************************/

export interface CreateCourseEnrolmentProps {
	courseId: string;
	courseInstructorId: string;
	coupon: string;
}

export const createCourseEnrolment = async (
	props: CreateCourseEnrolmentProps
): Promise<CourseEnrolmentItems> => {
	const res = await axios.post(
		API_URL + '/create-course-enrollment',
		{ ...props },
		headerConfig()
	);
	return res.data;
};

export const getEnroledCourseLists = async (): Promise<
	CourseEnrolmentItems[]
> => {
	const res = await axios.get(
		API_URL + '/get-enroled-course-lists',
		headerConfig()
	);
	return res.data as CourseEnrolmentItems[];
};

/****************************************/
/*********Employer -  Job posts  ********/
/****************************************/

export interface CreateJobPostProps {
	title: string;
	des: string;
	jobCity: string;
	jobSkills: string[];
	visibility: Visibility;
}

export const createJobPosts = async (
	props: CreateJobPostProps
): Promise<JobPosts> => {
	const res = await axios.post(
		API_URL + '/create-jobpost',
		{ ...props },
		headerConfig()
	);
	return res.data;
};

export const getEmployerJobPosts = async (): Promise<JobPosts[]> => {
	const res = await axios.get(
		API_URL + '/get-employer-jobpost',
		headerConfig()
	);
	return res.data as JobPosts[];
};

export interface UpdateJobPostProps {
	title?: string;
	des?: string;
	jobCity?: string;
	jobSkills?: string[];
	visibility?: Visibility;
}

export const updateSingleJobPost = async (
	id: string,
	props: UpdateJobPostProps
): Promise<JobPosts> => {
	const res = await axios.put(
		API_URL + '/update-employer-single-job/' + id,
		{ ...props },
		headerConfig()
	);
	return res.data;
};

export const deleteSingleJobPost = async (id: string) => {
	const res = await axios.delete(
		API_URL + '/delete-single-jobpost/' + id,
		headerConfig()
	);
	return res;
};

// To update all the job posts visibility
export interface JobpostsVisibilityUpdateProps {
	updateVisibility: Visibility;
}

export const updateJobPostsVisibility = async (
	props: JobpostsVisibilityUpdateProps
): Promise<JobPosts[]> => {
	const res = await axios.post(
		API_URL + '/update-job-post-visiblity',
		{ ...props },
		headerConfig()
	);
	return res.data as JobPosts[];
};

export const employerJobPostDetails = async (
	slug: string
): Promise<EmployerJobDetailsItem> => {
	const res = await axios.get(
		API_URL + '/job-details-applicationlist/' + slug,
		headerConfig()
	);
	return res.data as EmployerJobDetailsItem;
};

/****************************************/
/**Employer-Job Posts Admin Access  *****/
/****************************************/

export interface UpdateAnyEmployerJobPostProps {
	title?: string;
	des?: string;
	jobCity?: string;
	jobSkills?: string[];
	visibility?: Visibility;
	status?: Status;
}

export const updateAnyEmployerJobPosts = async (
	id: string,
	props: UpdateAnyEmployerJobPostProps
): Promise<JobPosts> => {
	const res = await axios.put(
		API_URL + '/update-job-posts/' + id,
		{ ...props },
		headerConfig()
	);
	return res.data;
};

export const getAllEmployerJobPosts = async (): Promise<JobPosts[]> => {
	const res = await axios.get(
		API_URL + '/get-allemployer-jobposts',
		headerConfig()
	);
	return res.data as JobPosts[];
};

/****************************************/
/*** Job Posts Home Page  ***************/
/****************************************/

export const getApprovedPublicJobPosts = async (): Promise<JobPosts[]> => {
	const res = await axios.get(API_URL + '/all-job-posts');
	return res.data as JobPosts[];
};

export const getJobDetails = async (slug: string): Promise<JobPostDetails> => {
	const res = await axios.get(API_URL + '/get-job-details/' + slug);
	return res.data as JobPostDetails;
};

/****************************************/
/************** Job Match ***************/
/****************************************/

export const getMatchedJob = async (): Promise<JobPosts[]> => {
	const res = await axios.get(API_URL + '/get-job-match', headerConfig());
	return res.data as JobPosts[];
};

/****************************************/
/************** Job Wish List************/
/****************************************/

export interface CreateJobWishListProps {
	jobPostPublishedBy: string;
	jobPostId: string;
}

export const createJobWishList = async (
	props: CreateJobWishListProps
): Promise<JobWishList> => {
	const res = await axios.post(
		API_URL + '/create-job-wishlist',
		{ ...props },
		headerConfig()
	);
	return res.data;
};

export const getJobWishList = async (): Promise<JobWishList[]> => {
	const res = await axios.get(API_URL + '/get-job-wishlist', headerConfig());
	return res.data as JobWishList[];
};

export const deleteJobWishList = async (id: string) => {
	const res = await axios.delete(
		API_URL + '/delete-job-wishlist/' + id,
		headerConfig()
	);
	return res.data;
};

// To get single jobwishlist for a single post for a single user
// This will need to delete a wishlist. Will just use the id of a wishlist for a single job

export const getSingleJobWishlist = async (
	slug: string
): Promise<JobWishList> => {
	const res = await axios.get(
		API_URL + '/get-single-job-wishlist/' + slug,
		headerConfig()
	);
	return res.data as JobWishList;
};

/****************************************/
/********** Job Application  ************/
/****************************************/

export interface CreateJobApplicationProps {
	jobPostOwnerId: string;
	jobPostId: string;
}

export const createJobApplication = async (
	props: CreateJobApplicationProps
): Promise<JobApplication> => {
	const res = await axios.post(
		API_URL + '/create-job-application',
		{ ...props },
		headerConfig()
	);
	return res.data;
};

export const getJobApplicationList = async (): Promise<JobApplication[]> => {
	const res = await axios.get(
		API_URL + '/get-applied-job-lists',
		headerConfig()
	);
	return res.data as JobApplication[];
};

export const deleteJobApplication = async (id: string) => {
	const res = await axios.delete(
		API_URL + '/delete-job-application/' + id,
		headerConfig()
	);
	return res.data;
};
