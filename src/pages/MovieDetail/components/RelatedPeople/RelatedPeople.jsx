import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Button } from 'react-bootstrap';
import ProfileCard from '../../../../common/ProfileCard/ProfileCard';
import TopRatedMovieSlide from '../../../Home/components/TopRatedMovieSlide/TopRatedMovieSlide';
import './RelatedPeople.style.css';

const RelatedPeopleList = () => {
	const [showMore, setShowMore] = useState(false);
	const relatedPeople = useSelector(
		(state) => state.relatedPeople.relatedPeople
	);
	const cast = relatedPeople?.cast;
	const crew = relatedPeople?.crew;

	return (
		<>
			{crew?.length === 0 ? (
				<>
					<TopRatedMovieSlide />
				</>
			) : (
				<>
					<h3 className='cast-title'>Cast</h3>
					<hr />
					<Container className='related-people-container'>
						<div className='related-people-list'>
							{crew?.slice(0, 3).map((person) => (
								<ProfileCard
									key={person?.id}
									name={person?.name}
									role={person.job}
								/>
							))}
							{cast?.slice(0, showMore ? 17 : 5).map((person) => (
								<ProfileCard
									key={person.id}
									name={person.name}
									character={person.character}
									profilePicture={person.profile_path}
								/>
							))}
						</div>
						{cast?.length < 5 ? null : (
							<div className='related-people-showmore'>
								<Button
									variant='warning'
									onClick={() => setShowMore((prev) => !prev)}>
									{showMore === false ? 'Show More' : 'Show Less'}
								</Button>
							</div>
						)}
					</Container>
				</>
			)}
		</>
	);
};

export default RelatedPeopleList;
