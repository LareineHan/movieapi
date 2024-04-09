import React from 'react';
import './Footer.style.css';
import { useNavigate } from 'react-router-dom';
import logo from '../../../images/topstream.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faTiktok } from '@fortawesome/free-brands-svg-icons';
import { faPinterest } from '@fortawesome/free-brands-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col, Button } from 'react-bootstrap';

const firstCol = [
	'FAQ',
	'Investor Relations',
	'Buy Gift Cards',
	'Cookie Preferences',
	'Legal Notices',
];
const secondCol = [
	'Help Center',
	'Jobs',
	'Ways to Watch',
	'Corporate Information',
	'Only on Netflix',
];
const thirdCol = [
	'Account',
	'TopStream Shop',
	'Terms of Use',
	'Contact Us',
	'Do Not Sell My Personal Information',
];
const fourthCol = [
	'Media Center',
	'Redeem Gift Cards',
	'Privacy',
	'Speed Test',
	'Ad Choices',
];
const Footer = () => {
	const navigate = useNavigate();
	const backHome = () => {
		navigate(`/`);
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	};

	return (
		<div>
			<hr />
			<Container className='footer-container'>
				<Row className='footer1-menu'>
					<Col sm={3} className='firstCol'>
						<Row>
							{firstCol.map((item, index) => (
								<ul key={`firstCol_${index}`}>
									<li>{item}</li>
								</ul>
							))}
						</Row>
					</Col>
					<Col sm={3} className='secondCol'>
						<Row>
							{secondCol.map((item, index) => (
								<ul key={`secondCol_${index}`}>
									<li>{item}</li>
								</ul>
							))}
						</Row>
					</Col>
					<Col sm={3} className='thirdCol'>
						<Row>
							{thirdCol.map((item, index) => (
								<ul key={`thirdCol_${index}`}>
									<li>{item}</li>
								</ul>
							))}
						</Row>
					</Col>
					<Col sm={3} className='fourthCol'>
						<Row>
							{fourthCol.map((item, index) => (
								<ul key={`fourthCol_${index}`}>
									<li>{item}</li>
								</ul>
							))}
						</Row>
					</Col>
				</Row>
				<Row className='footer2-menu'>
					<Col className='social-icons'>
						<FontAwesomeIcon icon={faInstagram} />
						<FontAwesomeIcon icon={faTiktok} />
						<FontAwesomeIcon icon={faYoutube} />
						<FontAwesomeIcon icon={faPinterest} />
						<FontAwesomeIcon icon={faFacebook} />
					</Col>
					<Row>
						<img src={logo} alt='logo-footer' onClick={() => backHome()}></img>
					</Row>
					<Row>
						<h6>United States</h6>
					</Row>
				</Row>
			</Container>
		</div>
	);
};

export default Footer;
