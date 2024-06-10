import StudentProject from '../models/StudentProject';
import Student from '../models/Student';
import Teacher from '../models/Teacher';
import Institution from '../models/Institution';
import Project from '../models/Projects';

const addStudentToProject = async (req, res) => {
  const { studentId, teacherId, institutionId, projectId } = req.body;

  try {
    // Verificar si el estudiante existe
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ error: 'Estudiante no encontrado' });
    }

    // Verificar si el proyecto existe
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: 'Proyecto no encontrado' });
    }

    // Verificar si la institución existe
    const institution = await Institution.findById(institutionId);
    if (!institution) {
      return res.status(404).json({ error: 'Institución no encontrada' });
    }

    // Verificar si el docente existe y si pertenece a la institución
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({ error: 'Docente no encontrado' });
    }

    // Verificar si el docente pertenece a la institución
    if (teacher.id_institution.toString() !== institutionId) {
      return res.status(403).json({ error: 'El docente no pertenece a esta institución' });
    }

    // Crear el registro en la colección de studentProjects
    const newStudentProject = new StudentProject({
      student: studentId,
      project: projectId,
      institution: institutionId,
      teacher: teacherId
    });

    // Guardar el nuevo registro
    await newStudentProject.save();

    // Devolver la respuesta
    res.status(201).json(newStudentProject);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};

export { addStudentToProject };

