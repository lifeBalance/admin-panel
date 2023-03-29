import { Router } from "express";
import { Register } from "./controllers/auth";

const router = Router()

router.post('/register', Register)

export default router