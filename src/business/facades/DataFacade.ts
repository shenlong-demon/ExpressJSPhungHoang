import { DataResult } from '@business/model';
import { Dto, Logger } from '@core/common';

export class DataFacade {
	static async getAll(): Promise<Dto<DataResult | null>> {
		Logger.log(() => [`DataFacade getAll`, {}]);
		return Dto.success({});
	}
}
