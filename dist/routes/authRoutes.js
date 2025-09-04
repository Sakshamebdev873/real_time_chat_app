import { register, login, logout, refresh, } from "../controllers/authControllers.js";
import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = Router();
router.post("/register", register);
router.post("/login", login);
router.get("/logout", authMiddleware, logout);
router.post("/refresh", refresh);
export default router;
//# sourceMappingURL=authRoutes.js.map