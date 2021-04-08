import test from 'ava';
import delay from 'delay';
import pReduce from './index.js';

test('main', async t => {
	const fixture = [
		Promise.resolve(3),
		delay(50, {value: 2}),
		5
	];

	t.is(await pReduce(fixture, async (a, b) => a + b, 0), 10);
});

test('rejects', async t => {
	const fixture = [
		Promise.resolve(3),
		delay.reject(50, {value: new Error('foo')})
	];

	await t.throwsAsync(pReduce(fixture, (a, b) => a + b, 0), {message: 'foo'});
});

test('reducer throws', async t => {
	const fixture = [
		Promise.resolve(3),
		Promise.resolve(3)
	];

	await t.throwsAsync(pReduce(fixture, () => {
		throw new Error('foo');
	}), {message: 'foo'});
});

test('handles empty iterable', async t => {
	t.is(await pReduce([], () => {}, 0), 0);
});
