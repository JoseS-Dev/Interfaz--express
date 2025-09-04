import { Router } from "express";
import { UsersControllers } from "../Controller/Users.mjs";
import { ModelsUsers } from "../Models/UserDB.mjs";
import { authMiddleware } from "../Middlewares/Auth.mjs";

const router = Router();
const userController = new UsersControllers({ModelsUsers: ModelsUsers});
export const RoutesUsers = router;


// Obtener todos los usuarios
RoutesUsers.get('/', userController.getAllUsers);
// Verificar si el usuario está logueado
RoutesUsers.get('/verify', authMiddleware, userController.getVerify);
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

// Actualizar un usuario
RoutesUsers.patch('/:id_user', userController.updateUser);
// Activar un usuario
RoutesUsers.patch('/activate/:id_user', userController.activateUser);
// Desactivar un usuario
RoutesUsers.patch('/deactivate/:id_user', userController.deactivateUser);
