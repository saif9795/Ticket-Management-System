const express = require("express");
const verifyToken = require("../middlewares/authMiddleware");
const authorizedRole = require("../middlewares/authRoleMiddleware");
const { getAllBus, getTicket, purchaseTicket } = require("../controllers/user.Controller");
const router = express.Router();

router.get("/buses", verifyToken, authorizedRole("user"), getAllBus);

router.get("/tickets", verifyToken, authorizedRole("user"), getTicket);

router.post("/tickets/purchase", verifyToken, authorizedRole("user"), purchaseTicket);


module.exports = router;