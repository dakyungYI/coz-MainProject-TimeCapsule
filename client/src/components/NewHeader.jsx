import { styled } from "styled-components";
import { NavLink, useLocation } from "react-router-dom/dist";
import React, { useEffect, useState } from "react";
import { SecondHeaderHeight } from "./NewHeaderUtil";
import menuImg1 from "../images/menu/candybar.png";
import menuImg2 from "../images/menu/bear.png";
import menuImg3 from "../images/menu/cotton.png";
import menuImg4 from "../images/menu/lolpop.png";
import menuImg5 from "../images/menu/chocolate.png";

const BoardHeaderSect = styled.section`
  width: 100vw;
  height: ${SecondHeaderHeight}px;
  display: flex;
  top: 0;
  left: 0;
  z-index: 10002;
  flex-direction: column;
  position: fixed;
  background-color: white;
`;

const NavLinkSection = styled.div`
  width: 50%;
  height: 100%;
  align-items: center;
  display: flex;
  position: absolute;
  right: 0;
`;

const NavUl = styled.ul`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavLi = styled.li`
  width: 13%;
  height: 100%;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
`;

const NavLiImg = styled.img`
  width: 25px;
  height: 25px;
`;

const CustomNavLink = styled.a`
  border: 3px solid white;
  width: 80%;
  height: 100%;
  border-radius: 40%;
  padding: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  &:hover,
  &:active {
    color: white;
    background-color: black;
  }
`;

export const NewHeader = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isHome = currentPath === "/";
  const [headerColorChange, setHeaderColorChange] = useState(false);

  useEffect(() => {
    const hanldeMenuScroll = () => {
      if (window.scrollY >= 390) {
        setHeaderColorChange(true);
      } else {
        setHeaderColorChange(false);
      }
    };

    window.addEventListener("scroll", hanldeMenuScroll);

    return () => {
      window.removeEventListener("scroll", hanldeMenuScroll);
    };
  }, []);

  return (
    <>
      <BoardHeaderSect headerColorChange={headerColorChange}>
        <NavLinkSection>
          <NavUl>
            <NavLi>
              <NavLiImg src={menuImg1} />
              <CustomNavLink
                as={NavLink}
                to="/"
                className={isHome ? "active" : ""}
                headerColorChange={headerColorChange}
              >
                메인
              </CustomNavLink>
            </NavLi>

            <NavLi>
              <NavLiImg src={menuImg2} />
              <CustomNavLink
                as={NavLink}
                to="/market/totalcontents"
                headerColorChange={headerColorChange}
              >
                바자회
              </CustomNavLink>
            </NavLi>

            <NavLi>
              <NavLiImg src={menuImg3} />
              <CustomNavLink
                as={NavLink}
                to="/club"
                headerColorChange={headerColorChange}
              >
                동아리
              </CustomNavLink>
            </NavLi>
            <NavLi>
              <NavLiImg src={menuImg4} />
              <CustomNavLink
                as={NavLink}
                to="/login"
                headerColorChange={headerColorChange}
              >
                로그인
              </CustomNavLink>
            </NavLi>
            <NavLi>
              <NavLiImg src={menuImg5} />
              <CustomNavLink
                as={NavLink}
                to="/mypage"
                headerColorChange={headerColorChange}
              >
                바자회
              </CustomNavLink>
            </NavLi>
          </NavUl>
        </NavLinkSection>
      </BoardHeaderSect>
    </>
  );
};
