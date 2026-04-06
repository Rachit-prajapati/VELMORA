const express = require("express");
const {generateInvoice}=require("../Controller/InvoiceController");
const { verifyBuyer } = require("../Verification");
const router = express.Router();

router.get("/:_id",verifyBuyer,generateInvoice);

module.exports = {router};
