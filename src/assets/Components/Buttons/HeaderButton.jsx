import React from "react";
import styled from "styled-components";
import Plusic from "../../Images/Plus.svg"

const StyledDiv = styled.div`
    width: 181px;
    height: 40px;
    background-color: #115BA4;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
`;

const HeaderButton = ({children, isAdd  ,onClick}) => {
    return (
        <StyledDiv onClick={onClick}>
            {children}
            {isAdd && <img src={Plusic} alt="plus" style={{marginLeft: "10px", marginTop : '-1px'}}/>}
        </StyledDiv>
    );
}

export default HeaderButton;    