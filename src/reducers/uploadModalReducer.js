const initialState = {
  previewImage: null,
  imageFile: null,
  isUploading: false,
};

const uploadModalReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_PREVIEW_IMAGE':
      return { ...state, previewImage: action.payload };
    case 'SET_IMAGE_FILE':
      return { ...state, imageFile: action.payload };
    case 'START_UPLOADING':
      return { ...state, isUploading: true };
    case 'STOP_UPLOADING':
      return { ...state, isUploading: false };
    default:
      return state;
  }
};

export default uploadModalReducer;
