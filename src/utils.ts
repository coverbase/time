export const toNumber = (value: string | number) => {
	if (typeof value === "string") {
		const str = value.trim();

		if (/^\d+$/.test(str)) {
			const num = Number(str);

			if (!isNaN(num) && isFinite(num)) {
				return num;
			}
		}
	} else if (typeof value === "number") {
		if (!isNaN(value) && isFinite(value) && value === Math.floor(value)) {
			return value;
		}
	}

	return undefined;
};

export const range = (start: number, end: number) => {
	const array = new Array<number>();

	for (let i = start; i <= end; i++) {
		array.push(i);
	}

	return array;
};

export const flatten = (values: Array<Array<number>>) => {
	return values.reduce((accumulator, value) => accumulator.concat(value), []);
};
