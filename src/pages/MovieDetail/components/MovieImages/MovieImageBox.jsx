import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import Lightbox from 'yet-another-react-lightbox';
import Download from 'yet-another-react-lightbox/plugins/download';
import 'yet-another-react-lightbox/styles.css';
import './MovieImages.style.css';

const MovieImageBox = ({ data, name }) => {
	const [showMore, setShowMore] = useState(false);
	const [open, setOpen] = useState(false);
	const [selectedImageIndex, setSelectedImageIndex] = useState(null);

	const handleImageClick = (index) => {
		setSelectedImageIndex(index);
		setOpen(true);
	};

	const slides = data?.slice(0, showMore ? 30 : 8).map((item, index) => ({
		src: `https://image.tmdb.org/t/p/original${item.file_path}`,
		downloadUrl: `https://image.tmdb.org/t/p/original${item.file_path}`,
	}));

	return (
		<div>
			<Container className='media-container'>
				<div className='media-list'>
					{data?.slice(0, showMore ? 30 : 8).map((item, index) => (
						<div
							className={`media-${name}-container`}
							key={index}
							onClick={() => handleImageClick(index)}>
							<img
								src={`https://image.tmdb.org/t/p/original${item.file_path}`}
								alt=''
								className='media-image'
							/>
						</div>
					))}
				</div>

				{data?.length < 9 ? null : (
					<div className='media-showmore'>
						<Button
							variant='warning'
							onClick={() => setShowMore((prev) => !prev)}>
							{showMore === false ? 'Show More' : 'Show Less'}
						</Button>
					</div>
				)}
			</Container>
			{open && (
				<Lightbox
					open={open}
					close={() => setOpen(false)}
					slides={slides}
					plugins={[Download]}
					initialSlide={selectedImageIndex}
				/>
			)}
		</div>
	);
};

export default MovieImageBox;
