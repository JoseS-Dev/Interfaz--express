import { Router } from "express";
import { UsersControllers } from "../Controller/Users.mjs";
import { ModelsUsers } from "../Models/UserDB.mjs";
import { authMiddleware } from "../Middlewares/Auth.mjs";

const router = Router();
const userController = new UsersControllers({ModelsUsers: ModelsUsers});
export const RoutesUsers = router;

// Logear un usuario
RoutesUsers.post('/login', userController.getLogin);
// Registrar un usuario
RoutesUsers.post('/register', userController.getRegister);
// Cerrar sesión
RoutesUsers.post('/logout', userController.getLogout);
// Verificar si el usuario está logueado
RoutesUsers.get('/verify', authMiddleware, userController.getVerify);