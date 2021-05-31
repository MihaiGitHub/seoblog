/* dyanmic page, changes based on the slug */
import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import { singleBlog } from "../../actions/blog";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";
import renderHTML from "react-render-html";
import moment from "moment";

// client side parameter is available as router
const SingleBlog = ({ blog }) => {
  console.log("blog ", blog);

  const showBlogCategories = (blog) => {
    return blog.categories.map((c, i) => (
      <Link key={i} href={`/categories/${c.slug}`}>
        <a className="btn btn-primary mr-1 ml-1 mt-3">{c.name}</a>
      </Link>
    ));
  };

  const showBlogTags = (blog) => {
    return blog.tags.map((t, i) => (
      <Link key={i} href={`/categories/${t.slug}`}>
        <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{t.name}</a>
      </Link>
    ));
  };

  return (
    <React.Fragment>
      <Layout>
        <main>
          <article>
            <div className="container-fluid">
              <section>
                <div className="row" style={{ marginTop: "-30px" }}>
                  <img
                    src={`${API}/photo/${blog.slug}`}
                    alt={blog.title}
                    className="img img-fluid featured-image"
                  />
                </div>
              </section>
              <section>
                <p className="lead mt-3 mark">
                  Written by {blog.postedBy.name} | Published&nbsp;
                  {moment(blog.updatedAt).fromNow()}
                </p>

                <div className="pb-3">
                  {showBlogCategories(blog)}
                  {showBlogTags(blog)}
                  <hr />
                </div>
              </section>
            </div>
            <div className="container">
              <section>
                <div className="col-md-12 lead">{renderHTML(blog.mdesc)}</div>
              </section>
            </div>
            <div className="container pb-5">
              <h4 className="text-center pt-5 pb-5 h2">Related Blogs</h4>
              <hr />
              <p>show related blogs</p>
            </div>
            <div className="container pb-5">
              <p>show comments</p>
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

export default SingleBlog;
