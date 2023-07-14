import React, {useState} from 'react'
import {View, Animated, TouchableOpacity, FlatList} from 'react-native'
import {
  Image,
  Text,
  Icon,
  HikingItem,
  Card,
  Button,
  SafeAreaView,
  EventCard,
} from '@components'
import {BaseStyle, Images, useTheme} from '@config'
import * as Utils from '@utils'
import styles from './styles'
import { HikingTrailsData } from '@data'
import {useTranslation} from 'react-i18next'
import { Ionicons } from '@expo/vector-icons';

export default function Home({navigation}) {
  const {t} = useTranslation()
  const {colors} = useTheme()
  const [icons] = useState([
    {
      icon: 'thumbs-up',
      name: 'Recommended',
      route: 'Explore',
    },
    {
      icon: 'location-arrow',
      name: 'Nearby',
      route: 'Explore',
    },
    {
      icon: 'star',
      name: 'Popular',
      route: 'Explore',
    }
  ])
  const [hikingTrails] = useState(HikingTrailsData)
  const [heightHeader, setHeightHeader] = useState(Utils.heightHeader())
  const deltaY = new Animated.Value(0)

  const renderIconService = () => {
    return (
      <FlatList
        style={{ marginTop: 10 }}
        data={icons}
        numColumns={4}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}, i) => {
          return (
            <TouchableOpacity
              key={i}
              style={styles.itemService}
              activeOpacity={0.9}
              onPress={() => {
                navigation.navigate(item.route)
              }}>
              <View
                style={[styles.iconContent, {backgroundColor: colors.card}]}>
                <Icon name={item.icon} size={18} color={colors.primary} solid />
              </View>
              <Text footnote grayColor numberOfLines={1}>
                {t(item.name)}
              </Text>
            </TouchableOpacity>
          )
        }}
      />
    )
  }

  const heightImageBanner = Utils.scaleWithPixel(140)
  const marginTopBanner = heightImageBanner - heightHeader

  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}} edges={['right', 'left']}>
        <FlatList
          onContentSizeChange={() => setHeightHeader(Utils.heightHeader())}
          scrollEventThrottle={8}
          ListHeaderComponent={
            <View style={{ paddingHorizontal: 20 }}>
              <View
                style={{ paddingTop: 60 }}>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Search')}
                  activeOpacity={0.9}>
                  <View
                    style={[
                      BaseStyle.searchInput,
                      {
                        backgroundColor: colors.card,
                        borderRadius: 30,
                        flexDirection: 'row',
                        alignItems: 'center',
                        paddingHorizontal: 10
                      }
                    ]}
                  >
                    <Ionicons name="search" size={24} color="gray" />
                    <Text body1 grayColor style={{ paddingLeft: 10 }}>
                      {'Search for a Hiking Trail'}
                    </Text>
                  </View>
                </TouchableOpacity>
                {renderIconService()}
              </View>
            </View>
          }
          ListFooterComponent={
            <View style={{ paddingTop: 20 }}>
              <FlatList
                columnWrapperStyle={{ paddingLeft: 5, paddingRight: 20 }}
                numColumns={2}
                data={hikingTrails}
                keyExtractor={(item, index) => item.id}
                renderItem={({item, index}) => (
                  <HikingItem
                    grid
                    key={item.id}
                    image={item.imageSrc}
                    name={item.name}
                    location={item.location}
                    duration={item.duration}
                    summitHeight={item.summitHeight}
                    style={{marginLeft: 15, marginBottom: 15}}
                    onPress={() =>
                      navigation.navigate('HikingTrailDetail', {
                        name: item.name,
                        location: item.location,
                        duration: item.duration,
                        summitHeight: item.summitHeight,
                        imageSrc: item.imageSrc,
                      })
                    }                    
                  />
                )}
              />
            </View>
          }
        />
      </SafeAreaView>
    </View>
  )
}
