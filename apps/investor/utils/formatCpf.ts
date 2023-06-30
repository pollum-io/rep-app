export function formatCPF(value: string) {
	// Remove tudo o que não é dígito
	value = value?.replace(/\D/g, "");

	// Coloca um ponto entre o terceiro e o quarto dígitos
	value = value?.replace(/(\d{3})(\d)/, "$1.$2");

	// Coloca um ponto entre o segundo e o terceiro dígitos
	value = value?.replace(/(\d{3})(\d)/, "$1.$2");

	// Coloca um hífen entre o penúltimo e o último dígitos
	value = value?.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

	return value;
}
