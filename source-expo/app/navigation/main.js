import React from 'react'
import {createStackNavigator} from '@react-navigation/stack'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {useSelector} from 'react-redux'
import {BaseColor, useTheme, useFont} from '@config'
import {useTranslation} from 'react-i18next'
import {Icon} from '@components'
/* Settings */
import NotFound from '@screens/NotFound'
/* Bottom Screen */
import TrainingPlan from '@screens/TrainingPlan'
import Explore from '@screens/Explore'
import BucketList from '@screens/BucketList'
import Profile from '@screens/Profile'
/* Pages */
import TrainingDetail from '@screens/TrainingDetail'
import HikingTrailDetail from '@screens/HikingTrailDetail'
import SignUp from '@screens/SignUp'
import SignIn from '@screens/SignIn'
import ResetPassword from '@screens/ResetPassword'
import ChangePassword from '@screens/ChangePassword'
/* Keeping for Styling */
import DashboardEvent from '@screens/DashboardEvent'

const MainStack = createStackNavigator()
const BottomTab = createBottomTabNavigator()

export default function Main() {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="BottomTabNavigator">
      <MainStack.Screen
        name="BottomTabNavigator"
        component={BottomTabNavigator}
      />

      <MainStack.Screen name="TrainingDetail" component={TrainingDetail} />
      <MainStack.Screen name="HikingTrailDetail" component={HikingTrailDetail} />
      <MainStack.Screen name="SignUp" component={SignUp} />
      <MainStack.Screen name="SignIn" component={SignIn} />
      <MainStack.Screen name="ResetPassword" component={ResetPassword} />
      <MainStack.Screen name="ChangePassword" component={ChangePassword} />
      <MainStack.Screen name="NotFound" component={NotFound} />
    </MainStack.Navigator>
  )
}

function BottomTabNavigator() {
  const {t} = useTranslation()
  const {colors} = useTheme()
  const font = useFont()
  const auth = useSelector(state => state.auth)
  const login = auth.login.success

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarInactiveTintColor: BaseColor.grayColor,
        tabBarActiveTintColor: colors.primary,
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: font,
          paddingBottom: 2,
        }
      }}>
      <BottomTab.Screen
        name="Train"
        component={TrainingPlan}
        options={{
          title: t('Train'),
          tabBarIcon: ({color}) => {
            return <Icon color={color} name="dumbbell" size={20} solid />
          }
        }}
      />
      <BottomTab.Screen
        name="Explore"
        component={Explore}
        options={{
          title: t('Explore'),
          tabBarIcon: ({color}) => {
            return <Icon color={color} name="search" size={20} solid />
          }
        }}
      />
      <BottomTab.Screen
        name="BucketList"
        component={BucketList}
        options={{
          title: t('Bucket List'),
          tabBarIcon: ({color}) => {
            return <Icon color={color} name="heart" size={20} solid />
          }
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={{
          title: t('account'),
          tabBarIcon: ({color}) => {
            return <Icon solid color={color} name="user-circle" size={20} />
          }
        }}
      />
    </BottomTab.Navigator>
  )
}
