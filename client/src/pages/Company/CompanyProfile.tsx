import React from 'react';

import CompanyPageLayout from '../../layouts/CompanyPageLayout';
import CardLayout from '../../components/CardLayout/CardLayout';

const CompanyProfile = () => {
	return (
		<CompanyPageLayout>
			<CardLayout>
				<div>
					<h2>Company Profile</h2>
					<p>Test project</p>
					<p>Test project</p>
				</div>
			</CardLayout>

			<CardLayout>
				{[1, 2, 3, 4, 5, 6, 7].map((item, index) => (
					<h4>{item}.</h4>
				))}
			</CardLayout>
		</CompanyPageLayout>
	);
};

export default CompanyProfile;
