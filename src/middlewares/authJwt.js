import jwt from 'jsonwebtoken';
import config from '../config';
import Teacher from '../models/Teacher'; 
import AdminOnly from '../models/adminOnly'; 
import Student from '../models/Student'; 
import Institution from '../models/Institution'; 

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"];

        if (!token) return res.status(403).json({ message: "No token provided" });

        const decoded = jwt.verify(token, config.SECRET);
        console.log('Decoded token:', decoded);

        if (!decoded.role) {
            return res.status(400).json({ message: "Token does not contain role information" });
        }

        req.userId = decoded.id;
        req.role = decoded.role.toLowerCase(); // Convertir a minúsculas

        let user;

        switch (req.role) {
            case 'teacher':
                user = await Teacher.findById(req.userId, { password: 0 });
                if (!user) return res.status(404).json({ message: "No teacher available" });
                break;
            case 'student':
                user = await Student.findById(req.userId, { password: 0 });
                if (!user) return res.status(404).json({ message: "No student available" });
                break;
            case 'admin':
                user = await AdminOnly.findById(req.userId, { password: 0 });
                if (!user) return res.status(404).json({ message: "No admin available" });
                break;
            case 'institution':
                user = await Institution.findById(req.userId, { password: 0 });
                if (!user) return res.status(404).json({ message: "No institution available" });
                break;
            default:
                return res.status(400).json({ message: "Invalid role" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        return res.status(401).json({ message: 'Unauthorized' });
    }
};



export const validateRoles = (...allowedRoles) => {
    return (req, res, next) => {
        try {
            if (allowedRoles.includes(req.role)) {
                return next();  // Permitir el acceso
            } else {
                return res.status(403).json({ message: "You don't have permission" });
            }
        } catch (error) {
            console.error("Error in validateRoles middleware:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    };
};


export const authJwt = {
    verifyToken
};



