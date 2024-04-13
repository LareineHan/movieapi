import React, { useState } from 'react';
import './AppLayout.style.css';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../images/topstream.png';
import Footer from './components/Footer/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Outlet, useNavigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import BackToTopButton from '../common/BackToTopBtn/BackToTopBtn';

const AppLayout = () => {
	const [keyword, setKeyword] = useState('');
	const [navbarExpanded, setNavbarExpanded] = useState(false);
	const navigate = useNavigate();
	const searchByKeyword = (event) => {
		event.preventDefault();
		// url needs to be changed!
		navigate(`/movies?q=${keyword}`);
		setKeyword('');
		setNavbarExpanded(false);
	};

	return (
		<div className='app-layout'>
			<ScrollToTop />
			<Navbar
				expand='lg'
				className='main-nav-bar '
				expanded={navbarExpanded}
				collapseOnSelect>
				<Container fluid>
					<Navbar.Brand href='/'>
						<img className='main-logo' src={logo} width={'120px'} alt='logo' />
					</Navbar.Brand>
					<Navbar.Toggle
						aria-controls='navbarScroll'
						onClick={() => setNavbarExpanded(!navbarExpanded)}
					/>
					<Navbar.Collapse id='navbarScroll'>
						<Nav
							className='me-auto my-2 my-lg-0 nav-menu'
							// style={{ maxHeight: '100px' }}
							navbarScroll>
							<Nav.Link href='/'>Home</Nav.Link>
							<Nav.Link href='/movies'>Movies</Nav.Link>
						</Nav>
						<Form className='d-flex search-area' onSubmit={searchByKeyword}>
							<Form.Control
								type='search'
								placeholder='Search'
								className='me-2 search-input'
								aria-label='Search'
								value={keyword}
								onChange={(event) => {
									setKeyword(event.target.value);
								}}
							/>
							<Button variant='danger' className='search-btn' type='submit'>
								Search
							</Button>
						</Form>
						<div className='user'>
							<FontAwesomeIcon icon={faUser} width={'42px'} />
						</div>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<BackToTopButton />
			<Outlet />
			<Footer />
		</div>
	);
};

export default AppLayout;
