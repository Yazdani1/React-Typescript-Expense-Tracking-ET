import { useState } from 'react';
import { toast } from 'react-toastify';

import SubscriberPageLayout from '../../layouts/SubscriberPageLayout';
import CardLayout from '../../components/CardLayout/CardLayout';
import { useIncomeRecordContext } from '../../contextapi/IncomeRecordContext';
import IncomeCard from './IncomeCard';
import ModalBox from '../../components/Modal/ModalBox';
import {
	createIncomeRecord,
	CreateIncomeRecordProps,
} from '../../services/API';
import TextField from '../../components/Input/TextField';

const Income = () => {
	//Context API
	const { allIncomeRecords, loadLogedInUserIncomeRecords } =
		useIncomeRecordContext();

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
	/****** Create Income Record   **********/
	/****************************************/
	const [title, setTitle] = useState<string>('');
	const [des, setDes] = useState<string>('');
	const [amount, setAmount] = useState<string>('');

	const onSubmitCreateIncomeRecord = async () => {
		try {
			const payload: CreateIncomeRecordProps = {
				title: title,
				des: des,
				amount: parseInt(amount),
			};
			const res = await createIncomeRecord(payload);
			if (res) {
				toast.success('Income record created successfully', {
					position: toast.POSITION.TOP_RIGHT,
				});
				loadLogedInUserIncomeRecords();
				
				// To update newly created income record in the context api
				// addNewIncomeRecords(res);
			}
		} catch (error: any) {
			toast.error(error.response && error.response.data.error, {
				position: toast.POSITION.TOP_RIGHT,
			});
		}
	};

	return (
		<SubscriberPageLayout>
			<CardLayout
				title='Income Record Lists'
				showAddIcon
				openModal={onOpenModal}
			>
				{allIncomeRecords.length}
				{allIncomeRecords &&
					allIncomeRecords.map((income) => (
						<IncomeCard
							incomeRecord={income}
							key={income._id}
							postid={income._id}
						/>
					))}
			</CardLayout>

			{/* Modal Box to add income record */}

			<ModalBox
				open={open}
				onCloseModal={onCloseModal}
				title='Create Income Record'
				onSaveButton={onSubmitCreateIncomeRecord}
			>
				<TextField
					label='Title'
					placeholder='title..'
					value={title}
					setValue={setTitle}
				/>
				<TextField
					label='Description'
					placeholder='description..'
					value={des}
					setValue={setDes}
				/>
				<TextField
					label='Amount'
					placeholder='amount..'
					value={amount}
					setValue={setAmount}
				/>
			</ModalBox>
		</SubscriberPageLayout>
	);
};

export default Income;
