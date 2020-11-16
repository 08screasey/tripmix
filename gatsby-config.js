module.exports = {
  pathPrefix: "/tripmix",
  siteMetadata: {
    title: `TripMix Database`,
    description: `The mobile pocket guide to harm-reduction through education.`,
    author: `Sam Creasey`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-netlify`,
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-plugin-web-font-loader`,
      options: {
        typekit:{
          id:'fzr3gwq'
        }
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `./src/data/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-plugin-sass`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Tripsit Database`,
        short_name: `TripMix`,
        start_url: `/`,
        background_color: `#f5f5f5`,
        theme_color: `rgb(32,35,42)`,
        display: `Standalone`,
        icon:`src/images/TripSit2.jpg`
      },
    },
    `gatsby-plugin-offline`
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
}
