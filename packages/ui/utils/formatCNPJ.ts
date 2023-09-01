export function formatCNPJ(cnpj: string) {
	// Remove caracteres não numéricos
	const numericCNPJ = cnpj.replace(/[^\d]/g, "");

	// Aplica a formatação
	return (
		numericCNPJ.slice(0, 2) +
		"." +
		numericCNPJ.slice(2, 5) +
		"." +
		numericCNPJ.slice(5, 8) +
		"/" +
		numericCNPJ.slice(8, 12) +
		"-" +
		numericCNPJ.slice(12)
	);
}
