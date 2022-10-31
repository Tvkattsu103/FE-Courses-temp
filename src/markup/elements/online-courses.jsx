import React, { Component } from 'react';

// Elements
import Count from '../elements/counter/counter-sensor';

// Images
import sl1 from '../../images/sliders/1.jpg';
import sl2 from '../../images/sliders/2.jpg';
import sl3 from '../../images/sliders/3.jpg';
import 'bootstrap/dist/js/bootstrap.min.js';
import { CCarousel, CCarouselItem, CImage } from '@coreui/react';
import Slider1 from './slider/slider1';

class OnlineCourses extends Component {
	render() {
		return (
			<>
				<Slider1 />
				{/* <div className="section-area section-sp1 ovpr-dark bg-fix online-cours" style={{ backgroundImage: "url(" + bg1 + ")" }}>
					<div className="container"> */}
				{/* <CCarousel controls indicators transition='crossfade'>
					<CCarouselItem>
						<CImage className="d-block w-100" src={sl1} alt="slide 1" />
					</CCarouselItem>
					<CCarouselItem>
						<CImage className="d-block w-100" src={sl2} alt="slide 2" />
					</CCarouselItem>
					<CCarouselItem>
						<CImage className="d-block w-100" src={sl3} alt="slide 3" />
					</CCarouselItem>
				</CCarousel> */}
				{/* <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
					<ol class="carousel-indicators">
						<li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
						<li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
						<li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
					</ol>
					<div class="carousel-inner">
						<div class="carousel-item active">
							<img class="d-block w-100" src={sl1} alt="First slide"/>
						</div>
						<div class="carousel-item">
							<img class="d-block w-100" src={sl2} alt="Second slide"/>
						</div>
						<div class="carousel-item">
							<img class="d-block w-100" src={sl3} alt="Third slide"/>
						</div>
					</div>
					<a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
						<span class="carousel-control-prev-icon" aria-hidden="true"></span>
						<span class="sr-only">Previous</span>
					</a>
					<a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
						<span class="carousel-control-next-icon" aria-hidden="true"></span>
						<span class="sr-only">Next</span>
					</a>
				</div> */}
				{/* <div className="row">
							<div className="col-md-12 text-center text-white">
								<h2>Online Courses To Learn</h2>
								<h5>Own Your Feature Learning New Skills Online</h5>
								<form className="cours-search">
									<div className="input-group">
										<input type="text" className="form-control" placeholder="What do you want to learn today?"/>
										<div className="input-group-append">
											<button className="btn" type="submit">Search</button> 
										</div>
									</div>
								</form>
							</div>
						</div> */}
				{/* <div className="mw800 m-auto">
							<div className="row">
								<div className="col-md-4 col-sm-6 col-6">
									<div className="cours-search-bx m-b30">
										<div className="icon-box">
											<h3><i className="ti-user"></i><Count counter={5} />M</h3>
										</div>
										<span className="cours-search-text">Over 5 million student</span>
									</div>
								</div>
								<div className="col-md-4 col-sm-6 col-6">
									<div className="cours-search-bx m-b30">
										<div className="icon-box">
											<h3><i className="ti-layout-list-post"></i><Count counter={20} />K</h3>
										</div>
										<span className="cours-search-text">Learn Anythink Online.</span>
									</div>
								</div>
								<div className="col-md-4 col-sm-12 col-12">
									<div className="cours-search-bx m-b30">
										<div className="icon-box">
											<h3><i className="ti-book"></i><Count counter={30} />K</h3>
										</div>
										<span className="cours-search-text">30,000 Courses.</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div> */}
			</>
		);
	}
}

export default OnlineCourses;