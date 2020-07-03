/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require(`path`)

exports.createPages = async gatsbyNodeHelpers => {
    const { graphql, actions } = gatsbyNodeHelpers
    const { createPage } = actions

    const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              slug
            }
          }
        }
      }
    }
  `)

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
        createPage({
            path: node.frontmatter.slug,
            component: path.resolve(`./src/pages/post.js`),
            context: {
                slug: node.frontmatter.slug
            }
        })
    })
}