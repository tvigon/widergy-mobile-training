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

const getOpButtons = (setVal, setArray, arr) => [
  {
    label: '+',
    onPress: () => {
      setVal(prevValue => calcOperator(prevValue, '+'));
    },
  },
  {
    label: '-',
    onPress: () => {
      setVal(prevValue => calcOperator(prevValue, '-'));
    },
  },
  {
    label: 'x',
    onPress: () => {
      setVal(prevValue => calcOperator(prevValue, 'x'));
    },
  },
  {
    label: '/',
    onPress: () => {
      setVal(prevValue => calcOperator(prevValue, '/'));
    },
  },
  {
    label: '=',
    onPress: () => {
      setVal(prevValue => solveEquation(prevValue, prevValue, setArray, arr));
    },
  },
];

const pointButt = val => {
  if (/[Error]+/g.test(val)) {
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

const solveEquation = (str, firstStr, setArr, arr) => {
  let firstRegex = /[-]?[.]?[0-9]*[.]?[0-9]+[/x][-]?[.]?[0-9]*[.]?[0-9]+/g;
  let firstMatch = firstRegex.exec(str);
  let secRegex = /[-]?[.]?[0-9]*[.]?[0-9]+[+-][-]?[.]?[0-9]*[.]?[0-9]+/g;
  let secMatch = secRegex.exec(str);
  if (firstMatch !== null) {
    return solveEquation(
      str.replace(firstMatch[0], priorityParse(firstMatch[0])),
      firstStr,
      setArr,
      arr,
    );
  } else if (secMatch !== null) {
    return solveEquation(
      str.replace(secMatch[0], lessPriorityParse(secMatch[0])),
      firstStr,
      setArr,
      arr,
    );
  } else {
    if (isNaN(str) || str === 'Infinity' || str === '-Infinity') {
      let auxArr = [...arr];
      auxArr.unshift(firstStr + '=' + 'Error');
      setArr(auxArr);
      return 'Error';
    } else {
      let auxArr = [...arr];
      auxArr.unshift(firstStr + '=' + str);
      setArr(auxArr);
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
