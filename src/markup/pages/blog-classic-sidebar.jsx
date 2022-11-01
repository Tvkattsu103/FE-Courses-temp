import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Layout
import Header from "../layout/header/header1";
import Footer from "../layout/footer/footer1";

// Elements
import BlogAside from "../elements/blog-aside";

// Images
import bannerImg from '../../images/banner/banner1.jpg';
import { CCard, CRow, CCol, CCardImage, CCardBody, CCardTitle, CCardText } from '@coreui/react';
import { CButton } from '@coreui/react';
import { userApi } from './../../api/userApi';
import ReactHtmlParser from 'react-html-parser'
import { useSelector } from 'react-redux';

const BlogClassicSidebar = () => {
	const [listPost, setListPost] = useState([]);
	const searchBlog = useSelector((state) => state.blogReducers.search);

	const getListPost = async () => {
		console.log(searchBlog);
		try {
			const response = await userApi.getAllPost();
			setListPost(response.filter(res => res.title.toLowerCase().includes(searchBlog.toLowerCase())));
		} catch (responseError) {
			console.log(responseError);
		}
	};

	useEffect(() => {
		getListPost();
	}, [searchBlog]);

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
									<CRow className="g-0">
										{
											listPost.map((item) => (
												<>
													<CCol md={3}>
														<CCardImage src={item?.thumnailUrl} />
													</CCol>
													<CCol md={9}>
														<CCardTitle><Link to={`/blog/${item?.id}`}>{item?.title}</Link></CCardTitle>
														<CCardText>
															<ul className="media-post">
																<li><i className="fa fa-calendar"></i>{" " + new Date(item?.createDate).toLocaleDateString()}</li>
																<li><i className="fa fa-user"></i> By {item?.author.fullname}</li>
															</ul>
														</CCardText>
														<CCardText>
															{ReactHtmlParser(item?.body)}
														</CCardText>
														<CButton><Link to={`/blog/${item?.id}`}>Read more</Link></CButton>
													</CCol>
													<hr />
												</>
											))
										}
									</CRow>
									{
										listPost.length !== 0
											? (<><div className="pagination-bx rounded-sm gray m-b30 clearfix">
												<ul className="pagination">
													<li className="previous"><Link to="#"><i className="ti-arrow-left"></i> Prev</Link></li>
													<li className="active"><Link to="#">1</Link></li>
													<li><Link to="#">2</Link></li>
													<li><Link to="#">3</Link></li>
													<li className="next"><Link to="#">Next <i className="ti-arrow-right"></i></Link></li>
												</ul>
											</div></>)
											: (<h5 style={{marginLeft: '50px'}}>Can't find any blog</h5>)
									}

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

export default BlogClassicSidebar;