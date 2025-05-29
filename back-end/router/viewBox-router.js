import express from 'express';
const router = express.Router();
import getViewBox from '../controller/viewBox-controller.js';

router.get('/:estado/:municipio', getViewBox);

export default router;

