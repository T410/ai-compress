function init({ populationCount, chromosomeLength, fitness, validateFn }) {
	const pool = populate(populationCount, chromosomeLength);
	console.log(pool);
	iterate(pool, fitness);
}

function iterate(pool, fitness) {}

function generateChromosome(chromosomeLength) {
	let chromosome = new Array(chromosomeLength).fill().map(() => {
		return Math.floor(Math.random() * 2);
	});
	return chromosome;
}

function populate(populationCount, chromosomeLength, pool = []) {
	pool.push(generateChromosome(chromosomeLength));
	if (--populationCount > 0) {
		return populate(populationCount, chromosomeLength, pool);
	}
	return pool;
}

function crossover(chromosome1, chromosome2) {}

function mutate(chromosome) {}

export default init;
