import { useHomeRentalContext } from '../../contextapi/HomeRentalContext';
import SubscriberPageLayout from '../../layouts/SubscriberPageLayout';
import CardLayout from '../../components/CardLayout/CardLayout';
import { useIncomeRecordContext } from '../../contextapi/IncomeRecordContext';

const HomeRentalPost = () => {
	// Here I am using context api to show user data and home rental post.
	// Here i need to call the useHomeRentalContext function that is connected with the useContext in the contex api
	// here i just need to use all the api data that passed then i can use it here.

	const { allHomeRentPosts, allUsers } = useHomeRentalContext();
	const { allIncomeRecords } = useIncomeRecordContext();
	return (
		<SubscriberPageLayout>
			<div className='row'>
				<div className='col-xl-6'>
					<CardLayout>
						<h5>{allIncomeRecords.length}</h5>
						{allIncomeRecords &&
							allIncomeRecords.map((income: any, index: any) => (
								<h6>{income.title}</h6>
							))}
					</CardLayout>
					<CardLayout>
						<p>HomeRentalPost. {allHomeRentPosts.length}</p>
						<div>
							{allHomeRentPosts &&
								allHomeRentPosts.map((post: any) => (
									<div
										style={{
											borderRadius: '10px',
											margin: '5px',
											padding: '5px',
											border: '1px solid black',
										}}
									>
										<h6>{post.title}</h6>

										<p>{post.rentAmount}.Eur</p>
									</div>
								))}
						</div>
					</CardLayout>
				</div>

				{/* User lists data */}
				<div className='col-xl-6'>
					<CardLayout>
						<h5>User: {allUsers.length}</h5>

						<div>
							{allUsers &&
								allUsers.map((user: any) => (
									<div
										style={{
											borderRadius: '10px',
											margin: '5px',
											padding: '5px',
											border: '1px solid black',
										}}
									>
										<h6>{user.name}</h6>

										<p>{user.email}</p>
									</div>
								))}
						</div>
					</CardLayout>
				</div>
			</div>
		</SubscriberPageLayout>
	);
};

export default HomeRentalPost;
