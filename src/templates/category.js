import React from 'react'
import Layout from '../components/Layout'
import { graphql, Link } from 'gatsby'
import { Container } from 'reactstrap'
import SEO from '../components/seo'
import moment from 'moment'
const slugify = require('slugify')
class BlogTemplate extends React.Component {
	render() {
		// const { previous, next } = this.props.pageContext

		const { data } = this.props
		// console.log(this.props)
		// console.log(previous)
		// console.log(next)
		return (
			<Layout>
				<SEO
					title={this.props.pageContext.title}
					description={data.site.siteMetadata.description}
				/>
				<div class="page-headline">
					<div class="container">
						<div class="section-heading text-center">
							<h6 class="font-weight-bold text-uppercase text-white-50 flair">
								Category
							</h6>
							<h1>
								<strong>{this.props.pageContext.title}</strong>
								<br />
							</h1>
						</div>
					</div>
				</div>
				<div class="blog-section">
					<Container>
						<div class="row justify-content-between">
							<div class="col-md-7">
								{data.allStrapiPosts.edges.map(blog => (
									<div class="blog-item bg-light" key={blog.node.id}>
										<div class="row">
											<div class="col-lg-4 pr-lg-0">
												<Link to="/">
													<div
														class="blog-image h-100"
														style={{
															backgroundImage: `url(${
																blog.node.banner !== null
																	? blog.node.banner.childImageSharp.fluid.src
																	: 'https://source.unsplash.com/user/joshhild/500x500'
															})`,
														}}
													/>
												</Link>
											</div>
											<div class="col-lg-8 pl-lg-0">
												<div class="blog-text">
													<Link to={slugify(blog.node.title.toLowerCase())}>
														<h4>{blog.node.title}</h4>
													</Link>
													{
														<div class="text-muted small">
															{blog &&
															blog.node &&
															blog.node.categories &&
															blog.node.categories.length !== 0
																? blog.node.categories.map(ct => (
																		<span key={ct.id}>
																			<i class="fa fa-folder pr-1" />

																			<Link
																				to={slugify(ct.title.toLowerCase())}
																			>
																				{ct.title + ' '}
																			</Link>
																		</span>
																  ))
																: null}
														</div>
													}
													<p class="pt-2 text-muted">{blog.node.excerpt}</p>
													<span class="text-muted small">
														<i class="fa fa-calendar-o pr-1" />
														{blog.node.date ||
															moment(blog.node.created_at).format(
																'MMMM DD, YYYY'
															)}
													</span>
												</div>
											</div>
										</div>
									</div>
								))}
							</div>
							<div class="col-md-4 mb-4">
								<div class="side-content">
									<h6 class="text-uppercase text-muted">Categories</h6>
									<ul class="list-unstyled">
										{data.allStrapiPosts.group.map(cat => (
											<li key={cat.fieldValue}>
												<Link
													class="text-body font-weight-bold"
													to={slugify(cat.fieldValue.toLowerCase())}
												>
													{cat.fieldValue}
												</Link>
											</li>
										))}
									</ul>
								</div>
								<div class="side-content">
									<h6 class="text-uppercase text-muted">Keep Up-to-Date</h6>
									<p class="small">
										Get our latest news and updates straight to your inbox.
										Enter your email address to subscribe:
									</p>
									<form>
										<div class="form-group">
											<input
												id="blogEmail"
												class="form-control"
												type="email"
												required=""
											/>
											<label htmlFor="blogEmail">Email address</label>
										</div>
										<div class="form-group mb-4">
											<button class="btn btn-primary" type="submit">
												Subscribe
											</button>
										</div>
									</form>
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
	query CategoryTemplateQuery {
		site {
			siteMetadata {
				title
				author
				description
			}
		}
		allStrapiPosts {
			edges {
				node {
					id
					title
					excerpt
					body
					categories {
						id
						title
					}
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
			group(field: categories___title) {
				fieldValue
			}
		}
	}
`
