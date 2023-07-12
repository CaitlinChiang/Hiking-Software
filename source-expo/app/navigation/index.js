import React, {useEffect} from 'react'
import {StatusBar, Platform, useColorScheme} from 'react-native'
import {NavigationContainer} from '@react-navigation/native'
import {
  createStackNavigator
} from '@react-navigation/stack'
import {useTheme, BaseSetting} from '@config'
import i18n from 'i18next'
import {initReactI18next} from 'react-i18next'
import {useSelector} from 'react-redux'

import Main from 'app/navigation/main'
/* Modal Screen only affect iOS */
import Loading from '@screens/Loading'
import Filter from '@screens/Filter'
import Search from '@screens/Search'

const RootStack = createStackNavigator()

export default function Navigator() {
  const language = useSelector(state => state.application.language)
  const {theme, colors} = useTheme()
  const isDarkMode = useColorScheme() === 'dark'

  useEffect(() => {
    i18n.use(initReactI18next).init({
      resources: BaseSetting.resourcesLanguage,
      lng: BaseSetting.defaultLanguage,
      fallbackLng: BaseSetting.defaultLanguage,
      compatibilityJSON: 'v3',
    })
  }, [])

  useEffect(() => {
    i18n.changeLanguage(language)
  }, [language])

  useEffect(() => {
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor(colors.primary, true)
    }
    StatusBar.setBarStyle(isDarkMode ? 'light-content' : 'dark-content', true)
  }, [colors.primary, isDarkMode])

  return (
    <NavigationContainer theme={theme}>
      <RootStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="Loading">
        <RootStack.Screen
          name="Loading"
          component={Loading}
          options={{gestureEnabled: false}}
        />
        <RootStack.Screen name="Main" component={Main} />
        <RootStack.Screen name="Filter" component={Filter} />
        <RootStack.Screen name="Search" component={Search} />
      </RootStack.Navigator>
    </NavigationContainer>
  )
}
