import React from 'react';
import './ProfileCard.style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserSecret } from '@fortawesome/free-solid-svg-icons';

const ProfileCard = ({ name, role, character, profilePicture }) => {
	return (
		<div className='profile-card'>
			{profilePicture && (
				<div className='profile-picture-container'>
					<img
						src={`https://image.tmdb.org/t/p/original${profilePicture}`}
						alt=''
						className='profile-picture'
					/>
				</div>
			)}
			<div className='details'>
				<h3>{character}</h3>
				<p className='profile-card-name'>{name}</p>
				<p className='profile-card-role'>{role}</p>
			</div>
		</div>
	);
};

export default ProfileCard;
