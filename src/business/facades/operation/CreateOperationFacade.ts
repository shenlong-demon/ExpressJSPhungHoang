import { Dto, Logger } from '@core/common';
import { Operation, OperationService } from '@business//services';
import { CreateOperationRequest } from '@business/model';

export class CreateOperationFacade {
	static async create(req: CreateOperationRequest): Promise<Dto<Operation | null>> {
		const dto: Dto<Operation | null> = await OperationService.createOperation(req);
		Logger.log(() => [`CreateOperationFacade create `, req, dto]);
		return dto;
	}
}
