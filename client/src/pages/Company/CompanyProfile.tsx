import React from 'react';

import CompanyPageLayout from '../../layouts/CompanyPageLayout';
import CardLayout from '../../components/CardLayout/CardLayout';

const CompanyProfile = () => {
	return (
		<CompanyPageLayout>
			<CardLayout>
				<div>
					<h2>Company Profile .......</h2>
				</div>
			</CardLayout>

			<CardLayout>
				{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
					<h4>{item}.</h4>
				))}
			</CardLayout>
		</CompanyPageLayout>
	);
};

export default CompanyProfile;
