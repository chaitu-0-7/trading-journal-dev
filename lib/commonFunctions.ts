export const capitalizeWords = (text: string) => {
    return text.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  };

 export function roundToNearest(value : any, decimalPlaces : any) {
    const factor = Math.pow(10, decimalPlaces);
    return Math.round(value * factor) / factor;
  }