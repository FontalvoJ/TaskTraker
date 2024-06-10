import Institution from "../models/Institution";
import Teacher from "../models/Teacher";
import Admin from "../models/adminOnly";
import Student from "../models/Student";
import Role from "../models/Role";
import jwt from "jsonwebtoken";
import config from "../config";
const bcrypt = require("bcryptjs");

export const signUpAdmin = async (req, res) => {
  try {
    const { name, email, password, roles } = req.body;

    const encryptedPassword = await Admin.encryptPassword(password);

    const newAdmin = new Admin({ name, email, password: encryptedPassword,roles});

    if (roles) {
      const foundRoles = await Role.find({
        name: { $in: roles,},
      });
      newAdmin.roles = foundRoles.map((role) => role._id);
    } else {
      const role = await Role.findOne({ name: "admin"});
      newAdmin.roles = [role._id];
    }

    const savedAdmin = await newAdmin.save();

    res.status(201).json({
      message: "Create Admind Success",
    });
  } catch (error) {
    console.error("Error en el registro de usuario:", error);
    res.status(500).json({
      error: "Error en el registro de usuario",
    });
  }
};

export const signUp = async (req, res) => {
  try {
    const { name, email, password, roles } = req.body;

    const encryptedPassword = await Institution.encryptPassword(password);

    // Crear un nuevo usuario con la contraseña encriptada
    const newInstitution = new Institution({
      name,
      email,
      password: encryptedPassword,
    });

    // Asignar roles
    if (roles) {
      const foundRoles = await Role.find({
        name: {
          $in: roles,
        },
      });
      newInstitution.roles = foundRoles.map((role) => role._id);
    } else {
      // Si no se especifican roles, asignar el rol "institution"
      const role = await Role.findOne({
        name: "institution",
      });
      newInstitution.roles = [role._id];
    }

    // Guardar el nuevo usuario en la base de datos
    const savedInstitution = await newInstitution.save();


    // Responder con el token
    res.status(201).json({
      message: "Create Institution Success",
    });
  } catch (error) {
    console.error("Error en el registro de usuario:", error);
    res.status(500).json({
      error: "Error en el registro de usuario",
    });
  }
};

export const signUpTeacher = async (req, res) => {
  try {
    const { name, email, password, asignature, id_institution, roles } =
      req.body;

    const encryptedPassword = await Teacher.encryptPassword(password);

    const newTeacher = new Teacher({
      name,
      asignature,
      email,
      password: encryptedPassword,
      id_institution,
    });

    if (roles) {
      const foundRoles = await Role.find({
        name: {
          $in: roles,
        },
      });
      newTeacher.roles = foundRoles.map((role) => role._id);
    } else {
      const role = await Role.findOne({
        name: "teacher",
      });
      newTeacher.roles = [role._id];
    }

    const savedTeacher = await newTeacher.save();



    res.status(201).json({
      message: "Create Teacher Success",
    });
  } catch (error) {
    console.error("Error en el registro de profesor:", error);
    res.status(500).json({
      error: "Error en el registro de profesor",
    });
  }
};

export const signUpStudent = async (req, res) => {
  try {
    const { name, email, password, id_institution, roles } = req.body;

    const encryptedPassword = await Student.encryptPassword(password);

    const newStudent = new Student({
      name,
      email,
      password: encryptedPassword,
      id_institution,
    });

    if (roles) {
      const foundRoles = await Role.find({
        name: {
          $in: roles,
        },
      });
      newStudent.roles = foundRoles.map((role) => role._id);
    } else {
      const role = await Role.findOne({
        name: "student",
      });
      newStudent.roles = [role._id];
    }

    const savedStudent = await newStudent.save();

    res.status(201).json({
      message: "Create Student Success",
    });
  } catch (error) {
    console.log("Error en el registro del estudiante:", error);
    res.status(500).json({
      error: "Error en el registro del estudiante",
    });
  }
};

export const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validación de entrada
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // Buscar usuario por email en todas las colecciones
    let user = await Institution.findOne({ email }).populate("roles")
      || await Teacher.findOne({ email }).populate("roles")
      || await Student.findOne({ email }).populate("roles")
      || await Admin.findOne({ email }).populate("roles");

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const matchPassword = await bcrypt.compare(password, user.password);

    if (!matchPassword) {
      return res.status(401).json({
        token: null,
        message: "Invalid password",
      });
    }

    // Verificar que el usuario tenga roles asignados
    if (!user.roles || user.roles.length === 0) {
      return res.status(400).json({
        message: "User roles not found",
      });
    }

    // Obtener el rol del usuario
    let role = null;

    if (user instanceof Institution) {
      role = "institution";
    } else if (user instanceof Teacher) {
      role = "teacher";
    } else if (user instanceof Student) {
      role = "student";
    } else if (user instanceof Admin) {
      role = "admin";
    }

    // Generar el token JWT
    const token = jwt.sign(
      {
        id: user._id,
        role: role,
      },
      config.SECRET,
      {
        expiresIn: '24h', // 24 horas de expiración
      }
    );

    res.json({
      token,
      role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export default {
  signUpAdmin,
  signUp,
  signUpTeacher,
  signUpStudent,
  signIn,
}