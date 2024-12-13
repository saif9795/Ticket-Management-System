const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/authMiddleware");
const authorizedRole = require("../middlewares/authRoleMiddleware");
const { newBusInfo, updateBusInfo, deleteBusInfo } = require("../controllers/adminBus.Controller");
const { newTicketInfo, updateTicketInfo, deleteTicketInfo } = require("../controllers/adminTicket.Controller");



router.post("/bus", verifyToken, authorizedRole("admin"), newBusInfo);

router.put("/bus/:id", verifyToken, authorizedRole("admin"), updateBusInfo);

router.delete("/bus/:id", verifyToken, authorizedRole("admin"), deleteBusInfo);

router.post("/ticket", verifyToken, authorizedRole("admin"), newTicketInfo);

router.put("/ticket/:id", verifyToken, authorizedRole("admin"), updateTicketInfo);

router.delete("/ticket/:id", verifyToken, authorizedRole("admin"), deleteTicketInfo);

module.exports = router;