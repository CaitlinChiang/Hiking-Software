import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Animated
} from 'react-native';
import {BaseColor, Images, useTheme} from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  Button
} from '@components';
import * as Utils from '@utils';
import {InteractionManager} from 'react-native';
import styles from './styles';
import {useTranslation} from 'react-i18next';
import { Calendar } from 'react-native-calendars';

export default function HotelDetail({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();

  const [selectedDates, setSelectedDates] = useState({});
  const [rightIcon, setRightIcon] = useState('heart')

  const [heightHeader, setHeightHeader] = useState(Utils.heightHeader());
  const [renderMapView, setRenderMapView] = useState(false);
  const deltaY = new Animated.Value(0);

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setRenderMapView(true);
    });
  }, []);

  const heightImageBanner = Utils.scaleWithPixel(250, 1);
  const marginTopBanner = heightImageBanner - heightHeader - 40;

  // Handler for when the button is pressed
  const handleButtonPress = () => {
    // Open the calendar popup
    navigation.navigate('Calendar');
  };
  
  // Handler for when a date is selected
  const handleDateSelect = (date) => {
    if (!selectedDates.startDate) {
      setSelectedDates({ startDate: date.dateString });
    } else if (!selectedDates.endDate) {
      const { startDate } = selectedDates;
      const endDate = date.dateString;
      // Perform any necessary logic with the selected start and end dates
      console.log('Selected start date:', startDate);
      console.log('Selected end date:', endDate);
      setSelectedDates({ startDate: null, endDate: null });
    }
  };

  const handleRightIconPress = () => {
    setRightIcon('heart');
  };

  return (
    <View style={{flex: 1}}>
      <Animated.Image
        source={Images.trail1}
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
        renderRight={() => {
          return <Icon name={rightIcon} size={20} color={BaseColor.whiteColor} />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
        onPressRight={() => {
          handleRightIconPress()
        }}
      />
      <SafeAreaView style={{flex: 1}} edges={['right', 'left', 'bottom']}>
        <ScrollView
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {y: deltaY},
              },
            },
          ])}
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
                Puncak Jaya
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
                    Country, Specific Address
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
                    1,600
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
                    4884
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
                    3284
                  </Text>
                </View>
              </View>

              <View style={styles.itemReason}>
                <Icon name="road" size={18} color={colors.accent} />
                <View style={{marginLeft: 8}}>
                  <Text subhead semibold>
                    Trail Distance
                  </Text>
                  <Text body2>
                    53205
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
                    7 Days
                  </Text>
                </View>
              </View>

              <View style={styles.itemReason}>
                <Icon name="greater-than" size={18} color={colors.accent} />
                <View style={{marginLeft: 15}}>
                  <Text subhead semibold>
                    YDS Grading
                  </Text>
                  <Text body2>
                    VII
                  </Text>
                </View>
              </View>

              <View style={styles.itemReason}>
                <Icon name="greater-than" size={18} color={colors.accent} />
                <View style={{marginLeft: 15}}>
                  <Text subhead semibold>
                    YDS Class
                  </Text>
                  <Text body2>
                    4
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
                    {'May - Oct: DRY'}
                    {'\n'}
                    {'Dec - Mar: WET'}
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

        {selectedDates.startDate && !selectedDates.endDate && (
          <Calendar
            markedDates={{
              [selectedDates.startDate]: { startingDay: true, color: 'green' },
            }}
            onDayPress={handleDateSelect}
          />
        )}
        {selectedDates.startDate && selectedDates.endDate && (
          <Calendar
            markedDates={{
              [selectedDates.startDate]: { startingDay: true, color: 'green' },
              [selectedDates.endDate]: { endingDay: true, color: 'green' },
            }}
            onDayPress={handleDateSelect}
          />
        )}
      </SafeAreaView>
    </View>
  );
}
