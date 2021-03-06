import {StyleSheet} from 'react-native';

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  screen: {
    flex: 1,
    backgroundColor: 'lightsteelblue',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
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
    width: '33.3%',
    height: '25%',
    backgroundColor: 'orange',
  },
  opsStyle: {
    flex: 1,
    backgroundColor: 'yellowgreen',
  },
  text: {
    justifyContent: 'center',
    fontSize: 48,
    textAlign: 'center',
  },
  auxText: {
    fontSize: 24,
    padding: 5,
  },
  historyText: {
    alignSelf: 'center',
    fontSize: 30,
  },
  screenText: {
    flex: 3,
    fontSize: 48,
  },
  screenButtons: {
    flexDirection: 'row-reverse',
    backgroundColor: 'blue',
  },
  historyButt: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default homeStyles;
