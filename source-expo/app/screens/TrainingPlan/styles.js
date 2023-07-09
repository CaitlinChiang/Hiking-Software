import {StyleSheet} from 'react-native';
import {BaseColor} from '@config';

export default StyleSheet.create({
  contain: {
    flex: 1,
  },
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  circleContainerCurrent: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: '#36301f',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  circleContainer: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: '#cbc3b8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  circleTextCurrent: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
  },
  circleText: {
    color: '#36301f',
    fontSize: 15,
    textAlign: 'center',
  },
  trainingDetail: {
    paddingVertical: 5,
    marginHorizontal: 20,
  }
});
