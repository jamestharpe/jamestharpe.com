import React, { useEffect } from "react";
// import Parser, { Output } from "rss-parser";

// const parser = new Parser();

type FeedProps = {
	url: string;
};

const Feed: React.FC<FeedProps> = ({ url }) => {
	console.log("Feed", url);
	// const [feed, setFeed] = useState({} as Output<{ [key: string]: unknown }>);

	useEffect(() => {
		// void parser.parseURL(url, (err, feedData) => {
		// 	if (err) console.log("Error loading " + url, err);
		// 	setFeed(feedData);
		// });
	}, [url]);

	return <label>{JSON.stringify(url)}?</label>;
};

export default Feed;
