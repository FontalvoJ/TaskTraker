import { Router } from "express";
import * as authCtrl from '../controllers/auth.controllers';

const router = Router();

// Route to sign up a new user
router.post('/signup', authCtrl.signUp);

// Route to sign up a new admin
router.post('/signupAdmin', authCtrl.signUpAdmin);

// Route to sign up a new teacher
router.post('/signupTeacher', authCtrl.signUpTeacher);

// Route to sign up a new student
router.post('/signupStudent', authCtrl.signUpStudent);

// Route to sign in
router.post('/signin', authCtrl.signIn);

export default router;
