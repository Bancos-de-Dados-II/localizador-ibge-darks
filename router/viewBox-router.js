import express from 'express';
const router = express.Router();
import getViewBox from '../controller/viewBox-controller.js';

router.get('/:estado', getViewBox);

export default router;