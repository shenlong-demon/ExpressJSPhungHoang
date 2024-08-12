import { Bill, BillService } from '@business/services';
import { Dto } from '@core/common';
import { BillsFilterRequest } from '@business/model';

export class BillFacade {
	public static async getBillsBy(filter: BillsFilterRequest): Promise<Dto<Bill[]>> {
		const dto: Dto<Bill[]> = await BillService.getBillsBy(filter);
		return dto;
	}
}
