import test from 'ava';
import delay from 'delay';
import m from './';

test('main', async t => {
	const f = [
		Promise.resolve(3),
		delay(50).then(() => 2),
		5
	];

	t.is(await m(f, (a, b) => Promise.resolve(a + b), 0), 10);
});

test('rejects', async t => {
	const f = [
		Promise.resolve(3),
		delay(50).then(() => Promise.reject(new Error('foo')))
	];

	await t.throws(m(f, (a, b) => a + b, 0), 'foo');
});

test('reducer throws', async t => {
	const f = [
		Promise.resolve(3),
		Promise.resolve(3)
	];

	await t.throws(m(f, () => {
		throw new Error('foo');
	}), 'foo');
});

test('handles empty iterable', async t => {
	t.deepEqual(await m([], () => {}, 0), 0);
});
