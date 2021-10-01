import React, { useState, useEffect } from "react";
import Link from "next/link";
import Router from "next/router";
import { getCookie, isAuth } from "../../actions/auth";
import { list, removeBlog } from "../../actions/blog";

const BlogRead = () => {
  return (
    <React.Fragment>
      <div>update delete blogs</div>
    </React.Fragment>
  );
};

export default BlogRead;
