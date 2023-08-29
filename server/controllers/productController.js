import slugify from "slugify";
import Product from "../models/productModel.js";
import categoryModel from "../models/categoryModel.js";
import braintree from "braintree";
import orderModel from "../models/orderModel.js";

import Razorpay from "razorpay";

// import formidable from "express-formidable";
import dotenv from "dotenv";

import fs from "fs";

dotenv.config();

var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

var instance = new Razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

//payment gateway api
export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (err, response) {
      if (err) {
        res.status(500).send({
          success: false,
          message: "Error while getting payment token",
          error: err,
        });
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log("Error while getting payment token ", error.message);
  }
};

export const braintreePaymentController = async (req, res) => {
  try {
    const { cart, nonce } = req.body;
    let total = 0;
    cart.map((item) => {
      total = total + item.price;
    });

    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      function (error, result) {
        if (result) {
          const order = new orderModel({
            products: cart,
            payment: result,
            buyer: req.user._id,
          }).save();

          res.json({
            ok: true,
          });
        } else {
          res.status(500).send(error);
        }
      }
    );
  } catch (error) {
    console.log("Error while making payment ", error.message);
  }
};

export const razorpayPaymentController = async (req, res) => {
  try {
    const { cart } = req.body;

    // console.log("cart is ", cart);

    const currency = "INR";
    let total = 0;
    cart.map((item) => {
      total = total + item.price - (item.price * item.offer) / 100;
    });

    // console.log("total amout is ", total);

    const order = await instance.orders.create({
      amount: total,
      currency,
    });

    // if (order !== undefined) {
    //   const ord = new orderModel({
    //     products: cart,
        
    //     payment: order,
    //     buyer: req.user._id,
    //   }).save();
    // }

    // console.log("oders is ", order);

    res.status(200).json({ orderId: order.id });
  } catch (error) {
    console.log("Error while razorpay payment ", error.message);
  }
};

export const paymentSuccessController = async (req, res) => {
  try {
    const { cart,payment } = req.body;

    // console.log("cart is ", cart);

   
    let total = 0;

    cart.forEach(async (item) => {
     

      // Find the product by ID
      const product = await  Product.findById(item.productId);

      if (product) {
        // Find the index of the size in the list array
        const sizeIndex = product.list.findIndex(
          (size) => size.size === item.size
        );

        if (sizeIndex !== -1) {
          // Decrease the quantity of the selected size
          product.list[sizeIndex].quantity -= item.quantity;
          
          // Save the updated product
          await product.save();
        }
      }
    })




    cart.map((item) => {
      total = total + item.price*item.quantity - (item.price * item.offer*item.quantity) / 100;
    });
      const order = await  new orderModel({
        products: cart,
        payment: payment,
        total:total,
        buyer: req.user._id,
      }).save();
    // console.log("oders is ", order);

    res.status(200).json({ order: order });
  } catch (error) {
    console.log("Error while order placing payment ", error.message);
  }
};






export const createProductController = async (req, res) => {
  try {
    const { name, price, description, quantity, subCategory, list } =
      req.fields;
    console.log("user ss ", req.fields);
    let parsedList;
    if (typeof list === "string") {
      parsedList = JSON.parse(list);
    }

    const { photo } = req.files;

    const { pic2 } = req.files;

    //validation

    switch (true) {
      case !name:
        console.log("hiiii 122");
        return res
          .status(500)
          .send({ error: "Name cannot be empty", success: false });

      case !price:
        console.log("hiiii 12232456");
        return res
          .status(500)
          .send({ error: "Price is required", success: false });
      case !description:
        console.log("hiiii 1223456782");
        return res
          .status(500)
          .send({ error: "Description cannot be empty", success: false });
      case !quantity:
        console.log("hiiii 122er3t4y5u");
        return res
          .status(500)
          .send({ error: "Quantity cannot be empty", success: false });
      case !subCategory:
        console.log("hiiii 12232456789");
        return res
          .status(500)
          .send({ error: "Category cannot be empty", success: false });
      case photo && photo.size > 1000000:
        console.log("s1 os large");
        return res
          .status(500)
          .send({ error: "Size of photo is too large", success: false });
      case pic2 && pic2.size > 1000000:
        console.log("s1 deefger os large");
        return res
          .status(500)
          .send({ error: "Size of photo is too large", success: false });
    }

    const product = new Product({
      ...req.fields,
      list: parsedList,
      slug: slugify(name),
    });

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    if (pic2) {
      product.pic2.data = fs.readFileSync(pic2.path);
      product.pic2.contentType = pic2.type;
    }
    await product.save();

    res.status(201).send({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.log("Error while creating product ", error.message);
    res.status(500).send({
      message: "Error while creating product",
      error,
      success: false,
    });
  }
};

export const getproductController = async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("category")
      .select("-photo -pic2")
      .limit(12)
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      message: "All products ",
      products,
    });
  } catch (error) {
    console.log("Error while getting product ", error.message);

    res.status(500).send({
      success: false,
      message: "Error while getting product",
      error,
    });
  }
};

export const getSingleProductController = async (req, res) => {
  try {
    const { slug } = req.params;

    const product = await Product.findOne({ slug })
      .select("-photo -pic2")
      .populate("category");

    res.status(200).send({
      message: "Single product",
      product,
      success: true,
    });
  } catch (error) {
    console.log("Error while getting single product ", error.message);
    res.status(500).send({
      success: true,
      message: "Error while getting single product",
      error: error.message,
    });
  }
};

export const getSingleProductIdController = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findOne({ _id: id })
      .select("-photo -pic2")
      .populate("category");

    res.status(200).send({
      message: "Single product",
      product,
      success: true,
    });
  } catch (error) {
    console.log("Error while getting single product ", error.message);
    res.status(500).send({
      success: true,
      message: "Error while getting single product",
      error: error.message,
    });
  }
};

export const productPhotoController = async (req, res) => {
  try {
    const product = await Product.findById(req.params.pid).select("photo");

    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log("Error  while getting product  photo ", error.message);
    res.status(500).send({
      message: "Error while getting product photo",
      error,
      success: false,
    });
  }
};

export const productPicController = async (req, res) => {
  try {
    const product = await Product.findById(req.params.pid).select("pic2");

    if (product.pic2.data) {
      res.set("Content-type", product.pic2.contentType);
      return res.status(200).send(product.pic2.data);
    }
  } catch (error) {
    console.log("Error  while getting product  photo 2 ", error.message);
    res.status(500).send({
      message: "Error while getting product photo 2",
      error,
      success: false,
    });
  }
};

export const deleteProductController = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.pid).select("-photo");

    res.status(200).send({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.log("Error while deleting product  ", error.message);
    res.status(500).send({
      success: false,
      message: "Error while deleting product",
      error,
    });
  }
};

export const updateProductController = async (req, res) => {
  try {
    const { name, price, description, quantity, category } = req.fields;

    const { photo } = req.files;

    //validation

    switch (true) {
      case !name:
        return res
          .status(500)
          .send({ error: "Name cannot be empty", success: false });

      case !price:
        return res
          .status(500)
          .send({ error: "Price is required", success: false });
      case !description:
        return res
          .status(500)
          .send({ error: "Description cannot be empty", success: false });
      case !quantity:
        return res
          .status(500)
          .send({ error: "Quantity cannot be empty", success: false });
      case !category:
        return res
          .status(500)
          .send({ error: "Category cannot be empty", success: false });
      case photo && photo.size > 1000000:
        return res
          .status(500)
          .send({ error: "Size of photo is too large", success: false });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.pid,
      {
        ...req.fields,
        slug: slugify(name),
      },
      { new: true }
    );

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }
    await product.save();

    res.status(201).send({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.log("Error while updating product ", error.message);
    res.status(500).send({
      message: "Error while updating product",
      error,
      success: false,
    });
  }
};

export const productFilterController = async (req, res) => {
  try {
    const { checked, radio } = req.body;

    let args = {};
    if (checked.length > 0) {
      args.category = checked;
    }

    if (radio.length) args.price = { $gte: radio[0], $lte: radio[1] };

    const products = await Product.find(args);
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log("Error while filtering products ", error.message);
    res.status(400).send({
      error,
      success: false,
      message: "Error while filtering products",
    });
  }
};

export const productCountController = async (req, res) => {
  try {
    const total = await Product.find({}).estimatedDocumentCount();
    res.status(200).send({
      success: true,
      message: "Paginated products",
      total,
    });
  } catch (error) {
    console.log("Error while geeting product count ", error.message);
    return res.status(500).send({
      success: false,
      message: "Error while pagination",
      error,
    });
  }
};

export const productListController = async (req, res) => {
  try {
    const perPage = 12;
    const page = req.params.page ? req.params.page : 1;

    const products = await Product.find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log("Error while getting product list ", error.message);
    res.status(400).send({
      success: false,
      message: "Error while getting product list",
      error,
    });
  }
};

export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const products = await Product.find({
      $or: [
        {
          name: { $regex: keyword, $options: "i" },
        },
        {
          description: { $regex: keyword, $options: "i" },
        },
      ],
    }).select("-photo");
    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log("Error while searching products ", error.message);
    res.status(400).send({
      error,
      success: true,
      message: "Error while searching products",
    });
  }
};

export const relatedProductController = async (req, res) => {
  try {
    const { pid, cid } = req.params;

    const products = await Product.find({
      category: cid,
      _id: { $ne: pid },
    })
      .select("-photo")
      .limit(3)
      .populate("category");

    return res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log("Error while getting similar products ", error.message);
    res.status(400).send({
      success: false,
      error,
    });
  }
};

export const productCategoryController = async (req, res) => {
  try {
    const slug = req.params.slug;
    const category = await categoryModel.findOne({ slug });
    const products = await Product.find({ category }).populate("category");
    return res.status(200).send({
      success: true,
      products,
      category,
    });
  } catch (error) {
    console.log("Error while getting category wise products ", error.message);
    res.status(400).send({
      error,
      success: false,
    });
  }
};
