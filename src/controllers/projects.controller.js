import Project from "../models/Projects";

export const createProject = async (req, res) => {
  try {
    const { title, category, description, objective, id_teacher} = req.body;

    // Crear una nueva instancia del proyecto
    const newProject = new Project({
      title,
      category,
      description,
      objective,
      id_teacher
    });

    // Guardar el proyecto en la base de datos
    const projectSave = await newProject.save();

    // Respuesta con el proyecto guardado
    res.status(201).json(projectSave);
  } catch (error) {
    // Manejo de errores
    console.error("Error al crear el proyecto:", error.message);
    res.status(500).json({ error: "Hubo un problema al crear el proyecto." });
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (error) {
    console.error("Error al obtener los proyectos:", error.message);
    res
      .status(500)
      .json({ error: "Hubo un problema al obtener los proyectos." });
  }
};

export const getProjectById = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ error: "Proyecto no encontrado" });
    }

    res.status(200).json(project);
  } catch (error) {
    console.error("Error al obtener el proyecto por ID:", error.message);
    res
      .status(500)
      .json({ error: "Hubo un problema al obtener el proyecto por ID." });
  }
};

export const updateProjectById = async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.projectId,
      req.body,
      { new: true }
    );

    if (!updatedProject) {
      return res.status(404).json({ error: "Proyecto no encontrado" });
    }

    res.status(200).json(updatedProject);
  } catch (error) {
    console.error("Error actualizando proyecto por ID:", error);
    res.status(500).json({ error: "Error del servidor" });
  }
};

export const deleteProjectById = async (req, res) => {
  const { projectId } = req.params;

  try {

    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
  
    await Project.findByIdAndDelete(projectId);

    return res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
 
    return res.status(500).json({ message: "Error deleting project", error: error.message });
  }
};

export default{
  createProject,
  getProjects,
  getProjectById,
  updateProjectById,
  deleteProjectById,
}
