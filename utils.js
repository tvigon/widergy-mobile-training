const getNumButt = (value, setVal, operation) =>
  value.map(val => ({
    label: val,
    onPress: () => {
      setVal(prevValue => operation(prevValue, val));
    },
  }));

const getPointDelButt = setVal => [
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

const getOpButtons = (opArr, setVal, setLog, log) => [
  ...opArr.map(val => ({
    label: val,
    onPress: () => {
      setVal(prevValue => calcOperator(prevValue, val));
    },
  })),
  {
    label: '=',
    onPress: () => {
      setVal(prevValue => solveEquation(prevValue, prevValue, setLog));
    },
  },
];

const pointButt = val => {
  if (/[Error]+/g.test(val)) {
    return '.';
  }
  const POINTREGEX = /[^-+/x]+$/g;
  let match = POINTREGEX.exec(val);
  if (match === null) {
    return val + '.';
  } else if (!match[0].includes('.')) {
    return val + '.';
  } else {
    return val;
  }
};

const delOperator = val => {
  if (/[Error]+/g.test(val)) {
    return '';
  }
  if (val.length !== 0) {
    return val.slice(0, -1);
  } else {
    return val;
  }
};

const numButton = (val, num) => {
  if (/[Error]+/g.test(val)) {
    return num;
  }
  return val + num;
};

const calcOperator = (val, char) => {
  if (/[Error]+/g.test(val)) {
    return '';
  }
  return val + char;
};

const priorityParse = str => {
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
  if (str.indexOf('-') === 0) {
    let newStr = str.slice(1);
    let newIndex = newStr.indexOf('-');
    if (newIndex !== -1) {
      let num1 = parseFloat(str.slice(0, newIndex + 1));
      let num2 = parseFloat(str.slice(newIndex + 1 + 1));
      return num1 - num2;
    }
  } else if (str.indexOf('-') !== -1) {
    let num1 = parseFloat(str.slice(0, str.indexOf('-')));
    let num2 = parseFloat(str.slice(str.indexOf('-') + 1));
    return num1 - num2;
  }
};

const solveEquation = (str, firstStr, setLog) => {
  const PARSE_MULT_DIVISION = /[-]?[.]?[0-9]*[.]?[0-9]+[/x][-]?[.]?[0-9]*[.]?[0-9]+/g;
  let firstMatch = PARSE_MULT_DIVISION.exec(str);
  const PARSE_SUM_SUBS = /[-]?[.]?[0-9]*[.]?[0-9]+[+-][-]?[.]?[0-9]*[.]?[0-9]+/g;
  let secMatch = PARSE_SUM_SUBS.exec(str);
  if (firstMatch !== null) {
    return solveEquation(
      str.replace(firstMatch[0], priorityParse(firstMatch[0])),
      firstStr,
      setLog,
    );
  } else if (secMatch !== null) {
    return solveEquation(
      str.replace(secMatch[0], lessPriorityParse(secMatch[0])),
      firstStr,
      setLog,
    );
  } else {
    if (isNaN(str) || str === 'Infinity' || str === '-Infinity') {
      setLog(firstStr + '=' + 'Error');
      return 'Error';
    } else {
      setLog(firstStr + '=' + str);
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
  getPointDelButt,
  getOpButtons,
  getNumButt,
};
