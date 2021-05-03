/* dyanmic page, changes based on the slug */
import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { withRouter } from "next/router";
import Layout from "../../components/Layout";
import { singleBlog } from "../../actions/blog";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";

// client side parameter is available as router
const SingleBlog = ({ blog, router }) => {
  return (
    <React.Fragment>
      <Layout>
        <main>
          <article>
            <div className="container-fluid">
              <section>{JSON.stringify(blog)}</section>
            </div>
          </article>
        </main>
      </Layout>
    </React.Fragment>
  );
};

// executes on server
// happens before page is rendered client side
// server side parameter is available as query (it means same as router on client side)
SingleBlog.getInitialProps = ({ query }) => {
  return singleBlog(query.slug).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      // runs server side and can be seen in terminal
      console.log("data ", data);

      // can access blog as props on client side
      return { blog: data };
    }
  });
};

export default withRouter(SingleBlog);
