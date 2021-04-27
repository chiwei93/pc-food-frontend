import React, { useEffect } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import logo from '../images/chatImage.png';
import { fetchChatsData } from '../actions/chatsPageActions';
import PageContainer from '../containers/PageContainer';
import ChatItem from '../components/ChatItem';
import PageLoader from '../components/PageLoader';
import classes from './ChatsPage.module.css';

const ChatsPage = props => {
  const dispatch = useDispatch();

  const chat = useSelector(state => state.chat);

  const ui = useSelector(state => state.ui);

  const currentUserEmail =
    props.currentUserEmail || localStorage.getItem('email');

  useEffect(() => {
    dispatch(fetchChatsData(currentUserEmail));
  }, []);

  if (ui.isPageLoading) {
    return <PageLoader />;
  }

  return (
    <PageContainer>
      <div className={classes.pageHeader}>
        <img src={logo} alt="breakfast" className={classes.headerImage} />
        <h2 className={classes.heading}>Messages</h2>
      </div>

      <ul className={classes.chatList}>
        {chat.chats.map(chat => (
          <ChatItem
            {...chat}
            key={chat._id}
            receiverEmail={
              currentUserEmail === chat.receiverEmail
                ? chat.senderEmail
                : chat.receiverEmail
            }
          />
        ))}
      </ul>
    </PageContainer>
  );
};

export default ChatsPage;
