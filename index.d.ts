export type ReducerFunction<ValueType, ReducedValueType = ValueType> = (
	previousValue: ReducedValueType,
	currentValue: ValueType,
	index: number
) => PromiseLike<ReducedValueType> | ReducedValueType;

/**
 * Reduce a list of values using promises into a promise for a value.
 *
 * @param input - Iterated over serially in the `reducer` function.
 * @param reducer - Expected to return a value. If a `Promise` is returned, it's awaited before continuing with the next iteration.
 * @param initialValue - Value to use as `previousValue` in the first `reducer` invocation.
 * @returns Resolves when all promises in `input` and ones returned from `reducer` are fulfilled, or rejects if any of the promises reject. The resolved value is the result of the reduction.
 */
export default function pReduce<ValueType, ReducedValueType = ValueType>(
	input: Iterable<PromiseLike<ValueType> | ValueType>,
	reducer: ReducerFunction<ValueType, ReducedValueType>,
	initialValue?: ReducedValueType
): Promise<ReducedValueType>;
