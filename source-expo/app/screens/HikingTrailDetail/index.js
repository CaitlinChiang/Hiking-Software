import React, {useState, useEffect} from 'react';
// Imports for firebase
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore'
import { HikingTrailsData } from '@data';

//imports for calender
import { Calendar } from 'react-native-calendars';
import CalendarWithPeriodFill from './calender';


// Imports for firebase (you can get this from firebase.js as well to make it cleaner)
const firebaseConfig = {
  apiKey: "AIzaSyD46mMFUwZ7AlCJWPqOXK3SKw1BuIihlFM",
  authDomain: "hikingproject-3abef.firebaseapp.com",
  projectId: "hikingproject-3abef",
  storageBucket: "hikingproject-3abef.appspot.com",
  messagingSenderId: "23275209713",
  appId: "1:23275209713:web:3579558675b39890b47a50",
  measurementId: "G-7H0L154L10"
};

import {
  Alert,
  View,
  ScrollView,
  Animated,
  StyleSheet
} from 'react-native';
import {BaseColor, Images, useTheme} from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  Button
} from '@components';
import {TouchableOpacity, Modal } from 'react-native';
import { SvgXml } from 'react-native-svg';
import * as Utils from '@utils';
import {InteractionManager} from 'react-native';
import styles from './styles';
import {useTranslation} from 'react-i18next';
// import { Calendar } from 'react-native-calendars';

// Important initialization. must be done in index.js
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ...
const heartSolidSvg = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path fill="white" d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z"/></svg>`;
const heartRegularSvg = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512"><path fill="white" d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z"/></svg>`;
// ...

export default function HikingTrailDetail({navigation, route}) {
  // Calender initiations
  const [showCalendar, setShowCalendar] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [start, setStart] = useState({});
  const [end, setEnd] = useState({});

  
  

  const {colors} = useTheme();
  const {t} = useTranslation();
  const { name, imageSrc } = route.params;
  const [selectedDates, setSelectedDates] = useState({});
  const [rightIcon, setRightIcon] = useState('heart')

  const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
  const [renderMapView, setRenderMapView] = useState(false);
  const deltaY = new Animated.Value(0);
  const [isFilled, setIsFilled] = useState(false);
  const [trail, setTrailData] = useState(null);

  useEffect(() => {
    const fetchHikingTrailData = async () => {
      try {
        const userId = 'jxihUCNoi0396wkQR2gx'; // Replace with the actual user ID
        const userDocRef = doc(db, 'users', userId);
        const userDocSnapshot = await getDoc(userDocRef);
  
        if (userDocSnapshot.exists()) {
          const bucketList = userDocSnapshot.get('bucketlist') || [];
          const existsInBucketList = bucketList.some(item => item.name === name);
          setIsFilled(existsInBucketList);
        } else {
          console.log('User document does not exist');
        }
      } catch (error) {
        console.log('Error fetching hiking trail data:', error);
      }
    };
  
    fetchHikingTrailData();
  }, []);

  useEffect(() => {
    const trail = HikingTrailsData.find((trail) => trail.name === name);
    setTrailData(trail);
  }, [{ name }]);

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setRenderMapView(true);
    });
  }, []);

  const heightImageBanner = Utils.scaleWithPixel(250, 1);
  const marginTopBanner = heightImageBanner - heightHeader - 40;

  const handleButtonPress = async () => {
    setShowCalendar(true);

    const userId = 'jxihUCNoi0396wkQR2gx'; 
    const savedDocRef = doc(db, 'users', userId);
    const savedDocSnapshot = await getDoc(savedDocRef);

    const savedDoc = savedDocSnapshot.data()|| {};
    const updatedDates = { ...savedDoc.dates, mountainName: name };

    updateDoc(savedDocRef, {
      dates: updatedDates
    }).then(() => {
      console.log('Mountain name stored in Firebase:', name);
    }).catch((error) => {
      console.log('Error storing');
    });
  };

  useEffect(() => {
    const fetchBucketlistData = async () => {
      try {
        const userId = 'jxihUCNoi0396wkQR2gx';
        const bucketListRef = doc(db, 'users', userId);
        const bucketListDoc = await getDoc(bucketListRef);
        if (bucketListDoc.exists()) {
          const bucketlistData = bucketListDoc.data();
          const isTrailInBucketlist = bucketlistData.bucketlist.some(item => item.name === name);
          setIsFilled(isTrailInBucketlist);
        }
      } catch (error) {
        console.log('Error:', error);
      }
    };
  
    fetchBucketlistData();
  }, []);


  const handleHeartIconPress = async () => {
    try {
      const userId = 'jxihUCNoi0396wkQR2gx';
      const bucketListRef = doc(db, 'users', userId);
  
      if (isFilled) {
        // Remove from bucketlist
        await updateDoc(bucketListRef, {
          bucketlist: arrayRemove({name})
        });
      } else {
        // Add to bucketlist
        await updateDoc(bucketListRef, {
          bucketlist: arrayUnion({name})
        });
      }
  
      setIsFilled(!isFilled);
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <View style={{flex: 1}}>
    <Animated.Image
      source={{ uri: imageSrc }} // Using this instead for URI
      // source={require(Image.trail1)} //
      style={[
        styles.imgBanner,
        {
          height: deltaY.interpolate({
            inputRange: [
              0,
              Utils.scaleWithPixel(200),
              Utils.scaleWithPixel(200),
              ],
              outputRange: [heightImageBanner, heightHeader, heightHeader], 
            }),
          },
        ]}
      />
      <Header
        title=""
        renderLeft={() => {
          return (
            <Icon
              name="arrow-left"
              size={20}
              color={BaseColor.whiteColor}
              enableRTL={true}
            />
          );
        }}
        renderRight={() => (
          <TouchableOpacity onPress={handleHeartIconPress}>
            <SvgXml
              xml={isFilled ? heartSolidSvg : heartRegularSvg}
              width={24}
              height={24}
              fill={isFilled ? 'red' : 'white'}
            />
          </TouchableOpacity>
        )}
        onPressLeft={() => {
          navigation.goBack();
        }}
      
      />
      <SafeAreaView style={{flex: 1}} edges={['right', 'left', 'bottom']}>
        <ScrollView
          onContentSizeChange={() => setHeightHeader(Utils.heightHeader())}
          scrollEventThrottle={8}>
          <View style={{paddingHorizontal: 20}}>
            <View
              style={[
                styles.contentBoxTop,
                {
                  marginTop: marginTopBanner,
                  backgroundColor: colors.card,
                  shadowColor: colors.border,
                  borderColor: colors.border,
                },
              ]}>
              <Text title2 semibold style={{marginBottom: 10}}>
                {name}
              </Text>
              <Text
                body2
                style={{
                  marginTop: 10,
                  textAlign: 'center',
                }}>
                Description of mountain
              </Text>
            </View>

            <View>
              <View style={styles.itemReason}>
                <Icon name="map-marker-alt" size={18} color={colors.accent} />
                <View style={{marginLeft: 15}}>
                  <Text subhead semibold>
                    Location
                  </Text>
                  <Text body2>
                    {trail?.location || ''}
                  </Text>
                </View>
              </View>

              <View style={styles.itemReason}>
                <Icon name="hourglass-start" size={18} color={colors.accent} />
                <View style={{marginLeft: 15}}>
                  <Text subhead semibold>
                    Starting Height
                  </Text>
                  <Text body2>
                    {trail?.startingHeight || ''}
                  </Text>
                </View>
              </View>

              <View style={styles.largerItemReason}>
                <Icon name="mountain" size={18} color={colors.accent} />
                <View style={{marginLeft: 10}}>
                  <Text subhead semibold>
                    Summit Height
                  </Text>
                  <Text body2>
                    {trail?.summitHeight || ''}
                  </Text>
                </View>
              </View>

              <View style={styles.itemReason}>
                <Icon name="arrow-up" size={18} color={colors.accent} />
                <View style={{marginLeft: 12}}>
                  <Text subhead semibold>
                    Altitude Gain
                  </Text>
                  <Text body2>
                    {trail?.altitudeGain || ''}
                  </Text>
                </View>
              </View>

              <View style={styles.itemReason}>
                <Icon name="clock" size={18} color={colors.accent} />
                <View style={{marginLeft: 10}}>
                  <Text subhead semibold>
                    Duration
                  </Text>
                  <Text body2>
                    {trail?.duration || ''}
                  </Text>
                </View>
              </View>

              <View style={styles.itemReason}>
                <Icon name="greater-than" size={18} color={colors.accent} />
                <View style={{marginLeft: 15}}>
                  <Text subhead semibold>
                    Physical Grading
                  </Text>
                  <Text body2>
                    {trail?.ydsGrading || ''}
                  </Text>
                </View>
              </View>

              <View style={styles.largerItemReason}>
                <Icon name="cloud-sun" size={18} color={colors.accent} />
                <View style={{marginLeft: 10}}>
                  <Text subhead semibold>
                    Weather
                  </Text>
                  <Text body2>
                    {trail?.weather || ''} 
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>

        <View
          style={{ paddingVertical: 10, paddingHorizontal: 20 }}>
          <Button onPress={handleButtonPress}>
            {'Book to Calendar'}
          </Button>
        </View>
      <Modal
        visible={showCalendar}
        onRequestClose={handleCalendarClose}
        animationType="slide"
        transparent={true}
      >
        <View style={stylesforcal.modalContainer}>
          <View style={stylesforcal.modalContent}>
            <CalendarWithPeriodFill start={start} end={end} />
          {/* Close Button */}
            <View style={stylesforcal.closeButtonContainer}>
              <Button onPress={handleCalendarClose} style={stylesforcal.closeButton}>
                <Text style={stylesforcal.closeButtonText}>Close</Text>
              </Button>
            </View>
            {/* <Button onPress={handlePrintDates}>{"Print"}</Button> */}
          </View>
        </View>
      </Modal>
      </SafeAreaView>
    </View>
  );
}

const stylesforcal = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
  },

  closeButtonText: {
    color: 'white', 
    fontWeight: 'bold'
  },
});

