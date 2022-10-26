import {
    CButton,
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CFormInput,
    CFormLabel,
    CFormSelect,
    CImage,
    CRow,
} from "@coreui/react";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useHistory, useLocation } from "react-router-dom";
import { adminApi } from "../../../api/adminApi";
import {
    AppFooter,
    AppHeader,
    AppSidebar,
} from "../../components";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import Cookies from "js-cookie";

function PostDetail(props) {
    const [post, setPost] = useState();
    const [title, setTitle] = useState();
    const [category, setCategory] = useState();
    const [status, setStatus] = useState();
    const [author, setAuthor] = useState();
    const [content, setContent] = useState();
    const [thumbnailUrl, setThumbnailUrl] = useState();
    const [hasUpdate, setHasUpdate] = useState(false);
    const [preview, setPreview] = React.useState();
    const location = useLocation();
    const history = useHistory();
    const id = location.pathname.substring(
        "/admin/posts/".length,
        location.pathname.length
    );
    const type = id !== "create" ? 1 : 0;
    const img = "https://i.fbcd.co/products/resized/resized-750-500/563d0201e4359c2e890569e254ea14790eb370b71d08b6de5052511cc0352313.jpg";

    const getPostById = async () => {
        const response = await adminApi.getAllPost();
        setPost(response?.filter((item) => item?.id == id)[0]);
    };

    const handleUpdatePost = async () => {
        console.log(JSON.parse(Cookies.get("user")).id);
        try {
            const params = {
                title: title,
                category: category,
                status: status,
                author: author,
                authorId: JSON.parse(Cookies.get("user")).id,
                thumnailUrl: thumbnailUrl,
                body: content
            };

            const response =
                type === 1
                    ? await adminApi.updatePost(params, id)
                    : await adminApi.createPost(params);
            // setHasUpdate(!hasUpdate);
            toast.success(response?.message, {
                duration: 2000,
            });
            history.push("/admin/posts");
        } catch (responseError) {
            toast.error(responseError, {
                duration: 2000,
            });
        }
    };

    const handleThumbnail = (e) => {
        const fileDropped = e.target.files[0];
        setThumbnailUrl(fileDropped)
        const previewUrl = URL.createObjectURL(fileDropped);
        setPreview(previewUrl);
    }

    useEffect(() => {
        getPostById();
    }, [hasUpdate]);

    const optionStatus = [
        { status: 0, label: "Draft" },
        { status: 1, label: "Submitted" },
        { status: 2, label: "Published" },
        { status: 3, label: "Achieved" },
        { status: 4, label: "Rejected" },
    ];

    return (
        <div>
            <AppSidebar />
            <Toaster position="top-center" reverseOrder={false} />
            <div className="wrapper d-flex flex-column min-vh-100 bg-light">
                <AppHeader />
                <div className="body flex-grow-1 px-3">
                    <CCol xs={12}>
                        <CCard className="mb-4">
                            <CCardHeader>
                                <strong>Post Details</strong>
                            </CCardHeader>
                            <CCardBody>
                                <div className="mb-3">
                                    <CFormLabel htmlFor="exampleFormControlInput1">
                                        Post title
                                    </CFormLabel>
                                    <CFormInput
                                        type="title"
                                        id="exampleFormControlInput1"
                                        placeholder="Post title"
                                        defaultValue={post?.title}
                                        onChange={(e) =>
                                            setTitle(e.target.value)
                                        }
                                    />
                                </div>
                                <CRow className="g-3 mb-3">
                                    <CCol sm={8}>
                                        <div className="mb-3">
                                            <CFormLabel htmlFor="exampleFormControlInput1">
                                                Category
                                            </CFormLabel>
                                            <CFormSelect id="autoSizingSelect">
                                                <option>All categories</option>
                                                <option value="1">One</option>
                                                <option value="2">Two</option>
                                                <option value="3">Three</option>
                                            </CFormSelect>
                                        </div>
                                        <div className="mb-3">
                                            <CFormLabel htmlFor="exampleFormControlInput1">
                                                Status
                                            </CFormLabel>
                                            <CFormSelect
                                                id="autoSizingSelect"
                                                onChange={(e) => setStatus(e.target.value)}
                                            >
                                                {optionStatus?.map((item, index) => {
                                                    if (type === 1) {
                                                        return post?.status ===
                                                            item?.status ? (
                                                            <option
                                                                key={index}
                                                                value={item?.status}
                                                                selected
                                                            >
                                                                {item?.label}
                                                            </option>
                                                        ) : (
                                                            <option
                                                                key={index}
                                                                value={item?.status}
                                                            >
                                                                {item?.label}
                                                            </option>
                                                        );
                                                    } else {
                                                        return (
                                                            <option
                                                                key={index}
                                                                value={item?.status}
                                                            >
                                                                {item?.label}
                                                            </option>
                                                        );
                                                    }
                                                })}
                                                {/* <option>All statuses</option>
                                                <option value="0">Draft</option>
                                                <option value="1">Submitted</option>
                                                <option value="2">Published</option>
                                                <option value="3">Achieved</option>
                                                <option value="4">Rejected</option> */}
                                            </CFormSelect>
                                        </div>
                                        <div className="mb-3">
                                            <CFormLabel htmlFor="exampleFormControlInput1">
                                                Author
                                            </CFormLabel>
                                            <CFormInput
                                                type="author"
                                                id="exampleFormControlInput1"
                                                placeholder="Author full name (author)"
                                                defaultValue={post?.author.fullname}
                                                disabled
                                            />
                                        </div>
                                    </CCol>
                                    <CCol sm={4}>
                                        <CFormLabel htmlFor="exampleFormControlInput1">
                                            Change thumbnail
                                        </CFormLabel>
                                        <CImage
                                            rounded
                                            thumbnail
                                            src={!preview ? post?.thumnailUrl ? post?.thumnailUrl : img : preview }
                                            width={400}
                                            // height={300}
                                            style={{maxHeight: '240px'}}
                                            onLoad={() => URL.revokeObjectURL(preview)}
                                        />
                                        <CFormInput
                                            className="form-control"
                                            type="file"
                                            accept=".jpg, .png, .jpeg"
                                            onChange={(e) => handleThumbnail(e)}
                                        />
                                    </CCol>
                                </CRow>
                                <div className="mb-3">
                                    <CFormLabel htmlFor="exampleFormControlInput1">
                                        Post content
                                    </CFormLabel>
                                    <CKEditor
                                        editor={ClassicEditor}
                                        data={post?.body}
                                        onChange={(event, editor) => {
                                            const data = editor.getData();
                                            setContent(data);
                                        }}
                                    />
                                </div>
                                <div className="mb-3">
                                    <CButton
                                        onClick={() => handleUpdatePost()}
                                    >
                                        Save
                                    </CButton>
                                </div>
                            </CCardBody>
                        </CCard>
                    </CCol>
                </div>
                <AppFooter />
            </div>
        </div>
    );
}

export default PostDetail;
