const formidable = require("formidable");
const slugify = require("slugify");
// strip HTML and create exerpt
const { stripHtml } = require("string-strip-html");
const _ = require("lodash");
const Blog = require("../models/blog");
const { errorHandler } = require("../helpers/dbErrorHandler");
const fs = require("fs");

exports.create = (req, res) => {
  // get form data from request
  let form = new formidable.IncomingForm();

  // if files are in form data keep the extensions
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not upload",
      });
    }

    const { title, body, categories, tags } = fields;

    if (!title || !title.length) {
      return res.status(400).json({
        error: "Title is required",
      });
    }

    if (!body || body.length < 200) {
      return res.status(400).json({
        error: "Content is too short",
      });
    }

    if (!categories || categories.length == 0) {
      return res.status(400).json({
        error: "At least category is required",
      });
    }

    if (!tags || tags.length == 0) {
      return res.status(400).json({
        error: "At least one tag is required",
      });
    }

    let blog = new Blog();

    blog.title = title;
    blog.body = body;
    blog.slug = slugify(title).toLowerCase();
    blog.mtitle = `${title} | ${process.env.APP_NAME}`;
    blog.mdesc = stripHtml(body.substring(0, 160)).result;
    blog.postedBy = req.auth._id;

    // create categories array from incoming string
    let arrayOfCategories = categories && categories.split(",");

    // create tags array from incoming string
    let arrayOfTags = tags && tags.split(",");

    if (files.photo) {
      if (files.photo.size > 10000000) {
        // > 1 Mb
        return res.status(400).json({
          error: "Image should be less then 1mb in size",
        });
      }

      // create a blog
      blog.photo.data = fs.readFileSync(files.photo.path);
      blog.photo.contentType = files.photo.type;
    }

    blog.save((err, result) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }

      // use id of the recently saved blog to find it again and update with categories
      // and return the newly updated blog with new: true
      Blog.findByIdAndUpdate(
        result._id,
        {
          $push: { categories: arrayOfCategories },
        },
        { new: true }
      ).exec((err, result) => {
        if (err) {
          return res.status(400).json({
            error: errorHandler(err),
          });
        } else {
          // do the same for tags
          Blog.findByIdAndUpdate(
            result._id,
            { $push: { tags: arrayOfTags } },
            { new: true }
          ).exec((err, result) => {
            if (err) {
              return res.status(400).json({
                error: errorHandler(err),
              });
            } else {
              res.json(result);
            }
          });
        }
      });
    });
  });
};
