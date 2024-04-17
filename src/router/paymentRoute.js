const express = require ("express");

const { createPayments } = require ("../controller/createPayments");

const router = express.Router();

router.post("/", createPayments);

module.exports = { router };