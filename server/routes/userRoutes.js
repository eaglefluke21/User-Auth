import { Router } from "express";

import { userRegister } from "../controllers/userController.js";
import { adminRegister } from "../controllers/userController.js";
import { userLogin } from "../controllers/userController.js";
import { checkenv } from "../controllers/userController.js";
import { checkreq } from "../controllers/userController.js";
import { cryptoEncryption } from "../controllers/userController.js";
import RoleCheck from "../middleware/RoleCheck.js";
import { forgotPassword } from "../controllers/userController.js";
import { resetPassword } from "../controllers/userController.js";
import authenticateJWT from "../middleware/authenticateJWT.js";
import { checkrole } from "../controllers/userController.js";
import { checklogstatus } from "../controllers/userController.js";
import { userlogout } from "../controllers/userController.js";

function userRoutes () {
    const router = Router();
    router.get('/env', RoleCheck('user'),checkenv);

    router.get('/admin', RoleCheck('admin'),checkreq);


    router.get('/getEncryptkey',cryptoEncryption);

    router.post('/register',userRegister);

    router.post('/adminregister',adminRegister);

    router.post('/login',userLogin);

    router.post('/forgot-password',forgotPassword);

    router.post('/reset-password/:token', resetPassword);

    router.get('/api/protected', authenticateJWT,checkrole);
    
    router.get('/checkstatus', checklogstatus);

    router.post('/logout', userlogout);

    return router;
};

export default userRoutes;