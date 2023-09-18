import { styled } from "styled-components";
import { React, useEffect, useState } from "react";
import { BoardFilter } from "../components/BoardFilter.jsx";
import { ClubMockData } from "../data/ClubMockData.js";
import axios from "axios";
import pin2Img from "../images/pin2.png";
import { Link } from "react-router-dom";

const categories = [
  { name: "comic", titleName: "만화", path: "/comic" },
  { name: "movie", titleName: "영화", path: "/movie" },
  { name: "tvshow", titleName: "TV 프로그램", path: "/tvshow" },
  { name: "item", titleName: "추억 아이템", path: "/item" },
  { name: "music", titleName: "노래", path: "/music" },
  { name: "game", titleName: "게임", path: "/game" },
];

const ClubTotalContainer = styled.section`
  width: 100vw;
  height: auto;
  display: flex;
  margin-top: 10vh;
`;

// const HeaderBox = styled.div`
//   width: 100%;
//   height: 92px;
//   border: 3px solid black;
// `;

const PageContent = styled.div`
  width: 1440px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #587c55;
  border: 20px solid #a52a2a9d;
  position: relative;
`;

const SchoolBoardTitle = styled.section`
  width: 100%;
  height: 75px;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const SchoolBCircle = styled.div`
  width: 70px;
  height: 70px;
  background-color: white;
  margin-left: 50px;
  border-radius: 50%;
  font-size: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 5px solid pink;
`;

const CategoryBoxes = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 50px;
  justify-content: center;
  margin-top: 50px;
  margin-bottom: 50px;
`;

const CategoryBox = styled.div`
  width: 500px;
  height: 300px;
  border: 3px solid black;
  padding: 10px;
  background: #ffffff;
  border-radius: 8px;
  position: relative;
`;

const CategoryBoxPinImg = styled.img`
  width: 25px;
  height: 25px;
  position: absolute;
  top: -6%;
  left: 50%;
  transform: translateX(-50%);
`;

const CategoryHeader = styled.div`
  display: flex;
  font-size: 20px;
  padding-left: 10px;
  justify-content: space-between;
  margin-bottom: 10px;
  border-bottom: 3px solid ${(props) => props.color};
  height: 60px;
  align-items: center;
`;

const CategoryContent = styled.div`
  margin-top: 20px;
`;

const Post = styled.div`
  font-size: 15px;
  display: flex;
  margin-bottom: 10px;
  align-items: center;
  height: 50px;
  line-height: 1.2;
  border-bottom: 1px solid gray;
  cursor: pointer;
`;

const PostTitle = styled.div`
  width: 70%;
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 10px;
  margin-right: 20px;
  font-size: 18px;
  font-style: italic;
`;

const PostLikesBox = styled.div`
  width: 5%;
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 12px;
`;

const PostWriterBox = styled.div`
  width: 20%;
  font-size: 13px;
  height: 100%;
  display: flex;
  align-items: center;
`;

const ClubMainFooterSect = styled.div`
  width: 100%;
  height: 10vh;
  background-color: #fffff0;
`;

function ClubMainPage() {
  const [clubTotalData, setClubTotalData] = useState([]);
  const apiUrl = "clubTotalUrl";

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(apiUrl, {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
          },
        });

        if (response.status === 200) {
          setClubTotalData(response.data.clubBoards);
        } else {
          setClubTotalData(ClubMockData.clubBoards);
          console.log(clubTotalData);
        }
      } catch (error) {
        setClubTotalData(ClubMockData.clubBoards);
        console.log(clubTotalData);
      }
    }
    fetchData();
  }, []);

  const CategoryHeaderColorChange = (idx) => {
    if (idx === 0) {
      return "#800000";
    } else if (idx === 1) {
      return "#FF4500";
    } else if (idx === 2) {
      return "#CCCC00";
    } else if (idx === 3) {
      return "#006400";
    } else if (idx === 4) {
      return "#00008B";
    } else {
      return "#4B0082";
    }
  };

  return (
    <>
      <ClubTotalContainer>
        <BoardFilter />
        <PageContent>
          <SchoolBoardTitle>
            <SchoolBCircle>학</SchoolBCircle>
            <SchoolBCircle>급</SchoolBCircle>
            <SchoolBCircle>게</SchoolBCircle>
            <SchoolBCircle>시</SchoolBCircle>
            <SchoolBCircle>판</SchoolBCircle>
          </SchoolBoardTitle>
          <CategoryBoxes>
            {categories.map((category, idx) => (
              <>
                <CategoryBox key={category.name}>
                  <CategoryBoxPinImg src={pin2Img} />
                  <Link to={`/club/${category.name}`}>
                    <CategoryHeader
                      color={() => CategoryHeaderColorChange(idx)}
                    >
                      <span>{category.titleName}</span>
                    </CategoryHeader>
                  </Link>
                  <CategoryContent>
                    {/* 여기 슬라이드 줘서 오른쪽으로, 왼쪽으로 누르면 슬라이스 되는 데이터가 다르게 한다! */}
                    {clubTotalData
                      .filter((post) => post.category === category.name)
                      .slice(0, 3) // 각 카테고리당 5개까지만 표시하려면 slice 사용
                      // 조회수별 정리하기 위해서, 조회수 높은대로 필터링해서 슬라이스로 자르면 된다! 총 11개의 데이터가 존재하니 4페이지까지 존재할듯.
                      // 아래쪽으로 넘긴다는 느낌으로?
                      .map((post) => (
                        <Link
                          to={`/club/${post.category}/${post.clubBoardId}`}
                          key={post.clubBoardId}
                        >
                          <Post>
                            <PostTitle>{post.title.slice(0, 20)}</PostTitle>
                            {/* 글자수 넘는 경우 ...처리하기 */}
                            <PostWriterBox>{post.nickname}</PostWriterBox>
                            <PostLikesBox>{post.viewCount}</PostLikesBox>
                          </Post>
                        </Link>
                      ))}
                  </CategoryContent>
                </CategoryBox>
              </>
            ))}
          </CategoryBoxes>
        </PageContent>
      </ClubTotalContainer>
      <ClubMainFooterSect />
    </>
  );
}

export default ClubMainPage;

{
  /* <CategorySelection>
          <CategoryDiv>카테고리</CategoryDiv>
          {categories.map((category) => (
            <CategoryButton
              key={category.name}
              onClick={() => (window.location.href = category.path)}
            >
              {category.name}
            </CategoryButton>
          ))}
        </CategorySelection> */
}
