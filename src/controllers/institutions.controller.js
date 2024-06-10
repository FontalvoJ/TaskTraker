
import Institution from '../models/Institution'; 


export const getInstitutions = async (req, res) => {
    try {
        const institutions = await Institution.find(); 
        res.status(200).json(institutions);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las instituciones', error });
    }
};


export const getInstitutionById = async (req, res) => {
    try {
        const institution = await Institution.findById(req.params.institutionId);
        if (!institution) {
            return res.status(404).json({ message: 'Institución no encontrada' });
        }
        res.status(200).json(institution);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la institución', error });
    }
};

export const updateInstitutionById = async (req, res) => {
    try {
        const updatedInstitution = await Institution.findByIdAndUpdate(req.params.institutionId, req.body, {
            new: true,
        });
        if (!updatedInstitution) {
            return res.status(404).json({ message: 'Institución no encontrada' });
        }
        res.status(200).json(updatedInstitution);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la institución', error });
    }
};


export const deleteInstitutionById = async (req, res) => {
    try {
        const deletedInstitution = await Institution.findByIdAndDelete(req.params.institutionId);
        if (!deletedInstitution) {
            return res.status(404).json({ message: 'Institución no encontrada' });
        }
        res.status(200).json({ message: 'Institución eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la institución', error });
    }
};

export default {
    getInstitutions,
    getInstitutionById,
    updateInstitutionById,
    deleteInstitutionById,
};
