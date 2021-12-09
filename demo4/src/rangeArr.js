export default function rangeArr(n, iteratee) {
	return Array.from({ length: n }, () => iteratee);
}