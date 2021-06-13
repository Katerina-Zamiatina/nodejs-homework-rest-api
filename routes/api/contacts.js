const express = require("express");
const router = express.Router();

//  GET /api/contacts - getContactList
router.get("/", (req, res) => {
  res.json({  status: "success" });
});

// GET /api/contacts/:contactId - getContact
router.get("/:contactId", (req, res) => {
 
  res.json({  status: "success" });
});

// POST /api/contacts - addContact
router.post("/", (req, res) => {
  
  res.json({ status: "success" });
});

// DELETE /api/contacts/:contactId - deleteContact
router.delete("/:contactId", (req, res) => {
 
  res.json({ status: "success" });
});

// PATCH /api/contacts/:contactId - change contact
router.patch("/:contactId", (req, res) => {
  res.json({ status: "success" });
});

module.exports = router;
