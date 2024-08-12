import { BillsFilterRequest } from '@business/model';
import { Bill } from '@business/services/model';
import { Dto } from '@core/common';
import { BillRepo } from '@business/repositories';
import { BillEntity } from '@business/repositories/model';

export class BillService {
	static async getBillsBy(req: BillsFilterRequest): Promise<Dto<Bill[]>> {
		const newProduct: BillEntity[] = await BillRepo.getBillsBy(req);
		return Dto.success(newProduct);
	}
}
