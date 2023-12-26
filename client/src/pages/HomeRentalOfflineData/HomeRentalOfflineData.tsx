import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import SubscriberPageLayout from '../../layouts/SubscriberPageLayout';
import CardLayout from '../../components/CardLayout/CardLayout';
import { getAllHomeRentPosts } from '../../services/API';

const HomeRentalOfflineData = () => {
	const [allHomeRentPosts, setAllHomeRentPosts] = useState<any>([]);

	const loadAllHomeRentPosts = async () => {
		try {
			const offlineData = localStorage.getItem('homeRentPosts');
			if (offlineData) {
				setAllHomeRentPosts(JSON.parse(offlineData));
			} else {
				const res = await getAllHomeRentPosts();
				setAllHomeRentPosts(res.data);
				// localStorage.setItem('homeRentPosts', JSON.stringify(res.data));
			}
		} catch (error: any) {
			toast.error(error.response && error.response.data.error, {
				position: toast.POSITION.TOP_RIGHT,
			});
		}
	};
	// This is another way to get the data from local storage and then show it
	// So first we need to get the data from local storage and then set the data to array state
	// Then from that state, we can show the data in the component.

	const [testData, setTestData] = useState<any>([]);
	const loadLocalStorageData = () => {
		const testofflineData = localStorage.getItem('homeRentPosts');
		if (testofflineData) {
			setTestData(JSON.parse(testofflineData));
		}
	};

	useEffect(() => {
		loadAllHomeRentPosts();
		loadLocalStorageData();
	}, []);

	return (
		<SubscriberPageLayout>
			<CardLayout>
				<h6>{testData.length}</h6>

				{testData && testData.map((item: any) => <h6>{item.title}</h6>)}
			</CardLayout>
			<CardLayout>
				<h6>Home Rental Offline Data</h6>
				<p>{JSON.stringify(allHomeRentPosts)}</p>
			</CardLayout>
		</SubscriberPageLayout>
	);
};

export default HomeRentalOfflineData;
