export interface IGeneralForecast {
	totalContributions: number;
	totalRaised: number;
	totalShareholders: number;
	yearlyData: YearlyData;
}
type YearlyData = {
	[year: number]: number;
};
