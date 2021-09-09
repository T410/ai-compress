function fitness(chromosome) {}

function bin2dec(arr) {
	return arr.reduce((acc, cur, index) => {
		return acc + Math.pow(2, 7 - index) * cur;
	}, 0);
}

export { fitness };
