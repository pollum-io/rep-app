export interface ITimelineSteps {
	titleWidth?: string;
	data?: {
		year: number;
		data: Array<{
			quarter: string;
			info: Array<{ name: string; status: string }>;
		}>;
	};
}
