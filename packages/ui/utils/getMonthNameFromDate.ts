export const getMonthNameFromDate = (dateString?: string) => {
	const date = new Date(String(dateString));
	const months = [
		"Janeiro",
		"Fevereiro",
		"Março",
		"Abril",
		"Maio",
		"Junho",
		"Julho",
		"Agosto",
		"Setembro",
		"Outubro",
		"Novembro",
		"Dezembro",
	];
	const monthIndex = date.getMonth();
	return months[monthIndex];
};
