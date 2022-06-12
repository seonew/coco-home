import styled from 'styled-components';
import githubIcon from '../assets/github-icon.svg';
import kakaoTalkIcon from '../assets/kakaotalk-icon.png';
import googleIcon from '../assets/google-icon.png';

const Root = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-color: #fff;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;
  margin: 0 auto;
  color: #000;
  border-color: #000;
  flex: 3;
`;

const TitleTop = styled.div`
  font-size: 48px;
  line-height: 42px;
  letter-spacing: 3px;
`;

const TitleBottom = styled.div`
  font-size: 43px;
  letter-spacing: 2px;
`;

const SubTitle = styled.div`
  font-size: 16px;
  margin-top: 25px;
`;

const Container = styled.div`
  flex: 1;
  margin-bottom: 12px;
`;

const SocialLoginContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  margin: 10px auto 35px;
  display: flex;
`;

const LinkButton = styled.a<{ disabled?: boolean }>`
  text-decoration: none;
  margin: 10px;
  opacity: ${(props) => (props.disabled ? 0.4 : 1)};
`;

const LinkImage = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 45px;
`;

const GuideText = styled.div`
  width: 100%;
  color: #000;
  font-size: 12px;
  text-align: center;
`;

const TextButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonToGuest = styled.a`
  display: inline-block;
  position: relative;
  padding: 12px 0;
  font-size: 12px;
  text-decoration: none;
  color: #808080;
`;

const Login = () => {
  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
  const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
  const KAKAO_CLIENT_ID = process.env.REACT_APP_KAKAO_CLIENT_ID;
  const KAKAO_REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
  const guestUrl = process.env.REACT_APP_GUEST_REDIRECT_URI;
  const url =
    'https://github.com/login/oauth/authorize?client_id=' +
    CLIENT_ID +
    '&redirect_uri=' +
    REDIRECT_URI;

  const kakaoUrl =
    'https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=' +
    KAKAO_CLIENT_ID +
    '&redirect_uri=' +
    KAKAO_REDIRECT_URI;

  return (
    <Root>
      <TitleContainer>
        <TitleTop>COCO</TitleTop>
        <TitleBottom>HOME</TitleBottom>
        <SubTitle>우리집 관리하기</SubTitle>
      </TitleContainer>

      <Container>
        <SocialLoginContainer>
          <ButtonContainer data-cy="login">
            <LinkButton href={url}>
              <LinkImage src={githubIcon} />
            </LinkButton>
            <LinkButton disabled>
              <LinkImage src={googleIcon} />
            </LinkButton>
            <LinkButton href={kakaoUrl}>
              <LinkImage src={kakaoTalkIcon} />
            </LinkButton>
          </ButtonContainer>
          <GuideText>서비스 이용을 위해 로그인 해주세요.</GuideText>
        </SocialLoginContainer>
        <TextButtonContainer>
          <ButtonToGuest href={guestUrl}>
            {`로그인없이 비회원으로 들어가기 >`}
          </ButtonToGuest>
        </TextButtonContainer>
      </Container>
    </Root>
  );
};

export default Login;
