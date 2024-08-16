import { AuthService } from '@business/services';
import { Dto } from '@core/common';

export class AuthFacade {
	public static async logout(phone: string): Promise<Dto<null>> {
		return AuthService.logout(phone);
	}
}
