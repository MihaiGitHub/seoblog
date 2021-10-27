import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
// import a component dynamically so that SSR is false
import dynamic from "next/dynamic";
import { withRouter } from "next/router";
import { getCookie, isAuth } from "../../actions/auth";
import { getCategories } from "../../actions/category";
import { getTags } from "../../actions/tag";
import { singleBlog, updateBlog } from "../../actions/blog";

// import this component dynamically and SSR will be false
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
//import "../../node_modules/react-quill/dist/quill.snow.css";
import { QuillModules, QuillFormats } from "../../helpers/quill";

const BlogUpdate = ({ router }) => {
  const [body, setBody] = useState("");
  const [values, setValues] = useState({
    title: "",
    error: "",
    success: "",
    formData: "",
    title: "",
    body: "",
  });

  const { error, success, formData, title } = values;

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
    initBlog();
  }, [router]); // anytime the router changes (page refreshes) run this

  const initBlog = (slug) => {
    if (router.query.slug) {
      singleBlog(router.query.slug).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setValues({ ...values, title: data.title });
          setBody(data.body);
        }
      });
    }
  };

  const handleChange = (name) => (e) => {
    const value = name === "photo" ? e.target.files[0] : e.target.value;

    // populate formData with the name and value, send all data from form as form data to backend
    formData.set(name, value);

    // populate the state
    setValues({ ...values, [name]: value, formData, error: "" });
  };

  const handleBody = (e) => {
    setBlog(e);
    formData.set("body", e);
  };

  const editBlog = () => {
    console.log("update blog");
  };

  const updateBlogForm = () => {
    return (
      <form onSubmit={editBlog}>
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
            modules={QuillModules}
            formats={QuillFormats}
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

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8">
          {updateBlogForm()}
          <div className="pt-3">show success and error message</div>
        </div>
        <div className="col-md-4">
          <div>
            <div className="form-group pb-b">
              <h5>Featured Image</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(BlogUpdate);
