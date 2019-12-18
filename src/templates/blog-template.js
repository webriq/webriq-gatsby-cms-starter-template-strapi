import React from 'react'
import Layout from '../components/layout'
import { graphql, Link } from 'gatsby'
import { Container } from 'reactstrap'
import SEO from '../components/seo'
import marked from 'marked'
import moment from 'moment'
const slugify = require('slugify')
class BlogTemplate extends React.Component {
	render() {
		const { post } = this.props.data
		const { previous, next } = this.props.pageContext
		// console.log(previous)
		// console.log(next)
		return (
			<Layout>
				<SEO title={post.title} description={post.excerpt} />
				<div class="page-headline">
					<div class="container">
						<div class="section-heading text-center">
							<h6 class="font-weight-bold text-uppercase text-white-50 flair">
								Blog
							</h6>
							<h1>
								<strong>{post.title}</strong>
								<br />
							</h1>
							<span class="text-white-50 small">
								<i class="fa fa-calendar-o pr-1" />
								{post.date || moment(post.created_at).format('MMMM DD, YYYY')}
							</span>
						</div>
					</div>
				</div>
				<div className="page-content">
					<Container>
						<div class="row justify-content-center">
							<div class="col-md-9">
								<div
									dangerouslySetInnerHTML={{
										__html: marked(post.body),
									}}
								/>
							</div>
						</div>
						<div class="blog-nav">
							<div class="row">
								<div class="col-md-6 text-md-left">
									{previous ? (
										<div>
											<span class="font-weight-bold text-uppercase text-muted d-block small">
												Previous
											</span>
											<Link to={slugify(previous.title.toLowerCase())}>
												{previous.title}
											</Link>
										</div>
									) : null}
								</div>
								<div class="col-md-6 text-md-right">
									{next ? (
										<div>
											<span class="font-weight-bold text-uppercase text-muted d-block small">
												next
											</span>
											<Link to={slugify(next.title.toLowerCase())}>
												{next.title}
											</Link>
										</div>
									) : null}
								</div>
							</div>
						</div>
					</Container>
				</div>
			</Layout>
		)
	}
}

export default BlogTemplate

export const blogQuery = graphql`
	query BlogPostTemplateQuery($id: String!) {
		post: strapiPosts(id: { eq: $id }) {
			id
			title
			excerpt
			shortdescription
			body
			categories {
				title
			}
			created_at
			date(formatString: "MMMM DD, YYYY")
			banner {
				childImageSharp {
					fluid {
						src
					}
				}
			}
		}
	}
`
