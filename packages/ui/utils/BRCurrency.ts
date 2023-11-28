export const formatCurrency = (value?: number) => {
	const options = {
		style: "currency",
		currency: "BRL",
	};
	return new Intl.NumberFormat("pt-BR", options).format(Number(value));
};

export const formatCurrencyWithoutSymbol = (value?: number) => {
	const formattedValue = value?.toLocaleString("pt-BR", {
		style: "currency",
		currency: "BRL",
	});

	return formattedValue?.substring(3);
};
