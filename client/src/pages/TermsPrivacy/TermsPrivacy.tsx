import React, { useEffect, useState } from 'react';
import data from './t.json';
const TermsPrivacy = () => {
	return (
		<div>
			<h1>Data Component</h1>
			<p
				dangerouslySetInnerHTML={{
					__html: data.data.replace(/\n/g, '<br />'),
				}}
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
