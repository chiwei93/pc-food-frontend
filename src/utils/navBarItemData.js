import {
  FaUtensils,
  FaGlassMartiniAlt,
  FaQuestionCircle,
  FaInfoCircle,
  FaHeadset,
  FaHome,
  FaUserAlt,
  FaRegCalendarCheck,
  FaRegEnvelopeOpen,
  FaRegCreditCard,
} from 'react-icons/fa';

export const notSignedInItems = [
  { text: 'Home', icon: <FaHome />, path: '/' },
  { text: 'Sign Up', icon: <FaUtensils />, path: '/signup' },
  { text: 'Log In', icon: <FaGlassMartiniAlt />, path: '/login' },
  { text: 'About Us', icon: <FaInfoCircle />, path: '/aboutus' },
  { text: 'Support', icon: <FaHeadset />, path: '/support' },
  { text: 'FAQ', icon: <FaQuestionCircle />, path: '/faq' },
];

export const userSignedInItems = [
  { text: 'Home', icon: <FaHome />, path: '/' },
  { text: 'My Account', icon: <FaUserAlt />, path: '/me' },
  { text: 'Proposals', icon: <FaRegCalendarCheck />, path: '/proposals' },
  { text: 'Messages', icon: <FaRegEnvelopeOpen />, path: '/chats' },
  { text: 'Orders History', icon: <FaRegCreditCard />, path: '/orders' },
  { text: 'Log Out', icon: <FaUtensils />, path: '/' },
];

export const chefSignedInItems = [
  { text: 'Home', icon: <FaHome />, path: '/' },
  { text: 'My Account', icon: <FaUserAlt />, path: '/me' },
  { text: 'My Page', icon: <FaGlassMartiniAlt />, path: '/chefs/:id' },
  {
    text: 'Proposal Requests',
    icon: <FaRegCalendarCheck />,
    path: '/proposals',
  },
  { text: 'Messages', icon: <FaRegEnvelopeOpen />, path: '/chats' },
  { text: 'Orders History', icon: <FaRegCreditCard />, path: '/orders' },
  { text: 'Log Out', icon: <FaUtensils />, path: '/' },
];
