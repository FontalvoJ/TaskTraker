import Student from '../models/Student';

export const getStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getStudentById = async (req, res) => {
    const { studentId } = req.params;
    try {
        const student = await Student.findById(studentId);
        if (!student) {
            return res.status(404).json({ message: "Teacher not found" });
        }
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateStudentById = async (req, res) => {
    const { studentId } = req.params;
    const update = req.body;
    try {
        const updatedStudent = await Student.findByIdAndUpdate(
            studentId,
            update,
            { new: true }
        );
        if (!updatedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.status(200).json(updatedStudent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteStudentById = async (req, res) => {
    const { studentId } = req.params;
    try {
        const deletedStudent = await Student.findByIdAndDelete(studentId);
        if (!deletedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }
        res.status(200).json(deletedStudent);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default {
    getStudents,
    getStudentById,
    updateStudentById,
    deleteStudentById
}

