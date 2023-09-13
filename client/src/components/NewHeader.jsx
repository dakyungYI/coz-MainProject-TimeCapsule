import { styled } from "styled-components";
import { NavLink } from "react-router-dom/dist";
import React from "react";

const BoardHeaderSect = styled.section`
  width: 100vw;
  height: 72px;
  background-color: white;
  border-bottom: 0.5px solid gray;
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1002;
  flex-direction: column;
`;

const NavLinkSection = styled.div`
  width: 100%;
  height: 100%;
  align-items: center;
  display: flex;
`;

const NavUl = styled.ul`
  margin-left: 75px;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const NavLi = styled.li`
  width: 13%;
  height: 100%;
  font-size: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.5%;
  color: white;
  box-sizing: border-box;
  cursor: pointer;
  &:hover {
    background-color: #b9b9b9;
  }
`;

// const NavLastLi = styled.li`
//   width: 9%;
//   height: 60%;
//   background-color: #babaff;
//   font-size: 22px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   margin-left: 700px;
//   border: 2px solid white;
//   color: black;
//   box-sizing: border-box;
//   cursor: pointer;
// `;
export const NewHeader = () => {
  return (
    <>
      <BoardHeaderSect>
        <NavLinkSection>
          <NavUl>
            <NavLi>
              <NavLink to="/">메인</NavLink>
            </NavLi>

            <NavLi>
              <NavLink to="/market/totalcontents">바자회</NavLink>
            </NavLi>

            <NavLi>
              <NavLink to="/club">동아리</NavLink>
            </NavLi>
            <NavLi>
              <NavLink to="/login">로그인</NavLink>
            </NavLi>
            <NavLi>
              <NavLink to="/mypage">마이페이지</NavLink>
            </NavLi>
            {/* 
            <NavLastLi>
              <NavLink to="/mypage">마이페이지</NavLink>
            </NavLastLi> */}
          </NavUl>
        </NavLinkSection>
      </BoardHeaderSect>
    </>
  );
};
