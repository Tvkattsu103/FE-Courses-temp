import { CCol, CListGroup, CListGroupItem, CRow } from '@coreui/react';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Slider1 from './slider/slider1';
import { CContainer } from '@coreui/react';

class OnlineCourses extends Component {
	render() {
		return (
			<>
				<CContainer xxl>
					<CRow>
						<CCol sm={3}>
							<div className="menu-links navbar-collapse justify-content-start"
								id="menuDropdown">
								<CListGroup className='nav navbar-nav'>
									<CListGroupItem className='ovbl-middle font-weight-bold list-homepage'>
										<span className='d-flex justify-content-between'>
											<span>Kiến thức</span>
											<span><i className="fa fa-chevron-right"></i></span>
										</span>
										<ul className="sub-menu right">
											<li>
												<Link to="/about">About</Link>
											</li>
											<li>
												<Link to="/faq">FAQ's</Link>
											</li>
											<li>
												<Link to="/portfolio">Portfolio</Link>
											</li>
											<li>
												<Link to="/error-404">404 Page</Link>
											</li>
										</ul>
									</CListGroupItem>
									<CListGroupItem className='ovbl-middle font-weight-bold list-homepage'>Tất cả khoá học</CListGroupItem>
									<CListGroupItem className='ovbl-middle font-weight-bold list-homepage'>Học lập trình web</CListGroupItem>
									<CListGroupItem className='ovbl-middle font-weight-bold list-homepage'>Học lập trình ứng dụng Android</CListGroupItem>
									<CListGroupItem className='ovbl-middle font-weight-bold list-homepage'>ABC</CListGroupItem>
									<CListGroupItem className='ovbl-middle font-weight-bold list-homepage'>ABC</CListGroupItem>
									<CListGroupItem className='ovbl-middle font-weight-bold list-homepage'>ABC</CListGroupItem>
								</CListGroup>
							</div>
						</CCol>
						<CCol sm={9}>
							<Slider1 />
						</CCol>
					</CRow>
				</CContainer>
			</>
		);
	}
}

export default OnlineCourses;