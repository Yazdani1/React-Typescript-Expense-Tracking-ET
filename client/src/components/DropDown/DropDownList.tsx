import { FC, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { FiMoreVertical } from "react-icons/fi";
import { RiEdit2Fill } from "react-icons/ri";

import style from "./DropDownList.module.scss";

interface DropDownCardProps {
  handleUpdateOnOpenModal?: () => void;
  deleteSingleItem?: () => void;
}

const DropDownList: FC<DropDownCardProps> = ({
  handleUpdateOnOpenModal,
  deleteSingleItem,
}) => {
  
  // to show dropdown card details
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  
  const handleDropDownCard = () => {
    setShowDropDown(!showDropDown);
  };
  return (
    <div className={style.dropDownMoreIconRow}>
      <p>
        <FiMoreVertical size={25} onClick={handleDropDownCard} />
      </p>
      {showDropDown && (
        <div className={style.dropDownCard}>
          <p
            onClick={() => {
              handleUpdateOnOpenModal?.();
              handleDropDownCard();
            }}
          >
            <RiEdit2Fill size={20} color="green" /> Update
          </p>
          <hr />
          <p
            onClick={() => {
              deleteSingleItem?.();
              handleDropDownCard();
            }}
          >
            <AiFillDelete size={20} color="red" /> Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default DropDownList;
