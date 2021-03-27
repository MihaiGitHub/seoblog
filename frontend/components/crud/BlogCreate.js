import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
// import a component dynamically so that SSR is false
import dynamic from "next/dynamic";
import { withRouter } from "next/router";
import { getCookie, isAuth } from "../../actions/auth";
import { getCategories } from "../../actions/category";
import { getTags } from "../../actions/tag";
import { createBlog } from "../../actions/blog";

// import this component dynamically and SSR will be false
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
//import "../../node_modules/react-quill/dist/quill.snow.css";

const CreateBlog = () => {
  const [body, setBody] = useState({});
  const [values, setValues] = useState({
    error: "",
    sizeError: "",
    success: "",
    formData: "",
    title: "",
    hidePublishButton: false,
  });

  const {
    error,
    sizeError,
    success,
    formData,
    title,
    hidePublishButton,
  } = values;

  const publishBlog = (e) => {
    e.preventDefault();
  };

  const handleChange = (name) => (e) => {};

  const handleBody = (name) => (e) => {};

  const createBlogForm = () => {
    return (
      <form onSubmit={publishBlog}>
        <div className="form-group">
          <label className="text-muted">Title</label>
          <input
            type="text"
            onChange={handleChange("title")}
            className="form-control"
            value={title}
          />
        </div>
        <div className="form-group">
          <ReactQuill
            value={body}
            placeholder="Write something amazing"
            onChange={handleBody}
          />
        </div>
        <div>
          <button type="submit" className="btn btn-primary">
            Publish
          </button>
        </div>
      </form>
    );
  };

  return <div>{createBlogForm()}</div>;
};

// get access to the router props
export default withRouter(CreateBlog);
