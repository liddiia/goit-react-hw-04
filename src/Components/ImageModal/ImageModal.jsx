import style from './ImageModal.module.css';
import Modal from 'react-modal';
Modal.setAppElement('#root');
import { CgCloseO } from 'react-icons/cg';
import { CgHeart } from "react-icons/cg";
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
const ImageModal = ({isModalOpen, closeModal, selectedImage }) => {
  return (
    <Modal
      className={style.customModalContent}
      overlayClassName={style.overlay}
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Expended image"
      appElement={document.getElementById('root')}
    >
      <button
        className={style.btnClose}
        onClick={closeModal}
        style={{ border: 'none', background: 'none', cursor: 'pointer' }}
      >
        <CgCloseO size={30} />
      </button>

      {selectedImage && (
        <div>
          <img
            className={style.modalImg}
            src={selectedImage.url}
            alt={selectedImage.description || 'Image'}
          />
          {selectedImage.description && <p>{selectedImage.description}</p>}
          <p>Author: {selectedImage.author}</p>
          <div><CgHeart />{selectedImage.likes} </div>
        </div>
      )}
    </Modal>
  );
};

export default ImageModal;