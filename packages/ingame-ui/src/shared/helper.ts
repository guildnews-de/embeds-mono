// FIXME: Parser überarbeiten. In Embed Klasse überagen?

function splitPlus(str: string) {
  const [id = '0', count = '6'] = str.split('+');
  return [Number(id), Number(count)];
}

export function idParser(rawIds: string) {
  const parentArray = rawIds.split(';');
  const parentOut: number[] | number[][] | number[][][] = [];
  parentArray.forEach((str, i) => {
    const childOut = [];
    const switchKey = `${str.includes(',')}${str.includes('+')}`;
    switch (switchKey) {
      case 'truefalse': {
        // String containts commas, but no +
        const out = str.split(',');
        out.forEach((element) => {
          childOut.push(parseInt(element, 10));
        });
        break;
      }
      case 'falsetrue': {
        // String containts no commas, but +
        childOut.push(splitPlus(str));
        break;
      }
      case 'truetrue': {
        // String contains both
        const split = str.split(',');
        split.forEach((element) => {
          if (element.includes('+')) {
            childOut.push(splitPlus(element));
          } else {
            childOut.push(parseInt(element, 10));
          }
        });
        break;
      }
      default: {
        // Default case (contains none, just a number)
        childOut.push(parseInt(str, 10));
        break;
      }
    }
    parentOut[i] = Number(childOut);
  });
  return parentOut;
}

export function upgradeParser(rawIds: string) {
  const parentArray = rawIds.includes(',')
    ? rawIds.split(',')
    : rawIds.split(';');
  const parentOut: number[] = [];
  parentArray.forEach((str, i) => {
    const check = parseInt(str, 10);
    if (str.includes(',') || str.includes('+')) {
      parentOut[i] = 0;
    } else if (Number.isInteger(check)) {
      parentOut[i] = check;
    }
  });
  return parentOut;
}
