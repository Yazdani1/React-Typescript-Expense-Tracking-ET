import { FC, useState, useRef, useEffect } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { FiMoreVertical } from 'react-icons/fi';
import { RiEdit2Fill } from 'react-icons/ri';

import style from './DropDownList.module.scss';

interface DropDownCardProps {
	handleUpdateOnOpenModal?: () => void;
	deleteSingleItem?: () => void;
	withdrawJobApplication?: () => void;
	showJobWithdraw?: boolean;
	showUpdateDeleteButton?: boolean;
}
const DropDownList: FC<DropDownCardProps> = ({
	showJobWithdraw,
	showUpdateDeleteButton,
	handleUpdateOnOpenModal,
	deleteSingleItem,
	withdrawJobApplication,
}) => {
	const [openDropDownIndex, setOpenDropDownIndex] = useState<number | null>(
		null
	);
	const dropdownRef = useRef<HTMLDivElement>(null);
	const handleDropDownCard = (index: number) => {
		setOpenDropDownIndex(openDropDownIndex === index ? null : index);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setOpenDropDownIndex(null);
			}
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div className={style.dropDownMoreIconRow}>
			<div ref={dropdownRef} className={style.dropdownItem}>
				<div
					className={style.dropdownTrigger}
					onClick={() => handleDropDownCard(0)}
				>
					<FiMoreVertical size={24} />
				</div>

				{openDropDownIndex === 0 && (
					<div className={style.dropDownCard}>
						{showUpdateDeleteButton && (
							<>
								<div
									className={style.rowEachItem}
									onClick={() => {
										handleUpdateOnOpenModal?.();
										setOpenDropDownIndex(null);
									}}
								>
									<p>Update</p>
									<p>
										<RiEdit2Fill size={20} color='green' />
									</p>
								</div>
								<div
									className={style.rowEachItem}
									onClick={() => {
										deleteSingleItem?.();
										setOpenDropDownIndex(null);
									}}
								>
									<p>Delete</p>
									<p>
										<AiFillDelete size={20} color='red' />
									</p>
								</div>
							</>
						)}
						{showJobWithdraw && (
							<div
								className={style.rowEachItem}
								onClick={() => {
									withdrawJobApplication?.();
									setOpenDropDownIndex(null);
								}}
							>
								<p>Withdrow Application</p>
								<p>
									<AiFillDelete size={20} color='red' />
								</p>
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default DropDownList;
