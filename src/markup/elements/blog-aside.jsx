import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import blogPic1 from "../../images/blog/recent-blog/pic1.jpg";
import blogPic2 from "../../images/blog/recent-blog/pic2.jpg";
import blogPic3 from "../../images/blog/recent-blog/pic3.jpg";
import { useDispatch } from 'react-redux';
import { setSearch } from "../../redux/reducers/blog";
import { useEffect } from "react";
import { userApi } from "../../api/userApi";

function BlogAside() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [listCategory, setListCategory] = useState([]);
    const [recentBlog, setRecentBlog] = useState([]);
    const [searchBlog, setSearchBlog] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();
        dispatch(setSearch(searchBlog));
        history.push("/blog");
    }

    const getListCategory = async () => {
        try {
            const response = await userApi.getListCategoryPost();
            setListCategory(response);
        } catch (responseError) {
            console.log(responseError);
        }
    };

    const getListPost = async () => {
		try {
			const response = await userApi.getAllPost();
            const reversed = response.data.slice().reverse();
            let recent = [];
            for(let i=0; i <=2; i++){
                recent.push(reversed[i]);
            }
            setRecentBlog(recent.filter(rec=>rec!==undefined));
		} catch (responseError) {
			console.log(responseError);
		}
	};

    useEffect(() => {
        getListCategory();
        getListPost();
    }, [])

    return (
        <>
            <aside className="side-bar sticky-top">
                <div className="widget">
                    <h6 className="widget-title">Search</h6>
                    <div className="search-bx style-1">
                        <form role="search">
                            <div className="input-group">
                                <input
                                    name="text"
                                    className="form-control"
                                    placeholder="Enter your keywords..."
                                    type="text"
                                    onChange={(e) => setSearchBlog(e.target.value)}
                                />
                                <span className="input-group-btn">
                                    <button type="submit" className="btn"
                                        onClick={(e) => handleSearch(e)}
                                    >
                                        <i className="fa fa-search"></i>
                                    </button>
                                </span>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="widget widget_archive">
                    <h5 className="widget-title">List of Blogs</h5>
                    <ul>
                        <li className="active"><Link to="#">General</Link></li>
                        {
                            listCategory.map(category => {
                                return (<li><Link to="/courses-details">{category.setting_title}</Link></li>)
                            })
                        }
                    </ul>
                </div>
                <div className="widget recent-posts-entry">
                    <h6 className="widget-title">Recent Posts</h6>
                    <div className="widget-post-bx">
                        {recentBlog.map(blog => {
                            return (
                                <div className="widget-post clearfix">
                                    <div className="ttr-post-media">
                                        {" "}
                                        <img
                                            src={blog?.thumnailUrl}
                                            width="200"
                                            height="143"
                                            alt=""
                                        />{" "}
                                    </div>
                                    <div className="ttr-post-info">
                                        <div className="ttr-post-header">
                                            <h6 className="post-title">
                                                <Link to={`/blog/${blog?.id}`}>
                                                    {blog?.title}
                                                </Link>
                                            </h6>
                                        </div>
                                        <ul className="media-post">
                                            <li>
                                                <Link to={`/blog/${blog?.id}`}>
                                                    <i className="fa fa-calendar"></i>
                                                    {new Date(blog?.createDate).toLocaleDateString()}
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="widget widget_tag_cloud">
                    <h6 className="widget-title">Tags</h6>
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
            </aside>
        </>
    );
}

export default BlogAside;
