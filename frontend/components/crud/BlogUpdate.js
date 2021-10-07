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
import { QuillModules, QuillFormats } from "../../helpers/quill";

const BlogUpdate = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8">
          Create blog form
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

export default BlogUpdate;
