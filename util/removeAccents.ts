export default function toNormalForm(str: string | undefined):string {
    if (str) return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    else return "";
}