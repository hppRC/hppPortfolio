import React from 'react';
import { graphql, Link } from 'gatsby';
import Layout from '../layouts';
import TagList from '../components/TagList';
import { MDXRenderer } from 'gatsby-plugin-mdx';
import { MDXProvider } from '@mdx-js/react';
import * as ReactColor from 'react-color';
import Img, { FluidObject } from 'gatsby-image';
import SEO from '../components/SEO';

interface Props {
	data: {
		mdx: {
			body: string;
			excerpt: string;
			frontmatter: Frontmatter;
		};
	};
	pageContext: PageContextInterface;
}

interface PageContextInterface {
	prev: {
		frontmatter: Frontmatter;
	};
	next: {
		frontmatter: Frontmatter;
	};
}

interface Frontmatter {
	slug: string;
	date: string;
	title: string;
	tags: string[];
	description: string;
	cover: {
		childImageSharp: {
			fluid: FluidObject;
		};
	};
}

const Test: React.FC<{}> = () => <h1>Test transferd</h1>;

const Components = {
	Test,
	...ReactColor
};

export const Post: React.FC<Props> = ({ data, pageContext }) => {
	const post = data.mdx;
	const slug = post.frontmatter.slug;
	const title = post.frontmatter.title;
	const date = post.frontmatter.date;
	const body = post.body;
	const fluid =
		post.frontmatter.cover && post.frontmatter.cover.childImageSharp.fluid;
	const { prev, next } = pageContext;
	//const description = post.frontmatter.description || post.excerpt || ' ';

	return (
		<Layout>
			<SEO
				title={title}
				desc={' '}
				banner={fluid && fluid.src}
				pathname={`/posts/${slug}`}
				isArticle
			/>
			<h1>{title}</h1>
			<p>{date}</p>
			{fluid && <Img fluid={fluid} alt={title} />}
			<MDXProvider components={Components}>
				<MDXRenderer>{body}</MDXRenderer>
			</MDXProvider>
			<TagList tags={post.frontmatter.tags || []} />
			<PrevAndNext prev={prev} next={next} />
		</Layout>
	);
};

const PrevAndNext: React.FC<PageContextInterface> = ({ prev, next }) => (
	<ul>
		{next && (
			<li key='next'>
				<Link to={`/posts/${next.frontmatter.slug}`}>Next</Link>
			</li>
		)}
		{prev && (
			<li key='prev'>
				<Link to={`/posts/${prev.frontmatter.slug}`}>Previous</Link>
			</li>
		)}
	</ul>
);

export const query = graphql`
	query($slug: String!) {
		mdx(frontmatter: { slug: { eq: $slug } }) {
			body
			excerpt
			frontmatter {
				slug
				date
				title
				tags

				cover {
					childImageSharp {
						fluid(maxWidth: 1000, quality: 90) {
							...GatsbyImageSharpFluid_withWebp_tracedSVG
						}
					}
				}
			}
		}
	}
`;

export default Post;