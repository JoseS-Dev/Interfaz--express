import { Router } from "express";
import { UsersControllers } from "../Controller/Users.mjs";
import { ModelsUsers } from "../Models/UserDB.mjs";

const router = Router();
const userController = new UsersControllers({UserModels: ModelsUsers});
export const RoutesUsers = router;

// Logear un usuario
router.post('/login/:id', userController.getLogin);
// Registrar un usuario
router.post('/register', userController.getRegister);