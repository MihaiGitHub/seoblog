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
  return (
    <div>
      <h2>Create blog form</h2>
    </div>
  );
};

// get access to the router props
export default withRouter(CreateBlog);
