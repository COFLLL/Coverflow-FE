import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Reward from '../../../asset/image/reward.svg';
import Loginuser from '../../../asset/image/loginuser.svg';
import '../../../asset/sass/etc/header/userInfoHeader.scss';
import { fetchAPI } from '../../global/utils/apiUtil.js';
import {
  setLoggedIn,
  setRewardCount,
  toggleDropdown,
  setNickname,
} from '../../../store/actions/userActions';
import { alertCount } from '../../../store/actions/alertActions.js';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../global/constants/index.ts';
import { showErrorToast } from '../toast/toast.tsx';

function UserInfoHeader() {
  const { isLoggedIn, rewardCount, isDropdownOpen } = useSelector(
    (state) => state.user,
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // useInitializeSSE(isLoggedIn);
  /*
사용자의 로그인 상태를 확인하고, 붕어빵 개수를 로드하는 로직입니다.
01. 페이지 로드 시에 로컬 스토리지에서 토큰을 조회하여 로그인 상태를 확인합니다.
02. 로그인 상태에 따라서 `setLoogedIn` 액션을 디스패치(= 액션을 발생시켜 상태를 변경) 합니다.
03. 로그인이 되어있다면, 사용자의 붕어빵 개수를 서버에서 가져와서 `setRewardCount` 액션으로 상태 업데이트
*/
  useEffect(() => {
    const loggedInStatus = !!localStorage.getItem(ACCESS_TOKEN);
    dispatch(setLoggedIn(loggedInStatus));

    if (loggedInStatus) {
      fetchAPI('/api/member/me', 'GET')
        .then((data) => {
          if (data && data.data && data.data.fishShapedBun !== undefined) {
            dispatch(setRewardCount(data.data.fishShapedBun));
            dispatch(setNickname(data.data.nickname));
            // console.log('붕어빵 개수:', data.data.fishShapedBun);
          } else {
            console.error(data);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [dispatch]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        if (isDropdownOpen) {
          dispatch(toggleDropdown());
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen, dispatch]);

  /* 붕어빵 아이콘을 클릭했을 경우, 상점으로 이동합니다. */
  const handleRewardClick = () => {
    // navigate('/store');
    showErrorToast("준비중인 페이지입니다.")
  };

  /*
  사용자 아이콘을 클릭했을 경우, 드롭다운 메뉴의 표시 상태를 토글합니다.
  HandleMenuClick 이벤트 함수를 통해 드롭다운 메뉴의 각 항목을 클릭해서 페이지를 이동시킵니다.
  */
  const handleUserIconClick = () => {
    dispatch(toggleDropdown());
  };

  const handleMenuClick = (menu) => {
    dispatch(toggleDropdown());
    if (menu === '마이페이지') {
      navigate('/mypage');
    } else if (menu === '상점') {
      // navigate('/store');
      showErrorToast("준비중인 페이지입니다.")
      // } else if (menu === '메인') {
      //   navigate('/');
    } else if (menu === '로그아웃') {
      logout();
    }
  };

  /*
  로그아웃 시에 ACCESS_TOKEN과 REFRESH_TOKEN을 로컬 스토리지에서 삭제합니다..
  그리고, setLoggedIn(false) 액션을 디스패치하여 로그인 상태를 업데이트한 후, 홈페이지로 리다이렉트 합니다.
  */
  const logout = async () => {
    // console.log('로그아웃 요청 시작');
    try {
      await fetchAPI('/api/member/logout', 'PATCH');
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);
      dispatch(setLoggedIn(false));
      dispatch(alertCount(0));
      navigate('/');
    } catch (error) {
      console.error(error);
      localStorage.removeItem(ACCESS_TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);
      dispatch(setLoggedIn(false));
      dispatch(alertCount(0));
      navigate('/');
    }
  };

  return (
    <header>
      <div className="userInfo-container">
        {isLoggedIn ? (
          <div className="user-icon-container-flex" ref={dropdownRef}>
            {/* 붕어빵 */}
            <div className="reward-fish">
              <img
                className="fishbun-reward"
                src={Reward}
                onClick={handleRewardClick}
                alt="붕어빵 아이콘"
              />
              <span className="bun-count">{rewardCount}</span>
              <img
                className="loginuser"
                src={Loginuser}
                alt="로그인 유저 아이콘"
                onClick={handleUserIconClick}
              />
            </div>
            {/* 유저 아이콘 */}

            {isDropdownOpen && (
              <div className="dropdown-menu">
                <ul>
                  <li
                    className="dropdown-item"
                    onClick={() => handleMenuClick('마이페이지')}
                  >
                    마이페이지
                  </li>
                  <hr />
                  <li
                    className="dropdown-item-store"
                    onClick={() => handleMenuClick('상점')}
                  >
                    상점
                  </li>
                  <hr />
                  {/* <li
                    className="dropdown-item-main"
                    onClick={() => handleMenuClick('메인')}
                  >
                    메인
                  </li> */}
                  <li
                    className="dropdown-item-logout"
                    onClick={() => handleMenuClick('로그아웃')}
                  >
                    로그아웃
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          <div className="user-icon-container">
            <div className="reward-fish">
              <div onClick={() => navigate('/login')} className="login-btn">
                로그인 / 가입
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default UserInfoHeader;
