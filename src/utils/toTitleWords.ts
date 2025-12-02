export function toTitleWords(str: string) {
  if (str === "isUgc5Photos") {
    return "UGC 5 Photos";
  }
  // remove leading "is" only if it appears at the beginning
  const newStr = str.replace(/^is(?=[A-Z])/, "");

  return newStr
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, c => c.toUpperCase());
}