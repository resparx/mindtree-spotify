import { Router } from 'express';

import track from './track'

const router = Router();

router.use(`/track`, track);

export default router;
