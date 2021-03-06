import {StyleSheet} from 'react-native';

const historyStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  historyText: {
    flex: 5,
    alignSelf: 'center',
    fontSize: 30,
  },
  delButton: {
    flex: 1,
    backgroundColor: 'yellow',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default historyStyles;
