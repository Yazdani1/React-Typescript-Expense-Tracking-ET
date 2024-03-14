import React, { useState } from 'react';
import { toast } from 'react-toastify';

import CardLayout from '../../components/CardLayout/CardLayout';
import style from './NationalId.module.scss';
import HomePageLayout from '../../layouts/HomePageLayout';
import { NationalID } from '../../services/DataProvider';
import { searchNationalId } from '../../services/API';
import { useIncomeRecordContext } from '../../contextapi/IncomeRecordContext';

const NationalId = () => {
	const { allIncomeRecords } = useIncomeRecordContext();
	// To add search value from the input fields

	const [nationaId, setNationalId] = useState<number | any>('');

	const [error, setError] = useState<string>();

	// To store national id search result data

	const [nationalIdDetails, setNationalIdDetails] =
		useState<NationalID | null>();

	const onSubmitSearchNationalId = async () => {
		try {
			// To replace the space from the nationaId state to pass it in the api url to search the data
			const nationalIdWithoutSpaces = nationaId.replace(/\s/g, ''); // Remove spaces
			const res = await searchNationalId(nationalIdWithoutSpaces!);
			if (res) {
				setNationalIdDetails(res);
				setError('');
			}
		} catch (error: any) {
			setError(error.response && error.response.data.error);
			// if it retunrs an error for wrong id then it should empty the state
			setNationalIdDetails(null);
			toast.error(error.response && error.response.data.error, {
				position: toast.POSITION.TOP_RIGHT,
			});
		}
	};
	// This function code is used to have a space after each 4 digit in the search input field
	// It will take total 13 digit and one space after each 4 digit.
	// Then it's search query will load the data through query from api url
	const handleNationalIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const input = e.target.value;
		const sanitizedInput = input.replace(/\D/g, '');
		let formattedInput = sanitizedInput.substr(0, 16);
		if (formattedInput.length > 4) {
			// Insert spaces after every 4 digits
			formattedInput = formattedInput.replace(/(\d{4})/g, '$1 ');
		}
		if (formattedInput.length <= 16) {
			//This is the state where it load theinput
			setNationalId(formattedInput);
		}
	};

	return (
		<HomePageLayout>
			<div className='container'>
				<div className='row'>
					<div className='col-xl-4'>
						<CardLayout>
							<h5>{allIncomeRecords.length}</h5>
						</CardLayout>
						<CardLayout>
							<h3>Nationa Id Details You Can Search Here</h3>
						</CardLayout>
					</div>
					<div className='col-xl-8'>
						<CardLayout>
							<div className={style.search_nationaid}>
								<div className='form-group'>
									<input
										type='text'
										name='Name'
										className={style.searchInputForm}
										placeholder='your national id number *'
										value={nationaId}
										onChange={handleNationalIdChange}
									/>
								</div>

								<div
									className={style.searchButton}
									onClick={onSubmitSearchNationalId}
								>
									<button className='btn btn-success'>Search</button>
								</div>
							</div>
						</CardLayout>
						{nationalIdDetails && (
							<CardLayout>
								<div className={style.searchResultContainer}>
									<div className={style.imageDesign}>
										<img src={nationalIdDetails?.photo} alt='images' />
									</div>

									<div className={style.nationalIdDetails}>
										<p>First Name:{nationalIdDetails?.firstName}</p>

										<p>Last Name:{nationalIdDetails?.lastName}</p>

										<p>Id Number:{nationalIdDetails?.nationalIdNumber}</p>

										<p>Date of Birth:{nationalIdDetails?.dateOfBirth}</p>

										<p>City:{nationalIdDetails?.city}</p>

										<p>Father Name:{nationalIdDetails?.fatherName}</p>

										<p>Mother Name:{nationalIdDetails?.motherName}</p>

										<p>Street:{nationalIdDetails?.street}</p>

										<p>House Number:{nationalIdDetails?.houseNumber}</p>

										<p>Postal Code:{nationalIdDetails?.postalCode}</p>

										<p>Issued Date:{nationalIdDetails?.date}</p>
									</div>
								</div>
							</CardLayout>
						)}
						{error && (
							<CardLayout>
								<h4>{error}</h4>
							</CardLayout>
						)}
					</div>
				</div>
			</div>
		</HomePageLayout>
	);
};

export default NationalId;
