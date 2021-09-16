import React from 'react';
import styles from '../styles';

import {Text, TouchableOpacity, View} from 'react-native';

const CalcButtons = ({
  values,
  selectedValue,
  setSelectedValue,
  selectedAux,
  setSelectedAux,
  setError,
  selectedLogArr,
  setLogArr,
}) => {
  return values.map(val => (
    <TouchableOpacity
      key={val}
      onPress={() => {
        setError('');
        if (val === '=') {
          if (selectedValue.length !== 0 && selectedAux.length !== 0) {
            let auxArr = [...selectedLogArr];
            let operation = selectedAux + selectedValue;
            let aux1 = parseFloat(selectedValue);
            let aux2 = parseFloat(selectedAux.slice(0, -1));
            setSelectedAux('');
            switch (selectedAux.slice(-1)) {
              case '/':
                if (
                  aux2 / aux1 === Infinity ||
                  aux2 / aux1 === -Infinity ||
                  isNaN(aux2 / aux1)
                ) {
                  setError('mathError');
                  setSelectedAux('');
                  setSelectedValue('');
                  auxArr.push(operation + '=' + 'mathError');
                  setLogArr(auxArr);
                } else {
                  setSelectedValue(`${aux2 / aux1}`);
                  auxArr.push(operation + '=' + (aux2 / aux1));
                  setLogArr(auxArr);
                }
                break;
              case 'x':
                setSelectedValue(`${aux2 * aux1}`);
                auxArr.push(operation + '=' + (aux2 * aux1));
                setLogArr(auxArr);
                break;
              case '-':
                setSelectedValue(`${aux2 - aux1}`);
                auxArr.push(operation + '=' + (aux2 - aux1));
                setLogArr(auxArr);
                break;
              case '+':
                setSelectedValue(`${aux2 + aux1}`);
                auxArr.push(operation + '=' + (aux2 + aux1));
                setLogArr(auxArr);
                break;
              default:
                auxArr.push('error');
                setLogArr(auxArr);
                console.log(
                  'Lo lamentamos, por el momento no disponemos de eso.',
                );
            }
          }
        } else if (val === '.') {
          if (
            !selectedValue.includes('.') &&
            selectedValue.length !== 0 &&
            selectedValue[selectedValue.length - 1] !== '-'
          ) {
            setSelectedValue(selectedValue + val);
          }
        } else {
          setSelectedValue(selectedValue + val);
        }
      }}
      style={[styles.buttonStyle]}>
      <Text style={[styles.text]}>{val}</Text>
    </TouchableOpacity>
  ));
};

export default CalcButtons;
