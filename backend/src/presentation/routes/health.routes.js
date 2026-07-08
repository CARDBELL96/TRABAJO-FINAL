import { Router } from 'express';
import pkg from '../../../package.json' with { type: 'json' };

const router = Router();

router.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'TaskFlow API funcionando correctamente',
    version: pkg.version,
  });
});

export { router as healthRouter };
