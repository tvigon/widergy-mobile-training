const getNumButt = (value, setVal, operation) =>
  value.map(val => ({
    label: val,
    onPress: () => {
      setVal(prevValue => operation(prevValue, val));
    },
  }));

const getOpNumButt = setVal => [
  {
    label: '.',
    onPress: () => {
      setVal(prevValue => pointButt(prevValue));
    },
  },
  {
    label: 'DEL',
    onPress: () => {
      setVal(prevValue => delOperator(prevValue));
    },
    onLongPress: () => {
      setVal('');
    },
  },
];

const getOpButtons = setVal => [
  {label: '+', onPress: () => {setVal(prevValue => calcOperator(prevValue,'+'));}},
  {label: '-', onPress: () => {setVal(prevValue => calcOperator(prevValue,'-'));}},
  {label: 'x', onPress: () => {setVal(prevValue => calcOperator(prevValue,'x'));}},
  {label: '/', onPress: () => {setVal(prevValue => calcOperator(prevValue,'/'));}},
  {label: '=', onPress: () => {setVal(prevValue => solveEquation(prevValue));}},
];

const pointButt = val => {
  if (/[a]+/g.test(val)) {
    return '.';
  }
  let myRe = /[^-+/x]+$/g;
  let match = myRe.exec(val);
  if (match === null) {
    return val + '.';
  } else if (!match[0].includes('.')) {
    return val + '.';
  } else {
    return val;
  }
};

const delOperator = val => {
  if (/[a]+/g.test(val)) {
    return '';
  }
  if (val.length !== 0) {
    return val.slice(0, -1);
  } else {
    return val;
  }
};

const numButton = (val, num) => {
  if (/[a]+/g.test(val)) {
    return num;
  }
  return val + num;
};

const calcOperator = (val, char) => {
  if (/[a]+/g.test(val)) {
    return '';
  }
  let myRe = /[^-+/x.]+$/g;
  let match = myRe.exec(val);
  if (match === null) {
    return val;
  } else {
    return val + char;
  }
};

const simpleParse = str => {
  if (str.indexOf('/') !== -1) {
    let num1 = parseFloat(str.slice(0, str.indexOf('/')));
    let num2 = parseFloat(str.slice(str.indexOf('/') + 1));
    return num1 / num2;
  }
  if (str.indexOf('x') !== -1) {
    let num1 = parseFloat(str.slice(0, str.indexOf('x')));
    let num2 = parseFloat(str.slice(str.indexOf('x') + 1));
    return num1 * num2;
  }
};

const lessPriorityParse = str => {
  if (str.indexOf('+') !== -1) {
    let num1 = parseFloat(str.slice(0, str.indexOf('+')));
    let num2 = parseFloat(str.slice(str.indexOf('+') + 1));
    return num1 + num2;
  }
  if (str.indexOf('-') !== -1) {
    let num1 = parseFloat(str.slice(0, str.indexOf('-')));
    let num2 = parseFloat(str.slice(str.indexOf('-') + 1));
    return num1 - num2;
  }
};

const solveEquation = str => {
  let firstRegex = /[-]?[.]?[0-9]*[.]?[0-9]+[/x][.]?[0-9]*[.]?[0-9]+/g;
  let firstMatch = firstRegex.exec(str);
  let secRegex = /[-]?[.]?[0-9]*[.]?[0-9]+[+-][.]?[0-9]*[.]?[0-9]+/g;
  let secMatch = secRegex.exec(str);
  if (firstMatch !== null) {
    return solveEquation(
      str.replace(firstMatch[0], simpleParse(firstMatch[0])),
    );
  } else if (secMatch !== null) {
    return solveEquation(
      str.replace(secMatch[0], lessPriorityParse(secMatch[0])),
    );
  } else {
    if (isNaN(str) || str === 'Infinity' || str === '-Infinity') {
      return 'mathError';
    } else {
      return str;
    }
  }
};

export {
  pointButt,
  delOperator,
  numButton,
  solveEquation,
  calcOperator,
  getOpNumButt,
  getOpButtons,
  getNumButt,
};
