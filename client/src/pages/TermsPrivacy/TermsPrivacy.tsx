import data from './t.json';

const TermsPrivacy = () => {
	const renderSubSection = (subSection: any, level: number) => (
		<div key={subSection.type} style={{ marginLeft: `${level * 20}px` }}>
			<p>{`Type: ${subSection.type}, Content: ${subSection.content}`}</p>
		</div>
	);
	const renderSection = (section: any, level: number) => (
		<div key={section.type} style={{ marginLeft: `${level * 20}px` }}>
			<h3>{section.content}</h3>
			{section.details && <p>{section.details}</p>}
			{section.subSections && (
				<div>
					{section.subSections.map((subSection: any, subIndex: number) => (
						<div key={subIndex}>{renderSubSection(subSection, level + 1)}</div>
					))}
				</div>
			)}
		</div>
	);
	return (
		<div>
			<h1>{data.title}</h1>
			{data.sections.map((section: any, index: number) => (
				<div key={index}>{renderSection(section, index + 1)}</div>
			))}
		</div>
	);
};
export default TermsPrivacy;
// {
// 	"title": "Test title is here doing so many things that need to be done",
// 	"data": "1. Text data is here,\n\nThis is just a description\n\n2. Next generation:\n   1. First day work:\n     We are looking for first-day work, not for the last time of the month. This is the main reason here to solve the issues.\n   2. We are all here for different reasons.\n      (a) Test a for title two\n      (b) Test b for the new one"
// }
// [
// 	{
// 		title: 'Test title',
// 		data: '1. Text data is here, This is just a description\n2. Next generation:\n   1. First day work:\n     We are looking for first day work not for the last time of the month. This is the main reason here to solve the issues.\n   2. We all are here for different reason.',
// 	},
// 	{
//	title: 'Test title two',
// 		data: '1. Text data is here, This is just a description\n2. Next generation:\n   1. First day work:\n     We are looking for first day work not for the last time of the month. This is the main reason here to solve the issues.\n   2. We all are here for different reason.',
// 	},
// ];
