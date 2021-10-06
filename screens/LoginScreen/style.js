import {StyleSheet} from 'react-native';

const loginStyles = StyleSheet.create({
  container: {backgroundColor: 'lightblue', flex: 1},
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    backgroundColor: 'blue',
    color: 'white',
    height: 30,
    lineHeight: 30,
    marginTop: 10,
    textAlign: 'center',
    width: 250,
  },
  input: {
    borderColor: 'black',
    borderWidth: 1,
    height: 37,
    width: 250,
  },
});

export default loginStyles;
