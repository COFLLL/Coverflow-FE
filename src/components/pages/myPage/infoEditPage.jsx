// import React, { useEffect, useState } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
// import { useNavigate, useLocation } from 'react-router-dom';
import '../../../asset/sass/pages/myPage/infoEditPage.scss';
import { StyledPage, StyledHeader } from '../../../styledComponent.js';
import TitleHeader from '../../ui/header/titleHeader.jsx';
import UserInfoHeader from '../../ui/header/userInfoHeader.jsx';
import TabBar from '../../ui/tabBar/tabBar.jsx';

// import { BASE_URL } from '../../global/constants/index.js';

const Divider = styled.div`
  height: 1px;
  background-color: #ccc;
  width: 80%;
  margin: 10% 0% 0% 10%;
`;

const NickModifyBtn = styled.button`
  cursor: pointer;
  padding: 5px 8px;
  font-family: pretendard-light;
  border-radius: 1px;
  width: 100%;
  margin-bottom: 10%;
`;

const SecessionBtn = styled.button`
  cursor: pointer;
  padding: 5px 8px;
  font-family: pretendard-light;
  border-radius: 1px;
  margin: 2% 0% 0% 0%;
  width: 100%;
`;

function InfoEditPage() {
  const navigate = useNavigate();
  // const [userInfo, setUserInfo] = useState({ socialType: '' });
  // const location = useLocation();
  //  const { nickname } = location.state || {};

  // useEffect(() => {
  //   const loadUserInfo = async () => {
  //     try {
  //       const response = await fetch(`${BASE_URL}/api/member/find-member`, {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem('ACCESS_TOKEN')}`,
  //           'Content-Type': 'application/json',
  //         },
  //       });
  //       if (response.ok) {
  //         const data = await response.json();
  //         setUserInfo({ socialType: data.socialType });
  //       } else {
  //         // 에러 처리
  //         console.error('사용자 정보를 불러오는데 실패했습니다.');
  //       }
  //     } catch (error) {
  //       console.error('에러 발생:', error);
  //     }
  //   };

  //   loadUserInfo();
  // }, []);

  // const renderSocialType = (type) => {
  //   switch (type) {
  //     case 'Google':
  //       return <div className="socialType-ui">구글 로그인 사용 중</div>;
  //     case 'Kakao':
  //       return <div className="socialType-ui">카카오톡 로그인 사용 중</div>;
  //     case 'Naver':
  //       return <div className="socialType-ui">네이버 로그인 사용 중</div>;

  //     default:
  //       return null;
  //   }
  // };

  const handleGoBack = () => {
    navigate(-1);
  };

  const goToSecessionPage = () => {
    navigate('/secession-page');
  };

  return (
    <StyledPage className="main-page-container">
      <StyledHeader>
        <TitleHeader pageTitle="내 정보 수정" handleGoBack={handleGoBack} />
        <UserInfoHeader />
        {/* <div className="user-nickname">{nickname}<span className="user-nick-cover">님</span></div> */}
        <div className="user-nick-title">
          눅눅한 크로와상<span className="user-nick-cover">님</span>
        </div>
        {/* <div className="user-socialType">
          {renderSocialType(userInfo.socialType)}
        </div> */}
        <div className="socialType-ui">카카오톡 로그인 사용 중</div>
        <Divider />
        <div className="modify-nick-container">
          <div className="modify-info">
            <div className="modify-nick">닉네임 변경</div>
            <div className="modify-nick-info">
              변경 버튼을 누르면, 붕어빵 20개가 차감되며 <br /> 다른 랜덤
              닉네임으로 변경됩니다
            </div>
            <NickModifyBtn> 변경 </NickModifyBtn>
          </div>
        </div>

        <div className="secessionPage-container">
          <div className="secessionUser-info">
            <div className="userSecession">회원 탈퇴</div>
            <div className="userSecession-info">
              회원 탈퇴를 할 경우, 계정을 되돌릴 수 없고 모든 데이터가
              삭제됩니다
            </div>
            <SecessionBtn onClick={goToSecessionPage}>탈퇴</SecessionBtn>
          </div>
        </div>
      </StyledHeader>
      <TabBar />
    </StyledPage>
  );
}

export default InfoEditPage;