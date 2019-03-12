'use strict';

const pReduce = (iterable, reducer, initVal) => new Promise((resolve, reject) => {
	const iterator = iterable[Symbol.iterator]();
	let i = 0;

	const next = async total => {
		const element = iterator.next();

		if (element.done) {
			resolve(total);
			return;
		}

		try {
			const value = await Promise.all([total, element.value]);
			next(reducer(value[0], value[1], i++));
		} catch (error) {
			reject(error);
		}
	};

	next(initVal);
});

module.exports = pReduce;
module.exports.default = pReduce;
