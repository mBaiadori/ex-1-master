import { Router } from 'express';
import { asyncHandler } from './adapters';
import { articleController, authorsController } from './controllers';
import { endpointA } from './middlewares';

const r = Router();
// Endpoit
r.use('/endpointA', asyncHandler(endpointA));

r.get('/authors/list', asyncHandler(authorsController.list));
//Articles
r.post('/article', asyncHandler(articleController.post));
r.put('/article', asyncHandler(articleController.put));
r.delete('/article', asyncHandler(articleController.del));

export default r;
