import React, {useState} from 'react'
import {RefreshControl, View, TouchableOpacity, FlatList} from 'react-native'
import {
  Text,
  Icon,
  HikingItem,
  SafeAreaView
} from '@components'
import {BaseStyle, useTheme} from '@config'
import styles from './styles'
import { HikingTrailsData } from '@data'
import {useTranslation} from 'react-i18next'
import { Ionicons } from '@expo/vector-icons'

export default function Home({navigation}) {
  const {t} = useTranslation()
  const {colors} = useTheme()
  const [icons] = useState([
    {
      icon: 'thumbs-up',
      name: 'For You',
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
  const [refreshing, setRefreshing] = React.useState(false)

  const onRefresh = React.useCallback(() => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }, [])

  const getRandomTrail = () => {
    const randomIndex = Math.floor(Math.random() * hikingTrails.length)
    return hikingTrails[randomIndex]
  }

  const renderIconService = () => {
    const [selectedIcon, setSelectedIcon] = useState('For You')
  
    return (
      <FlatList
        style={{ marginTop: 10 }}
        data={icons}
        numColumns={4}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}, i) => {
          const isSelected = selectedIcon === item.name
  
          return (
            <TouchableOpacity
              key={i}
              style={styles.itemService}
              activeOpacity={0.9}
              onPress={() => {
                setSelectedIcon(item.name)
                setRefreshing(true)
                setTimeout(() => {
                  setRefreshing(false)
                }, 2000)
              }}
            >
              <View
                style={[
                  styles.iconContent,
                  {
                    backgroundColor: isSelected ? '#ce8c6c' : colors.card,
                    borderColor: isSelected ? '#ce8c6c' : colors.background,
                    borderWidth: isSelected ? 2 : 1,
                  }
                ]}
              >
                <Icon name={item.icon} size={18} color={isSelected ? colors.background : 'grey'} solid />
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
  
  return (
    <View style={{flex: 1}}>
      <SafeAreaView style={{flex: 1}} edges={['right', 'left']}>
        <FlatList
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
                data={Array.from({length: 10}, () => getRandomTrail())}
                keyExtractor={(item, index) => item.id}
                renderItem={({item, index}) => (
                  <View style={styles.gridItemContainer}>
                    <View style={styles.overlay}>
                      <Text style={styles.overlayText}>{item.ydsGrading}</Text>
                    </View>
                    <HikingItem
                      grid
                      key={item.id}
                      image={item.imageSrc}
                      name={item.name}
                      location={item.location}
                      duration={item.duration}
                      summitHeight={item.summitHeight}
                      ydsGrading={item.ydsGrading}
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
                  </View>
                )}
              />
            </View>
          }
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
        />
      </SafeAreaView>
    </View>
  )
}
