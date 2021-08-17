import axios from "axios";

const url = "http://localhost:9000";

export const createPost = async (post) => {
  try {
    const data = await axios.post(`${url}/createPost`, post);
    return data;
  } catch (error) {
    console.log("error while calling api API", error);
  }
};

export const readPost = async (param) => {
  try {
    let respond = await axios.get(`${url}/posts${param}`);
    return respond.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const readPostById = async (id) => {
  try {
    let respond = await axios.get(`${url}/posts/${id}`);
    return respond.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const updatePost = async (id, post) => {
  try {
    let respond = await axios.post(`${url}/updateposts/${id}`, post);
    return respond.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const deletePost = async (id) => {
  try {
    let respond = await axios.delete(`${url}/posts/${id}`);
    return respond.data;
  } catch (error) {
    console.log("error", error);
  }
};

export const uploadFile = async (data) => {
  try {
    return await axios.post(`${url}/file/upload`, data);
  } catch (error) {
    console.log("error", error);
  }
};
