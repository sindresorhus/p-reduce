import {expectType} from 'tsd';
import pReduce from './index.js';

const names = [
	Promise.resolve('sindresorhus'),
	'Addy Osmani',
	'Pascal Hartig',
	'Stephen Sawchuk'
];

expectType<Promise<number>>(
	pReduce(
		names,
		(total, name) => {
			expectType<number>(total);
			expectType<string>(name);

			return total % 2 ? Promise.resolve(total + 1) : total + 1;
		},
		0
	)
);

const names2 = [
	Promise.resolve('sindresorhus'),
	'Addy Osmani',
	'Pascal Hartig',
	5
];

expectType<Promise<string>>(
	pReduce<string | number, string>(
		names2,
		async (allNames, name) => {
			expectType<string>(allNames);
			expectType<string | number>(name);
			return Promise.resolve(`${allNames},${name}`);
		},
		''
	)
);
