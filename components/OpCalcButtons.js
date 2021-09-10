import React from 'react';
import styles from '../styles';

import {Text, TouchableOpacity, View} from 'react-native';

const OpCalcButtons = ({
  values,
  selectedValue,
  setSelectedValue,
  selectedAux,
  setSelectedAux,
  setError,
}) => (
  <View style={[styles.opsStyle]}>
    <TouchableOpacity
      key="DEL"
      onLongPress={() => {
        setSelectedValue('');
        setSelectedAux('');
        setError('');
      }}
      onPress={() => {
        setError('');
        if (selectedValue.length !== 0) {
          setSelectedValue(selectedValue.slice(0, -1));
        } else {
          setSelectedValue(selectedAux.slice(0, -1));
          setSelectedAux('');
        }
      }}
      style={[styles.opsStyle]}>
      <Text style={[styles.text]}>DEL</Text>
    </TouchableOpacity>
    {values.map(val => (
      <TouchableOpacity
        key={val}
        onPress={() => {
          setError('');
          if (val === '-' && selectedValue.length === 0) {
            setSelectedValue(val);
          }
          if (
            !selectedAux.includes('/') &&
            !selectedAux.includes('-') &&
            !selectedAux.includes('x') &&
            !selectedAux.includes('+') &&
            selectedValue.length !== 0
          ) {
            if (selectedValue.length !== 1 || selectedValue[0] !== '-') {
              setSelectedAux(selectedValue + val);
              setSelectedValue('');
            }
          }
        }}
        style={[styles.opsStyle]}>
        <Text style={[styles.text]}>{val}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

export default OpCalcButtons;
