export default function isNumeric(value: String) {
    return /^-?\d+$/.test(value as string);
}