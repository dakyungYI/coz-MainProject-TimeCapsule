import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import axios from "axios";

const WritePage = styled.div`
  margin-top: 100px;
  display: flex;
  justify-content: center;
`;

const PageBox = styled.div`
  width: 1440px;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 3px;
`;

const Title = styled.div`
  width: 75%;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 32px;
  align-items: center;
  margin-bottom: 30px;
`;

const SelectBox = styled.div`
  width: 75%;
`;

const TitleBox = styled.input`
  width: 75%;
  height: 50px;
  padding: 10px;
  font-size: 22px;
`;
const ImageBox = styled.div`
  width: 75%;
  height: 30px;
  display: flex;
  justify-content: start;
`;

const ContentBox = styled.textarea`
  width: 75%;
  height: 750px;
  padding: 10px;
`;

const ButtonBox = styled.div`
  width: 75%;
  display: flex;
  justify-content: center;
`;

const SubmitButton = styled.button`
  width: 155px;
  height: 48px;
`;

const InputSubBox = styled.input`
  width: 100%;
  padding-left: 10px;
`;

const Write = () => {
  const [board, setBoard] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [price, setPrice] = useState("");

  const memberId = localStorage.getItem("memberId");
  const navigate = useNavigate();

  const handleValidation = () => {
    if (
      board &&
      title &&
      content &&
      ((board === "바자회" && photoURL && price) ||
        (board === "동아리" && category))
    ) {
      return true;
    }
    return false;
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handlePostSubmit = async () => {
    if (handleValidation()) {
      let apiUrl = "";
      let payload = {};

      if (board === "바자회") {
        apiUrl =
          "http://ec2-13-209-7-250.ap-northeast-2.compute.amazonaws.com/marketBoards";
        payload = {
          memberId: memberId,
          title: title,
          content: content,
          photo: photoURL,
          priceContent: price,
          tag: "SALE",
        };
      } else if (board === "동아리") {
        apiUrl =
          "http://ec2-13-209-7-250.ap-northeast-2.compute.amazonaws.com/clubBoards";
        payload = {
          memberId: memberId,
          title: title,
          content: content,
          photo: photoURL,
          voice: "",
          category: category,
        };
      }

      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer [YOUR_DYNAMIC_JWT_TOKEN_HERE]`,
        },
      };

      try {
        const response = await axios.post(apiUrl, payload, config);
        if (response.data.success) {
          console.log("글이 성공적으로 등록되었습니다.");
          if (board === "바자회") {
            navigate(`/market/${response.data.marketBoardId}`);
          } else if (board === "동아리") {
            navigate(`/club/${category}/${response.data.clubBoardId}`);
          }
        } else {
          console.error("글 등록에 실패하였습니다.");
        }
      } catch (error) {
        console.error("Error", error);
      }
    } else {
      alert("모든 필드를 올바르게 입력해주세요.");
    }
  };
  return (
    <WritePage>
      <PageBox>
        <Title>글 작성 페이지</Title>
        <SelectBox>
          <select onChange={(e) => setBoard(e.target.value)} value={board}>
            <option value="" disabled>
              게시판 선택
            </option>
            <option value="바자회">바자회</option>
            <option value="동아리">동아리</option>
          </select>

          {board === "동아리" && (
            <select
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            >
              <option value="" disabled>
                카테고리 선택
              </option>
              <option value="comic">만화</option>
              <option value="movie">영화</option>
              <option value="tvshow">TV프로그램</option>
              <option value="item">추억템</option>
              <option value="music">노래</option>
              <option value="game">게임</option>
            </select>
          )}
        </SelectBox>

        <TitleBox
          type="text"
          placeholder="제목을 입력해주세요."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <ImageBox>
          <InputSubBox
            type="text"
            placeholder="이미지 URL을 입력해주세요."
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
          />
          {board === "바자회" && (
            <InputSubBox
              type="text"
              placeholder="금액을 입력해주세요. (숫자만 입력 가능)"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          )}
        </ImageBox>
        <ContentBox
          placeholder="내용을 입력해주세요."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <ButtonBox>
          <SubmitButton onClick={handlePostSubmit}>게시글 등록</SubmitButton>
          <SubmitButton onClick={handleCancel}>취소</SubmitButton>
        </ButtonBox>
      </PageBox>
    </WritePage>
  );
};

export default Write;
