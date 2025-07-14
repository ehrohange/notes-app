import { verifyUser } from "../controllers/authController";

const router = express.router();

router.patch("/verify", verifyUser);

export default router;