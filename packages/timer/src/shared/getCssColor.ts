// Utility function #1: Write CSS

export type RGB = [number, number, number];

export type TimerColor = string | RGB | [RGB, RGB];

export default function getCssColor(bg: TimerColor): string {
  switch (typeof bg) {
    case 'object':
      if (Array.isArray(bg)) {
        switch (bg.length) {
          case 2: {
            // linear-gradients
            const [col1, col2] = bg;
            return `linear-gradient(90deg, rgb(${col1.join(',')}), rgb(${col2.join(',')}))`;
          }
          case 3:
            // RGB Value
            return `rgb(${bg.join(',')})`;
        }
      }
      break;
    case 'string': // transparent or other alternative text
      return bg;
  }

  return '#fff';
}
