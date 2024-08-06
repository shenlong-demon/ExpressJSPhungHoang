import { DoCloseOutReportRequest } from '../business';
import { Hono } from 'hono';
import { ReportFacade } from '@business/facades/ReportFacade';

const router = new Hono();

/* GET quotes listing. */
router.post('/close-out-report', async (c) => c.json(await ReportFacade.closeOutReport((await c.req.json()) as DoCloseOutReportRequest)));

export default router;
