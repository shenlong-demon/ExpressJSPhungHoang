import { Logger } from '@core/common';

export class DateTimeUtils {
	public static now(): number {
		return new Date().getTime();
	}

	static getStartOfDate(mili: number): number {
		Logger.log(() => [`DateTimeUtils getStartOfDate ${mili}`]);
		const d: Date = new Date(mili);
		d.setHours(0, 0, 0, 0);
		return d.getTime();
	}
	static getEndOfDate(mili: number): number {
		const d: Date = new Date(mili);
		d.setHours(23, 59, 59, 999);
		return d.getTime();
	}
	static getMiddleOfDate(mili: number): number {
		const d: Date = new Date(mili);
		d.setHours(12, 0, 0, 0);
		return d.getTime();
	}
	static getStartOfDateInMonth(mili: number): number {
		Logger.log(() => [`DateTimeUtils getStartOfDate ${mili}`]);
		const d: Date = new Date(mili);
		d.setFullYear(d.getFullYear(), d.getMonth(), 1);
		d.setHours(0, 0, 0, 0);
		return d.getTime();
	}
	static getEndOfDateInMonth(mili: number): number {
		Logger.log(() => [`DateTimeUtils getStartOfDate ${mili}`]);
		const d: Date = new Date(mili);
		d.setFullYear(d.getFullYear(), d.getMonth() + 1, 0);
		d.setHours(23, 59, 59, 999);
		return d.getTime();
	}
}
