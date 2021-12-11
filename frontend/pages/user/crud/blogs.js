import Layout from "../../../components/Layout";
import Private from "../../../components/auth/Private";
import Link from "next/link";
import BlogsRead from "../../../components/crud/BlogsRead";

const Blog = () => {
  return (
    <Layout>
      <Private>
        <div className="row">
          <div className="col-md-12 pt-5 pb-5">
            <h2>Manage blogs</h2>
          </div>
          <div className="col-md-12">
            <BlogsRead />
          </div>
        </div>
      </Private>
    </Layout>
  );
};

export default Blog;
