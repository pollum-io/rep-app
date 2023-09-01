import moment from "moment";
import "moment/locale/pt-br";

export const formatDate = (value: number | undefined | string | Date) => {
	const valor = moment(value).add(1, "days").format("ll");

	return valor;
};

export const formatFullDate = (value: number | undefined | string | Date) => {
	const formattedDate = moment(value)
		.locale("pt-br")
		.format("DD [de] MMMM [de] YYYY");

	const firstLetterUpperCase = (str) => {
		return str.charAt(0).toUpperCase() + str.slice(1);
	};

	const parts = formattedDate.split(" ");
	const capitalizedMonth = firstLetterUpperCase(parts[2]);

	parts[2] = capitalizedMonth;

	const finalFormattedDate = parts.join(" ");

	return finalFormattedDate;
};

export const formatDateOnlyMonthYear = (value: number | undefined | string) => {
	const formattedDate = moment(value)
		.locale("pt-br")
		.format("MMM YYYY")
		.replace(/^\w/, (c) => c.toUpperCase());
	return formattedDate;
};

export const formatDateOnlyDayMonthYear = (
	value: number | undefined | string
) => {
	const formattedDate = moment(value).locale("pt-br").format("DD MMM YYYY");
	return formattedDate;
};

export const formatDateBirthday = (value: string | Date) => {
	const valor = moment(value).format("DD/MM/YYYY");

	return valor;
};

export const formattedDateWithYour = (value: number | undefined | string) => {
	const formattedDate = moment(value).format("DD MMM YYYY - HH:mm");
	return formattedDate;
};
