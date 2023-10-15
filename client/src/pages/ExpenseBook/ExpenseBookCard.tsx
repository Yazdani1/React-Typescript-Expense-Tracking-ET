import { FC } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import expenseBookCardStyle from './ExpenseBookCard.module.scss';
import { ExpenseBookInfo, ExpenseBookColor } from '../../services/DataProvider';

interface ExpenseBookCardProps {
	expense_book: ExpenseBookInfo;
}

const ExpenseBookCard: FC<ExpenseBookCardProps> = ({ expense_book }) => {
	return (
		<div
			className={
				ExpenseBookColor.Orange === expense_book.color
					? expenseBookCardStyle.expenseBookCardOrange
					: ExpenseBookColor.Yellow === expense_book.color
					? expenseBookCardStyle.expenseBookCardYellow
					: expenseBookCardStyle.expenseBookCardGreen
			}
		>
			<Link
				to={'/expense-details/' + expense_book.slug}
				style={{ textDecoration: 'none', color: 'inherit' }}
			>
				<div className={expenseBookCardStyle.itemPosition}>
					<h6>{expense_book.name.substring(0, 15)}</h6>

					<p>{expense_book.color}</p>
					<p>{moment(expense_book?.date).format('MMM Do YYYY')}</p>
				</div>
			</Link>
		</div>
	);
};

export default ExpenseBookCard;
