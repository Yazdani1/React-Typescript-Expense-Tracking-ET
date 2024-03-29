import { FC, ReactNode } from 'react';
import { IoAddCircleSharp } from 'react-icons/io5';

import style from './CardLayout.module.scss';

interface CardLayoutProps {
	title?: string;
	children?: ReactNode;
	showButton?: boolean;
	openModal?: () => void;
	showAddIcon?: boolean;
}

const CardLayout: FC<CardLayoutProps> = ({
	children,
	title,
	showButton,
	openModal,
	showAddIcon,
}) => {
	return (
		<div className={style.cardContainer}>
			<div className={style.cardLayoutHeader}>
				<h5>{title}</h5>
				{showAddIcon && (
					<p onClick={openModal}>
						<IoAddCircleSharp size={25} />
					</p>
				)}
			</div>
			{children}
			{showButton && <button className='btn btn-success'>Submit</button>}
		</div>
	);
};

export default CardLayout;
