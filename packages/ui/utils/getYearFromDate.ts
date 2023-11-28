export const getYearFromDate = (date?: string) => {
	const dateFormated = new Date(String(date));
	const year = dateFormated.getFullYear();
	return year;
};
