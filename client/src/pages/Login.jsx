import { useEffect, useState, React } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { useSelector } from "react-redux";
import { LoginBox } from "./styles/LoginBox";
import axios from "axios";

const PageStyle = styled.div`
  padding: 65px 0px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  column-gap: 20px;
`;

export default function Login() {
  const [email, setId] = useState("");
  const [idIsValid, setIdIsValid] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordIsValid, setPasswordIsValid] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState("");

  const REST_API_KEY = "aa";
  const REDIRECT_URI = "aa";
  const kakao = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;

  const user = useSelector((state) => state.user);

  const navigate = useNavigate();

  const onChangeHandlerId = (e) => {
    setId(e.target.value);
    if (e.target.value.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setIdIsValid(true);
    } else {
      setIdIsValid(false);
    }
  };
  const onChangeHandlerPassword = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 8) {
      setPasswordIsValid(false);
    } else {
      setPasswordIsValid(true);
    }
  };

  const signUp = () => {
    navigate("/signup");
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("/signin", { email, password });
      if (response.data.success) {
        setLoggedIn(true);
      } else {
        setMessage(response.data.message);
      }
    } catch (error) {
      setMessage("로그인실패");
    }
  };
  useEffect(() => {
    setLoggedIn(user.loggedIn);
  }, [user]);

  useEffect(() => {
    if (loggedIn) {
      navigate(-1);
    }
  }, [loggedIn, navigate]);

  return (
    <PageStyle>
      <LoginBox>
        <div className="box"></div>
        <div className="top">
          <div className="title">로그인</div>
          <div className="input">
            <div className="input-container">
              <div className="input-content">
                <img src="/images/ic-outline-email.png" alt=""></img>
                <input
                  type="text"
                  onChange={onChangeHandlerId}
                  value={email}
                  placeholder="example@email.com"
                  style={{ fontSize: "16px" }}
                ></input>
              </div>
              {!idIsValid ? (
                <div className="error-message">
                  유효한 이메일을 입력 해주세요.
                </div>
              ) : null}
              <div className="input-content">
                <img src="/images/mdi-password-outline.png" alt=""></img>
                <input
                  type="password"
                  onChange={onChangeHandlerPassword}
                  value={password}
                  placeholder="password"
                  style={{ fontSize: "16px" }}
                ></input>
              </div>
              {!passwordIsValid ? (
                <div className="error-message">비밀번호를 입력 해주세요.</div>
              ) : null}
            </div>
            <div
              className="LoginButton"
              onClick={handleLogin}
              role="presentation"
            >
              Login
            </div>
            {message && (
              <div className="error-message">{message}</div> // 에러 메시지 출력
            )}
          </div>
        </div>
        <div className="social-box">
          <div>
            <button
              onClick={() => (window.location.href = "/auth/google/signin")}
              className="button1"
              style={{ fontSize: "16px" }}
            >
              <img
                className="social"
                src="/images/btn_google_signin_dark_pressed_web.png"
                alt=""
              ></img>
              <div>구글로 로그인</div>
              <div></div>
            </button>
            <button
              onClick={() => (window.location.href = kakao)}
              className="button1"
              style={{ fontSize: "16px" }}
            >
              <img
                className="social"
                src="/images/kakao_login_medium_narrow.png"
                alt=""
              ></img>
              카카오로 로그인
              <div></div>
            </button>
          </div>
        </div>
        <div className="signup-box">
          <div className="signup1">회원이 아니신가요?</div>
          <div className="signup2">
            <button className="signup-button" onClick={signUp}>
              Sign Up
            </button>
          </div>
        </div>
      </LoginBox>
    </PageStyle>
  );
}