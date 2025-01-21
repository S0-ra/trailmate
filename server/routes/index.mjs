import express from "express";
import userRoutes from "./user.mjs";
import equipmentRoutes from "./equipment.mjs";
import discussionRoutes from "./discussion.mjs";
import categoryRoutes from "./category.mjs";
import reviewRoutes from "./review.mjs";
import adminRoutes from "./admin.mjs";
import postRoutes from "./post.mjs";
import commentRoutes from "./comment.mjs";
import cartRoutes from "./cart.mjs";

const router = express.Router();

router.use(userRoutes);
router.use("/equipment", equipmentRoutes);
router.use("/discussions", discussionRoutes);
router.use("/category", categoryRoutes);
router.use("/review", reviewRoutes);
router.use("/admin", adminRoutes);
router.use('/post',postRoutes)
router.use("/comment", commentRoutes);
router.use("/cart",cartRoutes)

export default router;
