export interface ITimelineSteps {
	title?: string;
	descriptions?: IDescriptions[];
	titleWidth?: string;
	status?: string;
}

interface IDescriptions {
	text: string;
	status: string;
}
