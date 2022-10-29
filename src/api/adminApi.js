import axiosApi from "./axiosApi";

export const adminApi = {
  getListRole: () => {
    const url = "/api/role/roles";
    return axiosApi.get(url);
  },
  getListUser: (name, status, role, size) => {
    const url = `/api/admin/users?name=${name}&status=${status}&role=${role}&size=${size}`;
    return axiosApi.get(url);
  },
  updateActiveUser: (params) => {
    const url = "/api/admin/users/active";
    return axiosApi.post(url, params);
  },
  updateRoleUser: (params) => {
    const url = "/api/role/update";
    return axiosApi.post(url, params);
  },
  getUserById: (id) => {
    const url = `/api/admin/users/${id}`;
    return axiosApi.get(url);
  },
  updateUserProfile: (params, id) => {
    const url = `/api/admin/users/update-user?id=${id}`;
    return axiosApi.post(url, params);
  },

  getListManager: () => {
    const url = "/api/admin/users/manager-list";
    return axiosApi.get(url);
  },
  getListExpert: () => {
    const url = "/api/admin/users/expert-list";
    return axiosApi.get(url);
  },
  getListTrainer: () => {
    const url = `/api/admin/users/trainer-list`;
    return axiosApi.get(url);
  },

  // Web Contact
  getAllContact: () => {
    const url = "/api/admin/web-contact/";
    return axiosApi.get(url);
  },
  updateStatusContact: (params, id) => {
    const url = `/api/admin/web-contact/update-status?id=${id}`;
    return axiosApi.put(url, params);
  },
  deleteContact: (id) => {
    const url = `/api/admin/web-contact/delete?id=${id}`;
    return axiosApi.delete(url);
  },
  updateContact: (params, id) => {
    const url = `/api/admin/web-contact/update?id=${id}`;
    return axiosApi.put(url, params);
  },

  // subject
  getAllSubject: (name, status) => {
    const url = `/api/subjects?status=${status}&code=${name}`;
    return axiosApi.get(url);
  },
  getSubjectDetail: (code) => {
    const url = `/api/subjects/${code}`;
    return axiosApi.get(url);
  },
  addSubject: (params) => {
    const url = `/api/subjects/create`;
    return axiosApi.post(url, params);
  },
  updateSubject: (params, id) => {
    const url = `/api/subjects/update?id=${id}`;
    return axiosApi.put(url, params);
  },
  managerUpdateSubject: (params) => {
    const url = "/api/subjects/manager-update";
    return axiosApi.put(url, params);
  },

  // class
  getAllClass: (name, status) => {
    const url = `/api/class?status=${status}&code=${name}`;
    return axiosApi.get(url);
  },
  getClassDetail: (id) => {
    const url = `/api/class/${id}`;
    return axiosApi.get(url);
  },
  createClass: (params) => {
    const url = "/api/class/create";
    return axiosApi.post(url, params);
  },
  updateClass: (params, id) => {
    const url = `/api/class/update?id=${id}`;
    return axiosApi.post(url, params);
  },

  getAllPost: (title, status) => {
    const url = `/api/post?title=${title}&status=${status}`;
    return axiosApi.get(url);
  },
  createPost: (params, image) => {
    const url = "/api/post/create";
    console.log(params);
    var formData = new FormData();
    formData.append("image", image);
    // formData.append("req", new Blob([JSON.stringify(params)], {
    //   type: "application/json"
    // }));
    return axiosApi.post(url, {
      "title": "Hành trình đi tìm ước mơ",
      "body": "Ước mơ của mọi người là vô hạn",
      "authorId": 3,
      "status": 0
    }, formData, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
  },
  updatePost: (params, id) => {
    const url = `/api/post/update?id=${id}`;
    return axiosApi.put(url, params);
  },

  getAllSlider: (status) => {
    const url = `/api/slide/manage?status=${status}`;
    return axiosApi.get(url);
  },
  createSlider: (image, validTo, status) => {
    const url = `/api/slide/create?image=${image}&validTo=${validTo}&status=${status}`;
    console.log("1", url);
    return axiosApi.post(url);
  },
  updateSlider: (params, id) => {
    const url = `/api/slide/update?id=${id}`;
    return axiosApi.put(url, params);
  },
};
