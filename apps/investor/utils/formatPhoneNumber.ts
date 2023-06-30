export function formatPhoneNumber(phoneNumber: string) {
	let value = phoneNumber?.replace(/\D/g, "");

	if (value?.length >= 2) {
		value = `(${value?.substring(0, 2)}) ${value?.substring(2)}`;
	}

	if (value?.length >= 10 && value?.charAt(5) !== "9") {
		value = `${value?.substring(0, 5)}9${value?.substring(5)}`;
	}

	if (value?.length >= 11) {
		value = `${value?.substring(0, 10)}-${value?.substring(10, 14)}`;
	}

	return value;
}
