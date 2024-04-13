import React from 'react';
import YouTube from 'react-youtube';
import { Button } from 'react-bootstrap';
// import { YouTubeProps } from 'react-youtube';
import { Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import './PreviewModal.style.css';

const PreviewModal = (props) => {
	const videoData = useSelector((state) => state.previewVideo.previewVideo);
	const videoId = videoData?.results[0]?.key;

	console.log(videoData);
	const onReady = (event) => {
		// access to player in all event handlers via event.target
		event.target.pauseVideo();
	};

	const opts = {
		height: '390',
		width: '640',
		playerVars: {
			// https://developers.google.com/youtube/player_parameters
			autoplay: 1,
			controls: 1,
			color: 'red',
			fs: 0, // disable fullscreen button
			loop: 1,
		},
	};
	console.log(props);

	return (
		<Modal
			{...props}
			size='lg'
			aria-labelledby='contained-modal-title-vcenter'
			centered>
			<Modal.Body>
				{/* <h4>Centered Modal</h4> */}
				<div className='modal-dialog modal-dialog-centered'>
					<YouTube
						videoId={videoId}
						opts={opts}
						onReady={onReady}
						origin='http://localhost:3000/movies'
						className='youtube-video'
					/>
				</div>
				<Button className='close-btn' variant='dark' onClick={props.onHide}>
					Close
				</Button>
			</Modal.Body>
		</Modal>
	);
};
export default PreviewModal;
