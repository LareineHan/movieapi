import React, { useEffect, useState } from 'react';
import './ReviewSheet.style.css';
import { Container, Col, Row, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { useSelector } from 'react-redux';
import SimilarMoviesSlide from '../SimilarMoviesSlide/SimilarMoviesSlide';
import { rating } from '../../../../constants/rating';
const ReviewSheet = () => {
	const data = useSelector((state) => state.movieReviews.movieReviews);
	const movieId = data?.id;
	const [showMore, setShowMore] = useState([]);
	const [moreReviews, setMoreReviews] = useState(false); // [false, false, false, false, false, false, false, false, false, false
	const [item, setItem] = useState(null);

	useEffect(() => {
		setMoreReviews(false);
	}, [data]);

	useEffect(() => {
		if (data) {
			const reviews = data?.results?.map((review, index) => ({
				author: review.author,
				rating: rating(review.author_details.rating),
				content: review.content,
				picture: `https://randomuser.me/api/portraits/${
					Math.random() > 0.5 ? 'men' : 'women'
				}/${Math.floor(Math.random() * 100)}.jpg`,
			}));
			return setItem(reviews);
		}
	}, [data]);

	console.log('ReviewSheet data: ', data);
	const toggleShowMore = (index) => {
		setShowMore((prevShowMore) => {
			const newShowMore = [...prevShowMore];
			newShowMore[index] = !newShowMore[index];
			return newShowMore;
		});
	};

	const toggleMoreReviews = () => {
		setMoreReviews((prev) => !prev);
	};

	return (
		<>
			{item?.length === 0 ? (
				<>
					<SimilarMoviesSlide movieId={movieId} />
				</>
			) : (
				<>
					<h3 className='review-title'>{`Reviews (total: ${item?.length})`}</h3>
					<hr />
					<Container>
						<Row className='review-box'>
							{moreReviews === false ? (
								item?.slice(0, 3).map((review, index) => (
									<Container key={index} className='default-reviews-container'>
										<Row className='reviewUser'>
											<Col>
												<img
													src={review.picture}
													alt={<FontAwesomeIcon icon={faUser} />}
												/>
												<div className='author'>{review.author}</div>
												<div className='rating'>{review.rating}</div>
											</Col>
										</Row>
										<Row className='review-content'>
											<h6>
												{showMore[index]
													? review.content
													: `${review.content.substring(0, 250)}...`}
												<div className='showmore-div'>
													<br />
													<Button
														variant='link'
														onClick={() => toggleShowMore(index)}>
														{showMore[index] ? 'Show less' : 'Show more'}
													</Button>
												</div>
											</h6>
										</Row>
									</Container>
								))
							) : (
								<div>
									{item?.map((review, index) => (
										<Container key={index} className='all-reviews-container'>
											<Row className='reviewUser'>
												<Col>
													<img
														src={review.picture}
														alt={<FontAwesomeIcon icon={faUser} />}
														style={{ width: '50px' }}
													/>
													<div className='author'>{review.author}</div>
													<div className='rating'>{review.rating}</div>
												</Col>
											</Row>
											<Row className='reviewContent'>
												<h6 className='review-content'>
													{showMore[index]
														? review.content
														: `${review.content.substring(0, 250)}...`}
													<div className='showmore-div'>
														<br />
														<Button
															variant='link'
															onClick={() => toggleShowMore(index)}>
															{showMore[index] ? 'Show less' : 'Show more'}
														</Button>
													</div>
												</h6>
											</Row>
										</Container>
									))}
								</div>
							)}
						</Row>
						<div className='togglemore-div'>
							<br />
							{item?.length < 3 ? null : (
								<Button variant='warning' onClick={() => toggleMoreReviews()}>
									{moreReviews === true ? 'Show Less' : 'Show All'}
								</Button>
							)}
						</div>
					</Container>
				</>
			)}
		</>
	);
};

export default ReviewSheet;
