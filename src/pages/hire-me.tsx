import { PageProps } from "gatsby";
import React, { FC } from "react";
import Layout from "../components/layout";
import SEO from "../components/seo";

const HireMePage: FC<PageProps> = ({ location }) => (
	<Layout location={location}>
		<SEO title="Nerd for Hire" />
		<h1>Nerd for Hire</h1>
		<p>
			Wouldn’t it be great if you had an extra brain to handle complex projects
			that you don’t have time for? Well, you can’t! So go with the next best
			thing: me.
		</p>

		<h2>Services</h2>

		<h3>Career Coaching for Software Engineers & Managers</h3>
		<p>
			<ul>
				<li>Resume Writing and Review</li>
				<li>Interview practice and coaching</li>
				<li>Raise/promotion Justification</li>
			</ul>
		</p>
		<h3>Technical Interviewing</h3>
		<p>
			Need to hire someone with great technical skills, but aren't sure how to
			identify real talent? I'll rigorously interview candidates to ensure they
			have strong technical skills.
		</p>

		<h3>Skills Development and Tutoring</h3>
		<p>
			<ul>
				<li>K-12 Math & Science</li>
				<li>
					Software Development:
					<ul>
						<li>Gatsby</li>
						<li>NodeJS</li>
						<li>TypeScript</li>
						<li>React</li>
						<li>Web development: HTML, CSS, JavaScript</li>
					</ul>
				</li>
			</ul>
		</p>

		<h3>Website Quick Wins</h3>
		<p>
			<ul>
				<li>Google Tag Manager installation</li>
				<li>Google Analytics installation</li>
				<li>Google Search console setup and configuration</li>
				<li>Social media (Facebook, Twitter, etc) integration</li>
				<li>Transfer your site to a new host</li>
				<li>Install an SSL certificate</li>
				<li>Implement a Content Delivery Network (CDN)</li>
				<li>Improve site speed through minification and compression</li>
				<li>Plug-in and Theme upgrades for your CMS</li>
				<li>Scan for broken links and common SEO issues</li>
				<li>Test for browser compatibility</li>
			</ul>
		</p>
	</Layout>
);

export default HireMePage;
