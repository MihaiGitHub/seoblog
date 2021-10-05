import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { getCookie, isAuth } from "../../actions/auth";
import { list, removeBlog } from "../../actions/blog";

const BlogRead = () => {
  const [blogs, setBlogs] = useState([]);
  const [message, setMessage] = useState("");

  const token = getCookie("token");

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = () => {
    list().then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setBlogs(data);
      }
    });
  };

  return (
    <React.Fragment>
      <div>update delete blogs</div>
    </React.Fragment>
  );
};

export default BlogRead;
