import formatter from "./formatter";

export default function reduceString(string: string): number{
    const newString = string.slice(string.length - 4, string.length - 1)
  
    let result: number = 0;
    for(let i = 0; i <= newString.length - 1; i++) {
      result += newString.toLowerCase().charCodeAt(i);
    }


    return Math.round(result / 10);
}