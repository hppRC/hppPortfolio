const config = require(`./config/site`);

module.exports = {
	siteMetadata: {
		...config
	},
	plugins: [
		`gatsby-plugin-typescript`,
		`gatsby-plugin-emotion`,
		`gatsby-plugin-catch-links`,
		`gatsby-plugin-transition-link`,
		`gatsby-transformer-sharp`,
		`gatsby-plugin-sharp`,
		{
			resolve: `gatsby-source-filesystem`, // this entry has to be the first or will not work as per FAQ
			options: {
				name: `assets`,
				path: `${__dirname}/content/assets`
			}
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `posts`,
				path: `${__dirname}/content/posts`
			}
		},
		{
			resolve: `gatsby-source-filesystem`,
			options: {
				name: `images`,
				path: `${__dirname}/src/images`
			}
		},
		{
			resolve: `gatsby-plugin-mdx`,
			options: {
				extensions: [`.mdx`, `.md`],
				gatsbyRemarkPlugins: [
					`gatsby-remark-relative-images`,
					{
						resolve: `gatsby-remark-images`,
						options: {
							maxWidth: 690,
							quality: 90,
							linkImagesToOriginal: true
						}
					},
					{
						resolve: `gatsby-remark-prismjs`,
						options: {
							classPrefix: 'language-',
							inlineCodeMarker: null,
							aliases: {},
							showLineNumbers: true,
							noInlineHighlight: false
						}
					}
				]
			}
		},
		`gatsby-plugin-netlify`,
		`gatsby-plugin-advanced-sitemap`,
		{
			resolve: `gatsby-plugin-canonical-urls`,
			options: {
				siteUrl: `https://hpprc.com`
			}
		},
		{
			resolve: `gatsby-plugin-robots-txt`,
			options: {
				host: `https://hpprc.com`,
				sitemap: `https://hpprc.com/sitemap.xml`,
				policy: [{ userAgent: `*`, allow: `/` }]
			}
		},
		{
			resolve: `gatsby-plugin-webpack-bundle-analyzer`,
			options: {
				openAnalyzer: false
			}
		},
		{
			resolve: `gatsby-plugin-google-analytics`,
			options: {
				// replace "UA-XXXXXXXXX-X" with your own Tracking ID
				trackingId: `UA-149661454-1`
			}
		},
		{
			resolve: `gatsby-plugin-manifest`,
			options: {
				name: config.title,
				short_name: config.shortName,
				description: config.description,
				Scope: `/`,
				start_url: `/?utm_source=homescreen`,
				background_color: config.backgroundColor,
				theme_color: config.themeColor,
				display: `standalone`,
				icon: config.icon
			}
		},
		`gatsby-plugin-offline`
	]
};
