import React, { useState } from 'react'
import './ModalTrigger.style.css';
import { Button } from 'react-bootstrap';
import PreviewModal from '../PreviewModal/PreviewModal';
import { fetchPreviewVideo } from '../../redux/reducers/previewVideoSlice';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

const ModalTrigger = ({movieId}) => {
    const [modalShow, setModalShow] = useState(false);
    const dispatch = useDispatch();
    console.log('******movieId', movieId)


    const getVideo = () => {
        dispatch(fetchPreviewVideo(movieId));
        setModalShow(true);
    };

    return (

    <div className='modal-trigger'>  <Button variant="warning" onClick={() => getVideo()}>
        Watch Trailer &nbsp;<FontAwesomeIcon icon={faPlay} />
      </Button>

          <PreviewModal
        movieId={movieId}
        show={modalShow}
        onHide={() => setModalShow(false)}
      /></div>
  )
}

export default ModalTrigger
