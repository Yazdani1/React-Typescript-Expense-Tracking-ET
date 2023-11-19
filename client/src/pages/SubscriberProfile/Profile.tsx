import { useState, useEffect } from 'react';
import 'react-responsive-modal/styles.css';
import { CiEdit } from 'react-icons/ci';
import { IoMdClose } from 'react-icons/io';

import { toast } from 'react-toastify';
import { CgProfile } from 'react-icons/cg';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import SubscriberPageLayout from '../../layouts/SubscriberPageLayout';
import CardLayout from '../../components/CardLayout/CardLayout';
import style from './Profile.module.scss';
import ModalBox from '../../components/Modal/ModalBox';
import {
	UpdateUserProfileProps,
	updateSingleUserProfile,
} from '../../services/API';
import { useUserContext } from '../../contextapi/UserContextCookies';
import { loginSuccess } from '../../redux/userSlice';

const Profile = () => {
	// to use redux toolkit
	const userProfileDetails = useSelector(
		(state: any) => state.user.currentUser
	);
	const dispatch = useDispatch();

	////////////////////////////////////////////////////////////////////////////////
	//Context api state - these are context api that i used previously.
	// Now will not use this context api
	// const [state, setState] = useContext(UserContext);
	// const {userProfileDetails,updateUserProfileDetails} = useContext(UserProfileDetailsContext);
	// Context API to update new user info -Cookies context api
	const { user, setUser } = useUserContext();
	////////////////////////////////////////////////////////////////////////////////
	/****************************************/
	/******  To Open Modal Box     **********/
	/****************************************/
	const [open, setOpen] = useState<boolean>(false);
	const onOpenModal = () => {
		setOpen(true);
	};
	const onCloseModal = () => {
		setOpen(false);
	};
	/****************************************/
	/******  To Update User Profile    ******/
	/****************************************/

	const [name, setName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [profilePic, setProfilePic] = useState<string>('');
	const [userSkills, setUserSkills] = useState<string[]>([]);
	const [addSkills, setAddSkills] = useState<string>('');

	const onSubmitUpdateProfile = async () => {
		try {
			const payload: UpdateUserProfileProps = {
				name: name,
				email: email,
				imageUrl: profilePic,
				skills: userSkills,
			};
			const res = await updateSingleUserProfile(
				userProfileDetails?._id!,
				payload
			);
			if (res) {
				toast.success('Successfully Updated Profile', {
					position: toast.POSITION.TOP_CENTER,
				});
				dispatch(loginSuccess(res.user));
				/////////////////////////////////////////
				// To update the user context api with the updated profile data need to set response in the local storage
				// Then also need to update the setState so that newly profile info can be added in th state and can show in the
				// profile page
				// localStorage.setItem("tokenLogin", JSON.stringify(res));
				// setState({
				//   user: res.user,
				// });
				////////////////////////////////////////////
				// to update user profile in the context
				// updateUserProfileDetails(res.user);
				// When user update their profile we need to update user details in the context api with this function
				// updateUserProfileDetails(res?.user!);
				////////////////////////////////////////////
				// From cookie context api - to update user info in the context api as soon as user update user info
				setUser(res.user);
				/////////////////////////////////////////
			}
		} catch (error: any) {
			toast.error(error.response && error.response.data.error, {
				position: toast.POSITION.TOP_RIGHT,
			});
		}
	};

	const addUserSkills = () => {
		setUserSkills([...userSkills, addSkills]);
		setAddSkills('');
	};

	const removeSkills = (skillIndex: string) => {
		const skills = userSkills.filter((item) => item !== skillIndex);
		setUserSkills(skills);
	};

	useEffect(() => {
		setName(userProfileDetails?.name!);
		setEmail(userProfileDetails?.email!);
		setProfilePic(userProfileDetails?.imageUrl!);
		setUserSkills(userProfileDetails?.skills);
	}, []);

	/////////////////////////////////////////////
	// With context api
	// useEffect(() => {
	//   setName(user?.name!);
	//   setEmail(user?.email!);
	//   setProfilePic(user?.imageUrl!);
	// }, [user]);

	/////////////////////////////////////////////

	/****************************************/
	/******  To Show User Profile    ********/
	/****************************************/

	// This code will load user profile info- but its only for the test purpose
	// const [userProfileDetails, setUserInfo] = useState<UserProfileDetails>();
	// const loadUserProfileDetails = async () => {
	//   try {
	//     const res = await getLogedInUserProfile();
	//     if (res) {
	//       setUserInfo(res);
	//     }
	//   } catch (error: any) {
	//     toast.error(error.response && error.response.data.error, {
	//       position: toast.POSITION.TOP_RIGHT,
	//     });
	//   }
	// };
	// useEffect(() => {
	//   loadUserProfileDetails();
	// }, []);

	return (
		<SubscriberPageLayout>
			<CardLayout title='Account Details'>
				<div className={style.profileContainer}>
					{/*  To show profile picture and if user did not add any profile picture then an avatar will be shown here */}
					<div>
						{user?.name}
						{userProfileDetails?.imageUrl ? (
							<div className={style.profilePicture}>
								<img src={userProfileDetails?.imageUrl} alt='profileimg' />
							</div>
						) : (
							<div className={style.profilePictureAvatar}>
								<p className={style.profilePictureIcon}>
									<CgProfile size={80} />
								</p>
							</div>
						)}
						{userProfileDetails?.award?.map((award: any, index: number) => (
							<p key={index}>{award}</p>
						))}
						<div className={style.skillsDesing}>
							{userProfileDetails?.skills?.map((skill: any, index: number) => (
								<p key={index}>{skill}</p>
							))}
						</div>
					</div>
					<div className={style.profileDetails}>
						<h6>Id: {userProfileDetails?._id}</h6>
						<h6>Name: {userProfileDetails?.name}</h6>
						<h6>E-mail: {userProfileDetails?.email}</h6>
						<h6>Role: {userProfileDetails?.role}</h6>
						<h6>Joined: {userProfileDetails?.date}</h6>
						<h6>Points: {userProfileDetails?.points}</h6>
					</div>

					<div className={style.editIcon} onClick={onOpenModal}>
						<CiEdit size={35} color='green' />
					</div>
				</div>
			</CardLayout>

			{/* //////////////////////////////////////////////////////////////////////// */}
			{/* ////             Modal Box to Update User Profile                /////// */}
			{/* //////////////////////////////////////////////////////////////////////// */}
			{/* To update user info - Modal Box */}

			<ModalBox
				open={open}
				onCloseModal={onCloseModal}
				onSaveButton={onSubmitUpdateProfile}
				title='Update Profile'
			>
				<label>Name:</label>
				<div className='form-group'>
					<input
						type='text'
						name='Name'
						className={style.userForm}
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<label>E-mail:</label>
				<div className='form-group'>
					<input
						type='text'
						name='Name'
						className={style.userForm}
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<label>Profile Pic:</label>
				<div className='form-group'>
					<input
						type='text'
						name='Name'
						className={style.userForm}
						value={profilePic}
						onChange={(e) => setProfilePic(e.target.value)}
					/>
				</div>
				<div className='form-group'>
					<input
						type='text'
						name='Name'
						className={style.userForm}
						value={addSkills}
						onChange={(e) => setAddSkills(e.target.value)}
					/>
				</div>

				<div className={style.skills_container}>
					{userSkills.map((skill, index) => (
						<div key={index} className={style.skill_item}>
							<p className={style.skill}>{skill}</p>
							<p
								className={style.close_icon}
								onClick={() => removeSkills(skill)}
							>
								<IoMdClose />
							</p>
						</div>
					))}
				</div>

				<button className='btn btn-warning' onClick={addUserSkills}>
					Add Skills
				</button>
			</ModalBox>
		</SubscriberPageLayout>
	);
};

export default Profile;
