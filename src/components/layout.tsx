/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import { WindowLocation } from "@reach/router";
import { graphql, Link, useStaticQuery } from "gatsby";
import React, { ReactNode } from "react";
import Search from "./search";

type LayoutProps = {
	children: ReactNode;
	location: WindowLocation;
};

const Layout: React.FC<LayoutProps> = ({ location, children }) => {
	const data: {
		site: { siteMetadata: { title: string; siteUrl: string } };
	} = useStaticQuery(graphql`
		query SiteTitleQuery {
			site {
				siteMetadata {
					title
					siteUrl
				}
			}
		}
	`);

	return (
		<>
			<header>
				<div className="row">
					<h1>
						<Link to="/">
							{data.site.siteMetadata.title || `Oops! Forgot to set a title`}
						</Link>
					</h1>
				</div>
			</header>
			<nav className="clearfix">
				<div className="row">
					<section className="column small-6 medium-6 large-6">
						<Search />
					</section>
					<section className="column small-6 medium-6 large-6">
						<Link to="/browse" className="active">
							Browse
						</Link>
					</section>
				</div>
			</nav>
			<main>{children}</main>
			<footer className="clearfix">
				<div className="row">
					{/* About */}
					<section className="column small-12 medium-6 large-3">
						<h2>About James</h2>
						<p>
							James is a father at home, Principal Software Engineer at work, and{" "}
							<em>wannabe</em> autodidact everywhere else.
						</p>
						<p>
							<Link to="/contact">Contact James</Link>
						</p>
					</section>
					{/* Social */}
					<section className="column small-12 medium-6 large-3">
						<h2>Social</h2>
						<a href={data.site.siteMetadata.siteUrl}>
							<img
								alt="James Tharpe's Website"
								width="22px"
								src="https://raw.githubusercontent.com/iconic/open-iconic/master/svg/globe.svg"
							/>
						</a>{" "}
						<a href="https://twitter.com/jamestharpe">
							<img
								alt="James Tharpe's Twitter"
								width="22px"
								src="https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/twitter.svg"
							/>
						</a>{" "}
						<a href="https://www.linkedin.com/in/jamestharpe/">
							<img
								alt="James Tharpe's LinkedIn"
								width="22px"
								src="https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/linkedin.svg"
							/>
						</a>{" "}
						<a href="https://stackoverflow.com/users/104763/james">
							<img
								alt="James Tharpe's StackOverflow"
								width="22px"
								src="https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/stackoverflow.svg"
							/>
						</a>{" "}
						<a href="https://gitlab.com/jamestharpe">
							<img
								alt="James Tharpe's GitLab"
								width="22px"
								src="https://cdn.jsdelivr.net/npm/simple-icons@v3/icons/gitlab.svg"
							/>
						</a>
					</section>
					{/* Copyright */}
					<section className="column small-12 medium-6 large-3">
						<p
							{...{
								"xmlns:dct": "http://purl.org/dc/terms/",
								"xmlns:cc": "http://creativecommons.org/ns#"
							}}
							className="license-text"
						>
							<Link
								rel="cc:attributionURL"
								property="dct:title"
								to={location.pathname}
							>
								This article
							</Link>{" "}
							by
							<a
								rel="cc:attributionURL dct:creator"
								property="cc:attributionName"
								href={data.site.siteMetadata.siteUrl}
							>
								James Tharpe
							</a>{" "}
							is licensed under{" "}
							<a
								rel="license"
								href="https://creativecommons.org/licenses/by-nc-sa/4.0"
							>
								CC BY-NC-SA 4.0
								<br />
								<img
									style={{
										height: "22px!important",
										marginLeft: "3px",
										verticalAlign: "text-bottom"
									}}
									src="https://mirrors.creativecommons.org/presskit/icons/cc.svg?ref=chooser-v1"
									alt="Creative Commons"
								/>
								<img
									style={{
										height: "22px!important",
										marginLeft: "3px",
										verticalAlign: "text-bottom"
									}}
									src="https://mirrors.creativecommons.org/presskit/icons/by.svg?ref=chooser-v1"
									alt="Attribution"
								/>
								<img
									style={{
										height: "22px!important",
										marginLeft: "3px",
										verticalAlign: "text-bottom"
									}}
									src="https://mirrors.creativecommons.org/presskit/icons/nc.svg?ref=chooser-v1"
									alt="Non-Commercial"
								/>
								<img
									style={{
										height: "22px!important",
										marginLeft: "3px",
										verticalAlign: "text-bottom"
									}}
									src="https://mirrors.creativecommons.org/presskit/icons/sa.svg?ref=chooser-v1"
									alt="Share Alike"
								/>
							</a>
						</p>
					</section>
				</div>
			</footer>
		</>
	);
};

export default Layout;
