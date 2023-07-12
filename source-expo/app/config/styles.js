import {StyleSheet} from 'react-native';

export const BaseStyle = StyleSheet.create({
  textInput: {
    height: 46,
    borderRadius: 5,
    paddingHorizontal: 10,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
  },
  searchInput: {
    height: 46,
    borderRadius: 5,
    paddingHorizontal: 10,
    width: '100%',
    alignItems: 'center'
  },
  safeAreaView: {
    flex: 1,
  },
});
