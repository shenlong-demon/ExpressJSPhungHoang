import { CloseOutReport, Operation, ReportService } from '@business/services';
import { Dto } from '@core/common';
import { DoCloseOutReportRequest } from '@business/model';

export class ReportFacade {
	public static async closeOutReport(req: DoCloseOutReportRequest): Promise<Dto<CloseOutReport | null>> {
		return ReportService.closeOutReport(req);
	}
}
