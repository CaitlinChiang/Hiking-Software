import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';

export default StyleSheet.create({
  tabbar: {
    height: 40,
  },
  tab: {
    flex: 1,
  },
  indicator: {
    height: 1,
  },
  label: {
    fontWeight: '400',
  },
  containProfileItem: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  completedButton: {
    backgroundColor: 'grey',
    // Additional styles for the completed button
  },
  completedButtonText: {
    color: 'white',
    // Additional styles for the completed button text
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: 'center',
  },
  label: {
    margin: 8,
  },
});
