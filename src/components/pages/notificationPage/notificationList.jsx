import React from 'react';
import PropTypes from 'prop-types';
import '../../../asset/sass/pages/notificationPage/notificationList.scss';
import INQUIRY from '../../../asset/image/notification-question.svg';
import ANSWER from '../../../asset/image/notification-answer.svg';
import SELECTION from '../../../asset/image/notification-adopt.svg';
import DAILY from '../../../asset/image/notification-fishbun.svg';
import { useApi } from '../../global/utils/apiUtil';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

function NotificationList({ notifications, isLoading }) {
  const navigate = useNavigate();
  const { fetchAPI } = useApi();
  const queryClient = useQueryClient();
  const getNotificationDetails = (type) => {
    switch (type) {
      case 'DAILY':
        return { icon: DAILY, message: '출석 붕어빵 5개를 얻었어요!' };
      case 'ANSWER':
        return { icon: ANSWER, message: '내 질문에 답변이 달렸어요!' };
      case 'SELECTION':
        return { icon: SELECTION, message: '내 답변이 채택 되었어요!' };
      case 'INQUIRY':
        return { icon: INQUIRY, message: '내 문의에 답변이 도착했어요!' };
      default:
        return { icon: null, message: '' };
    }
  };
  console.log(notifications);
  const checkNotification = (index, uri, type) => {
    console.log('Notification index:', uri);
    fetchAPI('/api/notification', 'PATCH', [{ notificationId: index }])
      .then(() => {
        // console.log('Notification updated successfully:', response);
        queryClient.invalidateQueries(['notifications']);
        if (type !== 'DAILY' && uri) {
          navigate(uri);
        } else {
          console.log('땡');
        }
      })
      .catch((error) => {
        console.error('Failed to update notification:', error);
      });
  };

  if (isLoading) {
    return <div>로딩 중</div>;
  }

  if (notifications.length === 0) {
    return <div>현재는 알림이 없어요.</div>;
  }

  return (
    <div className="notification-list">
      {notifications.map((notification, index) => (
        <div
          key={index}
          className={`notification-item ${notification.read ? 'checked' : 'unchecked'}`}
          onClick={() =>
            checkNotification(
              notification.id,
              notification.uri,
              notification.type,
            )
          }
        >
          <img
            src={getNotificationDetails(notification.type).icon}
            alt={`${notification.type} icon`}
            className="notification-icon"
          />
          <div className="title-time">
            <span className="notification-title">
              {getNotificationDetails(notification.type).message}
            </span>
            <span className="notification-time">{notification.createdAt}</span>
          </div>
          <span className="notification-company">{notification.content}</span>
        </div>
      ))}
    </div>
  );
}

NotificationList.propTypes = {
  notifications: PropTypes.array.isRequired,
  isLoading: PropTypes.bool,
};

export default NotificationList;
