import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  screen: {
    flex: 1,
    backgroundColor: 'lightsteelblue',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  column: {
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  allButtons: {
    flex: 3,
    backgroundColor: 'green',
  },
  numButtons: {
    flex: 3,
    backgroundColor: 'navy',
  },
  buttonStyle: {
    //estos numeros son re magicos dentro de calc butons
    width: '33.3%',
    height: '25%',
    backgroundColor: 'orange',
  },
  opsStyle: {
    flex: 1,
    backgroundColor: 'yellowgreen',
  },
  text: {
    fontSize: 48,
    textAlign: 'center',
  },
  screenText: {
    fontSize: 48,
    textAlign: 'right',
  },
});

export default styles;
