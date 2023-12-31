import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  contain: {
    shadowOffset: {height: 1},
    shadowOpacity: 1.0,
    elevation: 5
  },
  nameContent: {
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8
  },
  validContent: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 7,
    justifyContent: 'space-between',
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8,
  },
  mainContent: {
    paddingHorizontal: 12,
    paddingVertical: 20,
    flexDirection: 'row',
    borderBottomRightRadius: 8,
    borderBottomLeftRadius: 8
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  progressBarCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#554c3d',
    marginLeft: -15,
  },
  progressBarLine: {
    flex: 1,
    height: 2,
    backgroundColor: '#554c3d',
    marginLeft: -10
  },
  overlay: {
    position: 'absolute',
    bottom: 3,
    right: 10,
    padding: 2,
    paddingRight:6,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
    zIndex: 1
  },
  overlayText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
    zIndex:1
  }
});
