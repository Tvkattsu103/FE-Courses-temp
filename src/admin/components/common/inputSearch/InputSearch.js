import React from "react";
import styled from "styled-components";
import { cilSearch, cisSearch } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import Styles from "./style.module.scss";

function InputSearch() {
  return (
    <div className={Styles.main}>
      <input
        type="text"
        className={Styles.inputStyles}
        placeholder="Tìm kiếm"
      ></input>
      <div className={Styles.icon}>
        <CIcon icon={cilSearch} style={{ width: "30px", height: "30px" }} />
      </div>
    </div>
  );
}

export default InputSearch;
