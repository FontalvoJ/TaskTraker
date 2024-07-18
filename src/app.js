import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import pkg from '../package.json';
import projectRoutes from './routes/projects.routes';
import authRoutes from './routes/auth.routes';
import teacherRoutes from './routes/teacher.routes'; 
import studentRoutes from './routes/students.routes';
import institutionRoutes from './routes/institutions.routes';
import StudentProject from './routes/studentProjects.routes';

import { createRoles } from './libs/initialSetup';

// Inicializamos la aplicación express
const app = express();

// Llamamos a la función createRoles
createRoles();

// Configuramos el middleware de logging con Morgan
app.use(morgan('dev'));
app.use(express.json());

// Configuramos el middleware de CORS
const allowedOrigins = ['http://localhost:4200', 'https://demo-gpe-tasktraker.netlify.app'];
app.use(cors({
  origin: function (origin, callback) {
    // Permitir solicitudes de origen no especificado (como solicitudes internas)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

// Definimos una ruta principal que devuelve la información del paquete
app.get('/', (req, res) => {
  const packageInfo = {
    name: pkg.name,
    version: pkg.version,
    description: pkg.description,
    author: pkg.author
  };
  res.json(packageInfo);
});

app.use('/api/projects', projectRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/institutions', institutionRoutes);
app.use('/api/StudentProject', StudentProject);

export default app;
