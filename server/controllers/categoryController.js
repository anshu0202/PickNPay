import slugify from "slugify";

import categoryModel from "../models/categoryModel.js";

export const createCategoryController = async (req, res) => {
  try {
    const { name, subCategory } = req.body;
    // console.log("body is ",req.body)
    if (!name) {
      return res
        .status(401)
        .send({ success: false, message: "Name cannot be empty" });
    }

    if (subCategory.length === 0) {
      return res
        .status(401)
        .send({ success: false, message: "SubCategory cannot be empty" });
    }

    const exist = await categoryModel.findOne({ name });
    if (exist) {
      return res.status(200).send({
        message: "This Category already exists",
        success: true,
      });
    }

    const category = await new categoryModel({
      name,
      slug: slugify(name),
      subCategory,
    }).save();

    res.status(201).send({
      success: true,
      message: "New category created successfully",
      category,
    });
  } catch (error) {
    console.log("Error while creating category ", error.message);

    res.status(500).send({
      success: false,
      message: "Error while creating category",
      error,
    });
  }
};

export const updateCategoryController = async (req, res) => {
  try {
    const { name, subCategory } = req.body;
    const { id } = req.params;
    console.log("sub cat is ", subCategory);
    // console.log("id s ",id);
    // console.log("mew name ",name)
    // id= mongoose.Types.ObjectId(id)
    const category = await categoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name), subCategory },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "category updated successfully",
      category,
    });
  } catch (error) {
    console.log("Error while updating category ", error.message);

    res.status(500).send({
      success: false,
      message: "Error while updating category",
      error,
    });
  }
};

export const categoryController = async (req, res) => {
  try {
    const category = await categoryModel.find();

    res.status(200).send({
      success: true,
      category,
      message: "All categories list",
    });
  } catch (error) {
    console.log("Error while getting all category ", error.message);

    res.status(500).send({
      message: "Error while getting all categories",
      success: false,
      error,
    });
  }
};

export const singleCategoryController = async (req, res) => {
  try {
    const { slug } = req.params;

    const category = await categoryModel.findOne(slug);

    res.status(200).send({
      success: true,
      message: "Get single category",
      category,
    });
  } catch (error) {
    console.log("Error while getting single category ", error.message);
    res.status(500).send({
      message: "Error while getting single category",
      success: false,
      error,
    });
  }
};

export const deleteCategoryController = async (req, res) => {
  try {
    const { id } = req.params;

    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.log("Error while deleting category ", error.message);

    res.status(500).send({
      success: false,
      message: "Error while deleting category",
      error,
    });
  }
};
