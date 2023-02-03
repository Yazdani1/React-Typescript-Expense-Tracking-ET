import React from 'react'
import { FiMoreVertical } from "react-icons/fi";
import style from "./DropDownList.module.scss";


const DropDownList = () => {
  return (
    <div className={style.dropDownListContainer}>
        <p><FiMoreVertical size={25}/></p>
    </div>
  )
}

export default DropDownList