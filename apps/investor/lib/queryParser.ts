type TQueryType = Partial<{
	[key: string]: string | string[];
}>;

type TQueryDataParams = {
	fields: string[];
	values: { [key: string]: string | number };
};

const resetFieldOnValues = (value: string) => ["Todos imóveis"].includes(value);

export default function queryParser(
	query: TQueryType,
	queryDataParams: TQueryDataParams
) {
	return Object.fromEntries(
		Object.entries(query)
			.filter(
				([key, value]) =>
					queryDataParams.fields.includes(key) &&
					!resetFieldOnValues(String(value))
			)
			.map(([key, value]) => [
				key,
				queryDataParams.values[value as keyof typeof queryDataParams.values] ||
					(queryDataParams.fields.includes(key) && value),
			])
			.filter(([value]) => value)
	);
}
