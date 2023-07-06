export class PersistentFramework {
	static add(
		name: string,
		value:
			| { [k: string]: string | boolean | number }
			| string[]
			| string
			| boolean
			| number
			| undefined
	) {
		if (
			typeof localStorage !== "undefined" &&
			localStorage instanceof Storage
		) {
			localStorage.setItem(name, JSON.stringify(value));
		}
	}

	static remove(name: string) {
		if (
			typeof localStorage !== "undefined" &&
			localStorage instanceof Storage
		) {
			localStorage.removeItem(name);
		}
	}

	static get(
		name: string
	):
		| { [k: string]: string | boolean | number }
		| string[]
		| string
		| boolean
		| number
		| undefined {
		if (
			typeof localStorage !== "undefined" &&
			localStorage instanceof Storage
		) {
			const value = localStorage.getItem(name);

			return value ? JSON.parse(value) : undefined;
		}
	}
}

export default PersistentFramework;
