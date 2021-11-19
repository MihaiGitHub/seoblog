/* dyanmic page, changes based on the slug */
import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import { singleCategory } from "../../actions/category";
import { API, DOMAIN, APP_NAME, FB_APP_ID } from "../../config";
import renderHTML from "react-render-html";
import moment from "moment";
import Card from "../../components/blog/Card";

// client side parameter is available as router
const Category = ({ category, blogs, query }) => {
  const head = () => (
    <Head>
      <title>
        {category.title} | {APP_NAME}
      </title>
      <meta
        name="description"
        content={`Best programming tutorials on ${category.name}`}
      />
      <link rel="canonical" href={`${DOMAIN}/categories/${query.slug}`} />
      <meta property="og:title" content={`${category.name} | ${APP_NAME}`} />
      <meta property="og:description" content={blog.mdesc} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${DOMAIN}/blogs/${query.slug}`} />
      <meta property="og:site_name" content={`${APP_NAME}`} />
      <meta property="og:image" content={`${DOMAIN}/static/images/main.jpg`} />
      <meta
        property="og:image:secure_url"
        content={`${DOMAIN}/static/images/main.jpg`}
      />
      <meta property="og:image:type" content="image/jpg" />
      <meta property="fb:app_id" content={`${FB_APP_ID}`} />
    </Head>
  );

  return (
    <React.Fragment>
      <Layout>
        {head()}
        <main>
          <div className="container-fluid text-center">
            <header>
              <div className="col-md-12 pt-3">
                <h1 className="display-4 font-weight-bold">{category.name}</h1>
                {blogs.map((b, i) => (
                  <Card key={i} blog={b} />
                ))}
              </div>
            </header>
          </div>
        </main>
      </Layout>
    </React.Fragment>
  );
};

// executes on server
// happens before page is rendered client side
// server side parameter is available as query (it means same as router on client side)
Category.getInitialProps = ({ query }) => {
  return singleCategory(query.slug).then((data) => {
    if (data.error) {
      console.log(data.error);
    } else {
      // runs server side and can be seen in terminal
      console.log("data ", data);

      // can access category as props on client side
      return { category: data.category, blogs: data.blogs, query };
    }
  });
};

export default Category;