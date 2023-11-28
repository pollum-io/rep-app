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

export function formatCNPJ2(value: string) {
	// Remove tudo o que não é dígito
	value = value?.replace(/\D/g, "");

	// Coloca um ponto entre o segundo e o terceiro dígitos
	value = value?.replace(/^(\d{2})(\d)/, "$1.$2");

	// Coloca um ponto entre o quinto e o sexto dígitos
	value = value?.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");

	// Coloca uma barra entre o oitavo e o nono dígitos
	value = value?.replace(/\.(\d{3})(\d)/, ".$1/$2");

	// Coloca um hífen depois do bloco de quatro dígitos
	value = value?.replace(/(\d{4})(\d)/, "$1-$2");

	return value;
}
