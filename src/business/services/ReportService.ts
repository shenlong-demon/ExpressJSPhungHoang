import { CONSTANT, Dto } from '@core/common';
import { CloseOutReport, Operation } from '@business/services/model';
import { DoCloseOutReportRequest, GetCloseOutReportsRequest } from '@business/model';
import { BillEntity, CloseOutReportEntity } from '@business/repositories/model';
import { BillRepo, CloseOutReportRepo } from '@business/repositories';
import { DateTimeUtils } from '@business/common';

export class ReportService {
	static async closeOutReport(req: DoCloseOutReportRequest): Promise<Dto<CloseOutReport | null>> {
		const date: number = DateTimeUtils.getMiddleOfDate(req.date);
		const fromTime: number = DateTimeUtils.getStartOfDate(req.date);
		const toTime: number = DateTimeUtils.getEndOfDate(req.date);
		const bills: BillEntity[] = await BillRepo.getBills(fromTime, toTime);
		let totalBill: number = 0;
		let totalProfit: number = 0;
		let totalDiscount: number = 0;
		for (const bill of bills) {
			totalBill += bill.total;
			totalProfit += bill.profit;
			totalDiscount += bill.discount;
		}
		const entity: CloseOutReportEntity = {
			id: 0,
			createdAt: DateTimeUtils.now(),
			updatedAt: DateTimeUtils.now(),
			appKey: CONSTANT.STR_EMPTY,
			date: date,
			numberOfBill: bills.length,
			totalBill,
			totalProfit,
			totalDiscount,
		};
		const report: CloseOutReportEntity | null = await CloseOutReportRepo.update(entity, fromTime, toTime);

		return Dto.success(report);
	}
	static async getCloseOutReports(req: GetCloseOutReportsRequest): Promise<Dto<CloseOutReport[]>> {
		const fromTime: number = DateTimeUtils.getStartOfDateInMonth(req.date);
		const toTime: number = DateTimeUtils.getEndOfDateInMonth(req.date);
		const list: CloseOutReportEntity[] = await CloseOutReportRepo.getCloseOutReports(fromTime, toTime);
		return Dto.success(list);
	}
}
