import Layout from "../../../components/Layout";
import Admin from "../../../components/auth/Admin";
import Link from "next/link";
import BlogUpdate from "../../../components/crud/BlogUpdate";

const Blog = () => {
  return (
    <Layout>
      <Admin>
        <div className="row">
          <div className="col-md-12 pt-5 pb-5">
            <h2>Update blog</h2>
          </div>
          <div className="col-md-12">
            <BlogUpdate />
          </div>
        </div>
      </Admin>
    </Layout>
  );
};

export default Blog;
