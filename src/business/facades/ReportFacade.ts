import { CloseOutReport, Operation, ReportService } from '@business/services';
import { Dto } from '@core/common';
import {DoCloseOutReportRequest, GetCloseOutReportsRequest} from '@business/model';

export class ReportFacade {
	public static async closeOutReport(req: DoCloseOutReportRequest): Promise<Dto<CloseOutReport | null>> {
		return ReportService.closeOutReport(req);
	}

	static async getCloseOutReports(req: GetCloseOutReportsRequest): Promise<Dto<CloseOutReport[]>> {
		return ReportService.getCloseOutReports(req);
	}
}
