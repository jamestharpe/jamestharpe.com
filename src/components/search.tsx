import { Link } from "gatsby";
import React, { useEffect, useState } from "react";

const Search = () => {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState<LunrResult[]>([]);

	useEffect(() => {
		if (!query || !window.__LUNR__) {
			setResults([]);
			return;
		}
		const lunrIndex = window.__LUNR__["en"];
		const searchResults = lunrIndex.index.search(query);
		setResults(searchResults.map(({ ref }) => lunrIndex.store[ref]));
	}, [query]);

	return (
		<form
			onSubmit={(e) => e.preventDefault()}
			role="search"
			area-label="All Articles"
		>
			<label htmlFor="search">Search: </label>
			<input
				id="search"
				type="text"
				placeholder="Topic, keyword, etc..."
				defaultValue={query}
				autoComplete="off"
				onChange={(event) => {
					setQuery(event.target.value);
				}}
			/>
			<ul>
				{results.map(({ url, title }) => {
					return (
						<li key={url}>
							<Link to={url}>{title}</Link>
						</li>
					);
				})}
			</ul>
		</form>
	);
};

export default Search;
