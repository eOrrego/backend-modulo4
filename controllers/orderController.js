const { ObjectId } = require("mongoose").Types;
const Order = require("../models/OrderModel");

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({ isDeleted: false });
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
};

const getOneCategory = async (req, res) => {
  const id = req.params.id;

  try {
    if (!ObjectId.isValid(id)) {
      return res.status(400).json("Id is not valid");
    }
    const category = await Category.findById(id).populate('products');
    if (!category) {
      return res.status(404).json("category not found");
    } else {
      res.status(200).json(category);
    }
  } catch (error) {}
};

const createCategory = async (req, res) => {
  const categorySave = { ...req.body, isActive: true };
  try {
    const category = new Category(categorySave);
    await category.save();
    return res.status(201).json(category);
  } catch (error) {
    console.log(error);
    res.status(500).json("Internal Server Error");
  }
};

const updateCategory = async (req, res) => {
    const bodyCategory = req.body;
    const id = req.params.id;
  try {
    
    if (!ObjectId.isValid(id)) {
      return res.status(400).json("ObjectId is not valid");
    }
    const updateCategory = await Category.findOneAndUpdate({_id: id},bodyCategory,{ new: true })

    if (updateCategory) {
        res.status(200).json(updateCategory);
      } else {
        res.status(404).json("Category not found");
      }
  } catch (error) {
    console.log(error);
    res.status(500).json('Internal Server Error');
  }
};

const deleteCategory = async (req, res) => {
    const id = req.params.id;
    const deleteStatus = {
        deletedAt: new Date(),
        isDeleted: true,
      }
  try {
    
    if (!ObjectId.isValid(id)) {
      return res.status(400).json("ObjectId is not valid");
    }
    const deleteCategory = await Category.findOneAndUpdate({_id: id},deleteStatus,{ new: true })

    if (deleteCategory) {
        res.status(200).json(`Category deleted = ${deleteCategory.name}`);
      } else {
        res.status(404).json("Category not found");
      }
  } catch (error) {
    console.log(error);
    res.status(500).json('Internal Server Error');
  }
};

module.exports = {
  getAllOrders,
  getOneOrder,
  createOrder,
  updateOrder,
  deleteOrder
};
