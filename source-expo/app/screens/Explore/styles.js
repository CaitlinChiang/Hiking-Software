import {StyleSheet} from 'react-native'
import * as Utils from '@utils'

export default StyleSheet.create({
  imageBackground: {
    height: 140,
    width: '100%',
    position: 'absolute',
  },
  searchForm: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 0.5,
    width: '100%',
    shadowColor: 'black',
    shadowOffset: {width: 1.5, height: 1.5},
    shadowOpacity: 0.3,
    shadowRadius: 1,
    elevation: 1,
  },
  contentServiceIcon: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  contentCartPromotion: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  btnPromotion: {
    height: 25,
    borderRadius: 3,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  contentHiking: {
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 10,
  },
  promotionBanner: {
    height: Utils.scaleWithPixel(100),
    width: '100%',
    marginTop: 10,
  },
  line: {
    height: 1,
    marginTop: 10,
    marginBottom: 15,
  },
  iconContent: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 36,
    height: 36,
    borderRadius: 18,
    zIndex: 0,
  },
  itemService: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingTop: 10,
  },
  promotionItem: {
    width: Utils.scaleWithPixel(200),
    height: Utils.scaleWithPixel(250),
  },
  tourItem: {
    width: Utils.scaleWithPixel(135),
    height: Utils.scaleWithPixel(160),
  },
  titleView: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    right: 8,
    padding: 2,
    paddingRight:6,
    marginBottom: 88,
    backgroundColor: 'white',
    borderRadius: 10,
    zIndex: 1,
  },
  overlayText: {
    color: 'black',
    fontSize: 8,
    fontWeight: 'bold',
    marginLeft: 4,
    zIndex:1,
  },
  gridItemContainer: {
    flex: 1,
    marginHorizontal: 5,
    marginBottom: 20,
    position: 'relative',
    zIndex: 0,
  },
})
