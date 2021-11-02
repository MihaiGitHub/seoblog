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
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);

  const [checked, setChecked] = useState([]); // categories
  const [checkedTag, setCheckedTag] = useState([]); // tags
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
    initCategories();
    initTags();
  }, [router]); // anytime the router changes (page refreshes) run this

  const initBlog = (slug) => {
    if (router.query.slug) {
      singleBlog(router.query.slug).then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          setValues({ ...values, title: data.title });
          setBody(data.body);
          setCategoriesArray(data.categories);
          setTagsArray(data.tags);
        }
      });
    }
  };

  const setCategoriesArray = (blogCategories) => {
    let ca = [];

    blogCategories.map((c, i) => {
      ca.push(c._id);
    });

    setChecked(ca);
  };

  const setTagsArray = (blogTags) => {
    let ta = [];

    blogTags.map((t, i) => {
      ta.push(t._id);
    });

    setCheckedTag(ta);
  };

  const initCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setCategories(data);
      }
    });
  };

  const initTags = () => {
    getTags().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setTags(data);
      }
    });
  };

  const handleToggle = (c) => () => {
    setValues({ ...values, error: "" });

    // return the first index or -1 if it does not find the category
    const clickedCategory = checked.indexOf(c);

    // whatever is in state store in this variable
    const all = [...checked];

    // if the category id doesn't exist in the state push to this variable
    if (clickedCategory == -1) {
      all.push(c);
    } else {
      // if its already there then remove the category id from the array
      all.splice(clickedCategory, 1);
    }

    setChecked(all);

    // update form data for sending to backend
    formData.set("categories", all);
  };

  const handleTagsToggle = (t) => () => {
    setValues({ ...values, error: "" });

    // return the first index or -1 if it does not find the category
    const clickedTag = checkedTag.indexOf(t);

    // whatever is in state store in this variable
    const all = [...checked];

    // if the category id doesn't exist in the state push to this variable
    if (clickedTag == -1) {
      all.push(t);
    } else {
      // if its already there then remove the category id from the array
      all.splice(clickedTag, 1);
    }

    setCheckedTag(all);

    // update form data for sending to backend
    formData.set("tags", all);
  };

  const findOutCategory = (c) => {
    const result = checked.indexOf(c); // if it doesn't exist it will return -1, else true

    if (result !== -1) {
      return true;
    } else {
      return false;
    }
  };

  const findOutTag = (t) => {
    const result = checkedTag.indexOf(t); // if it doesn't exist it will return -1, else true

    if (result !== -1) {
      return true;
    } else {
      return false;
    }
  };

  const showCategories = () => {
    return (
      categories &&
      categories.map((c, i) => (
        <li key={i} className="list-unstyled">
          <input
            onChange={handleToggle(c._id)}
            checked={findOutCategory(c._id)}
            type="checkbox"
            className="mr-2"
          />
          <label className="form-check-label">{c.name}</label>
        </li>
      ))
    );
  };

  const showTags = () => {
    return (
      tags &&
      tags.map((t, i) => (
        <li key={i} className="list-unstyled">
          <input
            onChange={handleTagsToggle(t._id)}
            checked={findOutTag(t._id)}
            type="checkbox"
            className="mr-2"
          />
          <label className="form-check-label">{t.name}</label>
        </li>
      ))
    );
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
          <div className="pt-3">
            <p>show success and error message</p>
            <hr />
          </div>
        </div>
        <div className="col-md-4">
          <div>
            <div className="form-group pb-b">
              <h5>Featured Image</h5>
              <hr />
              <small className="text-muted">Max size: 1mb</small>
              <label className="btn btn-outline-info">
                Upload featured image
                <input
                  onChange={handleChange("photo")}
                  type="file"
                  accept="image/*"
                  hidden
                />
              </label>
            </div>
          </div>
          <div>
            <h5>Categories</h5>
            <hr />
            <ul style={{ maxHeight: "200px", overflowY: "scroll" }}>
              {showCategories()}
            </ul>
          </div>
          <div>
            <h5>Tags</h5>
            <hr />
            <ul style={{ maxHeight: "200px", overflowY: "scroll" }}>
              {showTags()}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(BlogUpdate);
