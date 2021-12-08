import fetch from "isomorphic-fetch";
import { API } from "../config";
import queryString from "query-string";
import { isAuth } from "./auth";

export const createBlog = (blog, token) => {
  let createBlogEndpoint;

  if (isAuth() && isAuth().role === 1) {
    createBlogEndpoint = `${API}/blog`;
  } else if (isAuth() && isAuth().role === 0) {
    createBlogEndpoint = `${API}/user/blog`;
  }

  return fetch(`${createBlogEndpoint}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    }, // sending as form data, not json
    body: blog,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const listBlogsWithCategoriesAndTags = (skip, limit) => {
  const data = {
    limit,
    skip,
  };

  return fetch(`${API}/blogs-categories-tags`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const singleBlog = (slug) => {
  return fetch(`${API}/blog/${slug}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const listRelated = (blog) => {
  return fetch(`${API}/blogs/related`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blog),
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const list = () => {
  return fetch(`${API}/blogs`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const removeBlog = (slug, token) => {
  return fetch(`${API}/blog/${slug}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateBlog = (blog, token, slug) => {
  return fetch(`${API}/blog/${slug}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    }, // sending as form data, not json
    body: blog,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const listSearch = (params) => {
  let query = queryString.stringify(params); // ?limit=100&pagination=10

  return fetch(`${API}/blogs/search?${query}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};
