export default function isBlank(str: string) {
    return (!str || /^\s*$/.test(str));
}