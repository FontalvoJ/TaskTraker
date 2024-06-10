import Teacher from '../models/Teacher';

export const getTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find();
        res.status(200).json(teachers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getTeacherById = async (req, res) => {
    const { teacherId } = req.params;
    try {
        const teacher = await Teacher.findById(teacherId);
        if (!teacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }
        res.status(200).json(teacher);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateTeacherById = async (req, res) => {
    const { teacherId } = req.params;
    const update = req.body;
    try {
        const updatedTeacher = await Teacher.findByIdAndUpdate(
            teacherId,
            update,
            { new: true }
        );
        if (!updatedTeacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }
        res.status(200).json(updatedTeacher);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteTeacherById = async (req, res) => {
    const { teacherId } = req.params;
    try {
        const deletedTeacher = await Teacher.findByIdAndDelete(teacherId);
        if (!deletedTeacher) {
            return res.status(404).json({ message: "Teacher not found" });
        }
        res.status(200).json(deletedTeacher);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default {
    getTeachers,
    getTeacherById,
    updateTeacherById,
    deleteTeacherById
}

