export default function oneOf(target, list = []) {
    return list.some(item => target === item);
}