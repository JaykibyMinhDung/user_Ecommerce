import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import UserAPI from '../API/UserAPI';

function Name(props) {
	const [name, setName] = useState('');
	const history = useHistory()
	useEffect(() => {
		const fetchData = async () => {
			const response = await UserAPI.getDetailData(
				localStorage.getItem('id_user')
			);
			setName(response.data.user);
		};

		fetchData();
	}, []);

	return (
		<li className='nav-item dropdown'>
			<a
				className='nav-link dropdown-toggle'
				style={{ cursor: 'pointer' }}
				id='pagesDropdown'
				data-toggle='dropdown'
				aria-haspopup='true'
				aria-expanded='false'>
				<i className='fas fa-user-alt mr-1 text-gray'></i>
				{name.fullName}
			</a>
			<div className='dropdown-menu mt-3' aria-labelledby='pagesDropdown'>
				<a
					href={`http://localhost:3001`}
					target='_blank' rel="noreferrer"
					className='dropdown-item border-0 transition-link'
					>
					Admin
				</a>
				<Link
					className='dropdown-item border-0 transition-link'
					to={'/history'}>
					History
				</Link>
			</div>
		</li>
	);
}

export default Name;
