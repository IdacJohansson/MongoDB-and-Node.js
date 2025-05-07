import express from "express";
import mongoose from "mongoose";

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/bank");

const customersSchema = new mongoose.Schema({
  name: String,
  balance: Number,
});

const Customer = mongoose.model("Customer", customersSchema);

app.get("/customers", async (req, res) => {
  const costumers = await Customer.find();
  res.json(costumers);
});

app.post("/customers", async (req, res) => {
  const newCostumer = new Customer(req.body);
  await newCostumer.save();
  res.json(newCostumer);
});

app.put("customers/:id", async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const updateCustomer = await Customer.findByIdAndUpdate(id, updateData, {
    new: true,
  });
  if (!updateCustomer) {
    return res.status(404).json({ error: "Customer not found!" });
  }
  return res.json(updateCustomer);
});

app.delete("/customers/:id", async (req, res) => {
  const { id } = req.params;
  const deleteCustomer = await Customer.findByIdAndDelete(id);
  if (!deleteCustomer) {
    return res.status(404).json({ error: "Customer not found!" });
  }
  return res.json(deleteCustomer);
});

app.listen(3000, () => console.log("Server is running on localhost://3000"));
