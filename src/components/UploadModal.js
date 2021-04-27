import React from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaTimes } from 'react-icons/fa';
import { uploadImage } from '../actions/uploadModalActions';
import classes from './UploadModal.module.css';

const UploadModal = props => {
  const { id } = props.match.params;

  const dispatch = useDispatch();

  const history = useHistory();

  const ui = useSelector(state => state.ui);

  const uploadModal = useSelector(state => state.uploadModal);

  //for dealing with image uploads and live previewing the images
  const onImageFileChange = e => {
    const url = URL.createObjectURL(e.target.files[0]);

    dispatch({ type: 'SET_PREVIEW_IMAGE', payload: url });
    dispatch({ type: 'SET_IMAGE_FILE', payload: e.target.files[0] });
  };

  //upload photo to cloud
  const onUploadBtnClick = () => {
    const formData = new FormData();

    formData.append(ui.imageType, uploadModal.imageFile);

    dispatch(uploadImage(formData, ui.uploadType, history, id));
  };

  return ReactDOM.createPortal(
    <div className={`${classes.overlay}`} onClick={() => history.goBack()}>
      <div className={classes.modal} onClick={e => e.stopPropagation()}>
        <div className={classes.btnCloseContainer}>
          <button className={classes.btnClose} onClick={() => history.goBack()}>
            <FaTimes />
          </button>
        </div>
        <div className={classes.inputContainer}>
          <input
            type="file"
            id="profile_image"
            className={classes.fileInput}
            multiple={false}
            onChange={onImageFileChange}
          />
          <label htmlFor="profile_image" className={classes.btnLabel}>
            Choose a file...
          </label>
          <button className={classes.btnUpload} onClick={onUploadBtnClick}>
            {uploadModal.isUploading ? 'In Progress...' : 'Upload'}
          </button>
        </div>

        <div className={classes.photoContainer}>
          {uploadModal.previewImage ? (
            <img
              src={uploadModal.previewImage}
              alt="live preview"
              className={classes.image}
            />
          ) : (
            <p className={classes.previewText}>Live preview</p>
          )}
        </div>
      </div>
    </div>,
    document.querySelector('#modal')
  );
};

export default UploadModal;
