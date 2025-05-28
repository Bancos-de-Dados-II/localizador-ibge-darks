import banco from '../database/sequelize.js';
import { QueryTypes } from 'sequelize';

const getViewBox = async (req, res) => {
    const { estado } = req.params; 

    try {
        
        const result = await banco.query('SELECT getviewbox($1) AS viewBox', {
            bind: [estado], 
            type: QueryTypes.SELECT
        });

        if (result.length === 0 || !result[0].viewbox) {
            return res.status(404).json({ error: 'Viewbox não encontrado' });
        }

        res.json({ viewbox: result[0].viewbox });
    } catch (error) {
        console.error('Erro ao obter viewbox:', error); 
        res.status(500).json({ error: 'Erro ao obter viewbox' });
    }
};

export default getViewBox;