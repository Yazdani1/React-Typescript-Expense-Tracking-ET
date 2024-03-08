import { useEffect } from 'react';

import SubscriberPageLayout from '../../layouts/SubscriberPageLayout';
import JobWishListCard from './JobWishListCard';
import { useJobWishListContext } from '../../contextapi/JobWishListContext';

const JobWishList = () => {

	const { allJobWishList, loadJobWishList } = useJobWishListContext();

	useEffect(() => {
		loadJobWishList();
	}, []);

	return (
		<SubscriberPageLayout>
			<div>

				{allJobWishList &&
					allJobWishList.map((job) => (
						<JobWishListCard jobwishlist={job} key={job._id} />
					))}
					
			</div>
		</SubscriberPageLayout>
	);
};

export default JobWishList;
