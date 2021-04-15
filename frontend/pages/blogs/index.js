import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import { listBlogsWithCategoriesAndTags } from "../../actions/blog";
import Card from "../../components/blog/Card";

// props accessible from getInitialProps
const Blogs = ({ blogs, categories, tags, size }) => {
  const showAllBlogs = () => {
    return blogs.map((blog, i) => {
      return (
        <article key={i}>
          <Card blog={blog} />
          <hr />
        </article>
      );
    });
  };

  const showAllCategories = () => {
    return categories.map((c, i) => (
      <Link href={`/categories/${c.slug}`} key={i}>
        <a className="btn btn-primary mr-1 ml-1 mt-3">{c.name}</a>
      </Link>
    ));
  };

  const showAllTags = () => {
    return tags.map((t, i) => (
      <Link href={`/categories/${t.slug}`} key={i}>
        <a className="btn btn-outline-primary mr-1 ml-1 mt-3">{t.name}</a>
      </Link>
    ));
  };

  return (
    <Layout>
      <main>
        <div className="container-fluid">
          <header>
            <div className="col-md-12 pt-3">
              <h1 className="display-4 font-weight-bold text-center">
                Programming blogs and tutorials
              </h1>
            </div>
            <section>
              <div className="pb-5 text-center">
                {showAllCategories()}
                <br />
                {showAllTags()}
              </div>
            </section>
          </header>
        </div>
        <div className="container-fluid">
          <div className="row">
            {/* rendered server side */}
            <div className="col-md-12">{showAllBlogs()}</div>
          </div>
        </div>
      </main>
    </Layout>
  );
};

// method executed server side
// server render the page (can only be used on pages, not in components)
Blogs.getInitialProps = () => {
  // make request to backend, get data, and return data
  return listBlogsWithCategoriesAndTags().then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      // if have nothing to return, return {}
      return {
        blogs: data.blogs,
        categories: data.categories,
        tags: data.tags,
        size: data.size,
      };
    }
  });
};

export default Blogs;
