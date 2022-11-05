import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

// Layout
import Header from "../layout/header/header1";
import Footer from "../layout/footer/footer1";

// Elements
import BlogAside from "../elements/blog-aside";

// Images
import bannerImg from '../../images/banner/banner2.jpg';
import blogPic1 from '../../images/blog/default/thum1.jpg';
import testiPic1 from '../../images/testimonials/pic1.jpg';
import testiPic2 from '../../images/testimonials/pic2.jpg';
import testiPic3 from '../../images/testimonials/pic3.jpg';
import { userApi } from './../../api/userApi';
import ReactHtmlParser from 'react-html-parser'

function BlogDetails(prop) {
	const [post, setPost] = useState();
	const { id } = useParams();

	const getPostById = async () => {
		console.log(id);
		const response = await userApi.getPostById(id);
		console.log(response);
		setPost(response);
	};

	useEffect(() => {
		// console.log(id);
		getPostById();
	},[])

	return (
		<>

			<Header />

			<div className="page-content">

				<div className="page-banner ovbl-dark" style={{ backgroundImage: "url(" + bannerImg + ")" }}>
					<div className="container">
						<div className="page-banner-entry">
							<h1 className="text-white">Blog Classic Sidebar</h1>
						</div>
					</div>
				</div>
				<div className="breadcrumb-row">
					<div className="container">
						<ul className="list-inline">
							<li><Link to="/">Home</Link></li>
							<li>Blog Classic Sidebar</li>
						</ul>
					</div>
				</div>

				<div className="content-block">

					<div className="section-area section-sp1">
						<div className="container">
							<div className="row">
								<div className="col-lg-3 col-xl-3 col-md-5 sticky-top">
									<BlogAside />
								</div>
								<div className="col-lg-9 col-xl-9 col-md-7">
									<div className="recent-news blog-lg">
										<div className="action-box blog-lg">
											<img src={post?.thumnailUrl} alt="" />
										</div>
										<div className="info-bx">
											<ul className="media-post">
												<li><i className="fa fa-comments-o"></i>10 Comment</li>
											</ul>
											<h3 className="post-title">{post?.title}</h3>
											<p>{ReactHtmlParser(post?.body)}</p>
											<div className="ttr-divider bg-gray"><i className="icon-dot c-square"></i></div>
											<div className="widget_tag_cloud">
												<h6>TAGS</h6>
												<div className="tagcloud">
													<Link to="#">Design</Link>
													<Link to="#">User interface</Link>
													<Link to="#">SEO</Link>
													<Link to="#">WordPress</Link>
													<Link to="#">Development</Link>
													<Link to="#">Joomla</Link>
													<Link to="#">Design</Link>
													<Link to="#">User interface</Link>
													<Link to="#">SEO</Link>
													<Link to="#">WordPress</Link>
													<Link to="#">Development</Link>
													<Link to="#">Joomla</Link>
													<Link to="#">Design</Link>
													<Link to="#">User interface</Link>
													<Link to="#">SEO</Link>
													<Link to="#">WordPress</Link>
													<Link to="#">Development</Link>
													<Link to="#">Joomla</Link>
												</div>
											</div>
											<div className="ttr-divider bg-gray"><i className="icon-dot c-square"></i></div>
										</div>
									</div>
									<div className="clear" id="comment-list">
										<div className="comments-area" id="comments">
											<h4 className="comments-title">8 Comments</h4>
											<div className="clearfix m-b20">
												<ol className="comment-list">
													<li className="comment">
														<div className="comment-body">
															<div className="comment-author vcard">
																<img className="avatar photo" src={testiPic1} alt="" />
																<cite className="fn">John Doe</cite>
																<span className="says">says:</span>
															</div>
															<div className="comment-meta">
																<Link to="#">December 02, 2019 at 10:45 am</Link>
															</div>
															<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae neqnsectetur adipiscing elit. Nam viae neqnsectetur adipiscing elit. Nam vitae neque vitae sapien malesuada aliquet. </p>
															<div className="reply">
																<Link to="#" className="comment-reply-link">Reply</Link>
															</div>
														</div>
														<ol className="children">
															<li className="comment odd parent">
																<div className="comment-body">
																	<div className="comment-author vcard">
																		<img className="avatar photo" src={testiPic2} alt="" />
																		<cite className="fn">John Doe</cite>
																		<span className="says">says:</span>
																	</div>
																	<div className="comment-meta">
																		<Link to="#">December 02, 2019 at 10:45 am</Link>
																	</div>
																	<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae neque vitae sapien malesuada aliquet. In viverra dictum justo in vehicula. Fusce et massa eu ante ornare molestie. Sed vestibulum sem felis, ac elementum ligula blandit ac.</p>
																	<div className="reply">
																		<Link to="#" className="comment-reply-link">Reply</Link>
																	</div>
																</div>
																<ol className="children">
																	<li className="comment odd parent">
																		<div className="comment-body">
																			<div className="comment-author vcard">
																				<img className="avatar photo" src={testiPic3} alt="" />
																				<cite className="fn">John Doe</cite>
																				<span className="says">says:</span>
																			</div>
																			<div className="comment-meta">
																				<Link to="#">December 02, 2019 at 10:45 am</Link>
																			</div>
																			<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae neque vitae sapien malesuada aliquet. In viverra dictum justo in vehicula. Fusce et massa eu ante ornare molestie. Sed vestibulum sem felis, ac elementum ligula blandit ac.</p>
																			<div className="reply">
																				<Link to="#" className="comment-reply-link">Reply</Link>
																			</div>
																		</div>
																	</li>
																</ol>
															</li>
														</ol>
													</li>
													<li className="comment">
														<div className="comment-body">
															<div className="comment-author vcard">
																<img className="avatar photo" src={testiPic1} alt="" />
																<cite className="fn">John Doe</cite>
																<span className="says">says:</span>
															</div>
															<div className="comment-meta">
																<Link to="#">December 02, 2019 at 10:45 am</Link>
															</div>
															<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae neque vitae sapien malesuada aliquet. In viverra dictum justo in vehicula. Fusce et massa eu ante ornare molestie. Sed vestibulum sem felis, ac elementum ligula blandit ac.</p>
															<div className="reply">
																<Link to="#" className="comment-reply-link">Reply</Link>
															</div>
														</div>
													</li>
													<li className="comment">
														<div className="comment-body">
															<div className="comment-author vcard">
																<img className="avatar photo" src={testiPic2} alt="" />
																<cite className="fn">John Doe</cite>
																<span className="says">says:</span>
															</div>
															<div className="comment-meta">
																<Link to="#">December 02, 2019 at 10:45 am</Link>
															</div>
															<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae neque vitae sapien malesuada aliquet. In viverra dictum justo in vehicula. Fusce et massa eu ante ornare molestie. Sed vestibulum sem felis, ac elementum ligula blandit ac.</p>
															<div className="reply">
																<Link to="#" className="comment-reply-link">Reply</Link>
															</div>
														</div>
													</li>
													<li className="comment">
														<div className="comment-body">
															<div className="comment-author vcard">
																<img className="avatar photo" src={testiPic3} alt="" />
																<cite className="fn">John Doe</cite>
																<span className="says">says:</span>
															</div>
															<div className="comment-meta">
																<Link to="#">December 02, 2019 at 10:45 am</Link>
															</div>
															<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam vitae neque vitae sapien malesuada aliquet. In viverra dictum justo in vehicula. Fusce et massa eu ante ornare molestie. Sed vestibulum sem felis ac elementum ligula blandit ac.</p>
															<div className="reply">
																<Link to="#" className="comment-reply-link">Reply</Link>
															</div>
														</div>
													</li>
												</ol>
												<div className="comment-respond" id="respond">
													<h4 className="comment-reply-title" id="reply-title">Leave a Reply <small> <Link style={{ display: "none" }} to="#" id="cancel-comment-reply-link" rel="nofollow">Cancel reply</Link> </small> </h4>
													<form className="comment-form">
														<p className="comment-form-author">
															<label htmlFor="author">Name <span className="required">*</span></label>
															<input type="text" value="" name="Author" placeholder="Author" id="author" />
														</p>
														<p className="comment-form-email">
															<label htmlFor="email">Email <span className="required">*</span></label>
															<input type="text" value="" placeholder="Email" name="email" id="email" />
														</p>
														<p className="comment-form-url">
															<label htmlFor="url">Website</label>
															<input type="text" value="" placeholder="Website" name="url" id="url" />
														</p>
														<p className="comment-form-comment">
															<label htmlFor="comment">Comment</label>
															<textarea rows="8" name="comment" placeholder="Comment" id="comment"></textarea>
														</p>
														<p className="form-submit">
															<input type="submit" value="Submit Comment" className="submit" name="submit" />
														</p>
													</form>
												</div>
											</div>
										</div>
									</div>
								</div>

							</div>
						</div>
					</div>

				</div>

			</div>

			<Footer />

		</>
	);
}

export default BlogDetails;