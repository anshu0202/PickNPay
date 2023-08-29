import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        _id: false, // Disabling automatic _id creation for subdocuments
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Products" }, // Reference the Products collection
        quantity: Number,
        price: Number,
        offer: Number,
        size: String,
      },
    ],
    payment: {},
    buyer: {
      type: mongoose.ObjectId,
      ref: "users",
    },
    total:{
        type:Number,
        default:0
    },
    status: {
      type: String,
      default: "Not Process",
      enum: ["Not Process", "Processing", "Shipped", "Delivered", "Canceled"],
    },
  },
  { timestamps: true }
);

const orderModel = mongoose.model("Order", orderSchema);

export default orderModel;
