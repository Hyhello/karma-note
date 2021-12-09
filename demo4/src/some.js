export default function some(target, list = []) {
    return list.some(item => item === target);
}