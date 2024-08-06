import { DoCloseOutReportRequest, GetCloseOutReportsRequest } from '../business';
import { Hono } from 'hono';
import { ReportFacade } from '@business/facades/ReportFacade';

const router = new Hono();

/* GET quotes listing. */
router.post('/close-out-report', async (c) => c.json(await ReportFacade.closeOutReport((await c.req.json()) as DoCloseOutReportRequest)));
router.post('/list-close-out-report', async (c) =>
	c.json(await ReportFacade.getCloseOutReports((await c.req.json()) as GetCloseOutReportsRequest)),
);

export default router;
