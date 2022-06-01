import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Search from '../Search/Search';
import Cards from '../Cards/Cards';
import Button from '../Button/Button';
import './Pairs.scss';
import Spinner from '../Spinner/Spinner';

export default function Pairs() {
	const { symbol = 'USDT' } = useParams();

	const [data, setData] = useState(null);
	const [loading, setLoading] = useState(true);
	const [pairs, setPairs] = useState(null);
	const [showCount, setShowCount] = useState(5);
	const [search, setSearch] = useState('');

	useEffect(() => {
		setLoading(true);
		fetch(`/${symbol}`).then(response => {
			response.json().then(data => {
				setData(data);
				setLoading(false);
			});
		});
	}, [symbol]);

	const handleShowMore = () => {
		setShowCount(showCount + 5);
	};

	const handleSearch = search => {
		setSearch(search);
	};

	useEffect(() => {
		if (data) {
			const filteredData = data.pairs.filter(item => {
				return item.symbol.toLowerCase().includes(search.toLowerCase());
			});
			setPairs(filteredData);
		}
	}, [search, data]);

	return loading ? (
		<Spinner />
	) : (
		<div className='pairs'>
			<div className='pairs__navbar'>
				<Search onSearch={handleSearch} />
				{symbol !== 'USDT' && (
					<Link to='/' className='pairs__navbar__back-button'>
						<Button>Back to home page</Button>
					</Link>
				)}
			</div>
			<Cards
				pairs={pairs}
				count={showCount}
				handleShowMore={handleShowMore}
			/>
		</div>
	);
}