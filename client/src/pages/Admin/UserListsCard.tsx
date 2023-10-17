import { FC, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import Switch from 'react-switch';

import { UserProfileDetails, UserAward } from '../../services/DataProvider';
import style from './UserLists.module.scss';
import CardLayout from '../../components/CardLayout/CardLayout';
import DropDownList from '../../components/DropDown/DropDownList';
import ModalBox from '../../components/Modal/ModalBox';
import { UserRole } from '../../services/DataProvider';
import { UserDetailsUpdateProps, updateUserDetails } from '../../services/API';

interface UserListsProps {
	user: UserProfileDetails;
	loadUserList?: () => void;
}

const UserListsCard: FC<UserListsProps> = ({ user, loadUserList }) => {
	/****************************************/
	/* Modal Box to Update User Info     ****/
	/****************************************/
	const [open, setOpen] = useState<boolean>(false);
	const onOpenModal = () => {
		setOpen(true);
	};
	const onCloseModal = () => {
		setOpen(false);
	};
	/****************************************/
	/*****      Update user details     ****/
	/****************************************/

	const [userName, setUserName] = useState<string>('');
	const [userEmail, setUserEmail] = useState<string>('');
	const [userRole, setUserRole] = useState<UserRole>();
	const [blockUser, setBlockUser] = useState<boolean>(false);

	// To add uesr awards option
	const [awards, setAwards] = useState<UserAward>();
	const [userAwards, setUserAwards] = useState<UserAward[]>([]);

	const updateUserAwards = (selectedAward: UserAward) => {
		if (selectedAward && !userAwards.includes(selectedAward)) {
			setUserAwards((prevAwards) => [...prevAwards, selectedAward]);
		}
	};
	// TO handle block switch button
	const handleChange = (checked: boolean) => {
		setBlockUser(checked);
	};

	const onSubmitUpdateUserDetails = async () => {
		try {
			const payload: UserDetailsUpdateProps = {
				name: userName,
				email: userEmail,
				role: userRole!,
				blockUser: blockUser,
				award: userAwards,
			};

			const res = await updateUserDetails(user._id, payload);

			if (res) {
				toast.success('User profile updated successfully', {
					position: toast.POSITION.TOP_RIGHT,
				});
				if (loadUserList) {
					loadUserList();
				}
			}
		} catch (error: any) {
			toast.error(error.response && error.response.data.error, {
				position: toast.POSITION.TOP_RIGHT,
			});
		}
	};

	useEffect(() => {
		setUserName(user.name);
		setUserEmail(user.email);
		setUserRole(user.role);
		setBlockUser(user.blockUser);
		setUserAwards(user.award);
	}, []);

	return (
		<CardLayout>
			<div className={style.userCardContainer}>
				<div className='row'>
					<div className='col-xl-4 col-lg-2 col-md-6 col-sm-12'>
						<h6>
							{user.name}.{blockUser ? 'Blocked' : ''}
						</h6>
						{user.imageUrl && (
							<span>
								<img
									src={user.imageUrl}
									height='50px'
									width='50px'
									alt='user profile'
								/>
							</span>
						)}
					</div>
					<div className='col-xl-2 col-lg-2 col-md-6 col-sm-12'>
						<h6>
							{user.role}.{user.city}.{user.countryName}
						</h6>
					</div>
					<div className='col-xl-2 col-lg-2 col-md-6 col-sm-12'>
						<h6>{user.email}</h6>
					</div>
					<div className='col-xl-2 col-lg-2 col-md-6 col-sm-12'>
						<h6>{user.date}</h6>
					</div>
					<div className='col-xl-2 col-lg-2 col-md-6 col-sm-12'>
						<DropDownList handleUpdateOnOpenModal={onOpenModal} />
					</div>
				</div>
			</div>

			{/* //////////////////////////////////////////////////////////////////////// */}
			{/* ////               Modal Box to Show User Info                   /////// */}
			{/* //////////////////////////////////////////////////////////////////////// */}

			<ModalBox
				open={open}
				onCloseModal={onCloseModal}
				title='Update User Info'
				onSaveButton={onSubmitUpdateUserDetails}
			>
				<label>Name:</label>
				<div className='form-group'>
					<input
						type='text'
						name='Name'
						className={style.userForm}
						value={userName}
						onChange={(e) => setUserName(e.target.value)}
					/>
				</div>
				<label>E-mail:</label>
				<div className='form-group'>
					<input
						type='text'
						name='Name'
						className={style.userForm}
						value={userEmail}
						onChange={(e) => setUserEmail(e.target.value)}
					/>
				</div>
				<label>Role:</label>
				<div className='selected-dropdownlist'>
					<select
						className={style.userForm}
						value={userRole}
						onChange={(e) => setUserRole(e.target.value as UserRole)}
					>
						{Object.keys(UserRole).map((role) => (
							<option value={role}>{role}</option>
						))}
					</select>
				</div>
				<label>Award: {userAwards}</label>
				<div className='selected-dropdownlist'>
					<select
						className={style.userForm}
						value={awards}
						onChange={(e) => updateUserAwards(e.target.value as UserAward)}
					>
						{Object.keys(UserAward).map((award) => (
							<option value={award}>{award}</option>
						))}
					</select>
					{userAwards.map((user) => (
						<p>{user}</p>
					))}
				</div>
				<p>{blockUser.toString()}</p>
				<p>{blockUser ? 'UnBlock' : 'Block'}</p>
				<Switch checked={blockUser} onChange={handleChange} />
			</ModalBox>
		</CardLayout>
	);
};

export default UserListsCard;
