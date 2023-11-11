import React, { useEffect, useState } from 'react';
import data from './t.json';
const TermsPrivacy = () => {
	return (
		<div>
			<h1>Data Component</h1>
			<p
				style={{ marginLeft: '10px' }}
				dangerouslySetInnerHTML={{ __html: data.data.replace(/\n/g, '<br />') }}
			></p>
			{/* {data.map((item, index) => (
				<div style={{ padding: '20px' }}>
					<h6>{item.title}</h6>
					<p
						dangerouslySetInnerHTML={{
							__html: item.data.replace(/\n/g, '<br />'),
						}}
					></p>
				</div>
			))} */}
		</div>
	);
};

export default TermsPrivacy;

// [
// 	{
// 		title: 'Test title',
// 		data: '1. Text data is here, This is just a description\n2. Next generation:\n   1. First day work:\n     We are looking for first day work not for the last time of the month. This is the main reason here to solve the issues.\n   2. We all are here for different reason.',
// 	},
// 	{
// 		title: 'Test title two',
// 		data: '1. Text data is here, This is just a description\n2. Next generation:\n   1. First day work:\n     We are looking for first day work not for the last time of the month. This is the main reason here to solve the issues.\n   2. We all are here for different reason.',
// 	},
// ];
