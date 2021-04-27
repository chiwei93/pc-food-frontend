const initialState = {
  isNavOpen: false,
  isPageLoading: false,
  isEmojiPickerOpen: false,
  isSignedIn: false,
  accountType: 'user',
  uploadType: null,
  chefId: null,
  imageType: '',
};

const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_NAV':
      return { ...state, isNavOpen: !state.isNavOpen };
    case 'CLOSE_NAV':
      return { ...state, isNavOpen: false };
    case 'START_PAGE_LOADING':
      return { ...state, isPageLoading: true };
    case 'STOP_PAGE_LOADING':
      return { ...state, isPageLoading: false };
    case 'TOGGLE_EMOJI_PICKER':
      return { ...state, isEmojiPickerOpen: !state.isEmojiPickerOpen };
    case 'SIGNED_IN':
      return { ...state, isSignedIn: true };
    case 'LOGGED_OUT':
      return { ...state, isSignedIn: false };
    case 'SET_ACCOUNT_TYPE':
      return { ...state, accountType: action.payload };
    case 'SET_UPLOAD_MODAL_TYPE':
      return { ...state, uploadType: action.payload };
    case 'SET_CURRENT_CHEF_ID':
      return { ...state, chefId: action.payload };
    case 'SET_MODAL_IMAGE_TYPE':
      return { ...state, imageType: action.payload };
    default:
      return state;
  }
};

export default uiReducer;
