import { Router } from "express";
import { UsersControllers } from "../Controller/Users.mjs";
import { ModelsUsers } from "../Models/UserDB.mjs";
import { authMiddleware } from "../Middlewares/Auth.mjs";

const router = Router();
const userController = new UsersControllers({ModelsUsers: ModelsUsers});
export const RoutesUsers = router;


// Obtener todos los usuarios
RoutesUsers.get('/', userController.getAllUsers);
// Obtener a un usuario por su email
RoutesUsers.get('/Email/:email_user', userController.getUserByEmail);
// Obtener a un usuario por su username
RoutesUsers.get('/Username/:username', userController.getUserByUsername);
// Obtener a un usuario por su rol
RoutesUsers.get('/Role/:role_user', userController.getUserByRole);
// Obtener a un usuario por su ID
RoutesUsers.get('/:id_user', userController.getUserByID);


// Logear un usuario
RoutesUsers.post('/login', userController.getLogin);
// Registrar un usuario
RoutesUsers.post('/register', userController.getRegister);
// Cerrar sesión
RoutesUsers.post('/logout', userController.getLogout);
// Verificar si el usuario está logueado
RoutesUsers.post('/verify', authMiddleware, userController.getVerify);

// Actualizar un usuario
RoutesUsers.patch('/:id_user', userController.updateUser);
