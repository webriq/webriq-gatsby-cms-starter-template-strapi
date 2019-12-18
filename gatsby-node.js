const path = require('path')
const slugify = require('slugify')

function mapEdgesToNodes(data) {
  if (!data.edges) return []
  return data.edges.map(edge => edge.node)
}

function createSlug(text) {
  return slugify(text, {
    replacement: '-', // replace spaces with replacement
    remove: /[*+~.()'"!:@?]/g, // regex to remove characters
    lower: true, // result in lower case
  })
}

const makeRequest = (graphql, request) =>
  new Promise((resolve, reject) => {
    // Query for nodes to use in creating pages.
    resolve(
      graphql(request).then(result => {
        if (result.errors) {
          reject(result.errors)
        }
        return result
      })
    )
  })

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const getStrapPost = makeRequest(
    graphql,
    `query {
      allStrapiPosts{
        edges {
          node {
            id
            title
            date(formatString: "MMMM DDDD, YYYY")
            created_at
          }
        }
      }
    }
 `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.allStrapiPosts.edges

    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node

      createPage({
        path: slugify(post.node.title.toLowerCase()),
        component: path.resolve(`./src/templates/blog-template.js`),
        context: {
          id: post.node.id,
          slug: slugify(post.node.title.toLowerCase()),
          previous,
          next,
        },
      })
    })
  })

  const getStrapiCategory = makeRequest(
    graphql,
    `query {
       allStrapiCategories {
         edges {
           node {
             id
             title
           }
         }
       }
     }
  `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.allStrapiCategories.edges

    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node

      createPage({
        path: slugify(post.node.title.toLowerCase()),
        component: path.resolve(`./src/templates/category.js`),
        context: {
          title: post.node.title,
          slug: slugify(post.node.title.toLowerCase()),
          previous,
          next,
        },
      })
    })
  })

  return Promise.all([getStrapPost, getStrapiCategory])
}
