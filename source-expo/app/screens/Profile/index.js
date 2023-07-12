import React, {useState} from 'react';
import {View, ScrollView, TouchableOpacity } from 'react-native';
import {useDispatch} from 'react-redux';
import {AuthActions} from '@actions';
import {BaseStyle, useTheme} from '@config';
import {
  SafeAreaView,
  Text,
  ProfileDetail,
  TextInput,
  DatePicker
} from '@components';
import styles from './styles';
import {UserData} from '@data';
import {useTranslation} from 'react-i18next';
import Slider from '@react-native-community/slider';
import RNPickerSelect from "react-native-picker-select";
// import RadarChartComponent from './Chart';

export default function Profile({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();

  const [loading, setLoading] = useState(false);
  const [userData] = useState(UserData[0]);
  const [id, setId] = useState(UserData[0].id);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState('');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [image] = useState(UserData[0].image);
  const [physicalSustainability, setPhysicalSustainability] = useState(1);
  const [upperBodyStrength, setUpperBodyStrength] = useState(1);
  const [lowerBodyStrength, setLowerBodyStrength] = useState(1);
  const [balanceStability, setBalanceStability] = useState('');
  const [flexibility, setFlexibility] = useState('');
  const [outdoorExperienceFrequency, setOutdoorExperienceFrequency] = useState('');
  const [outdoorExperienceComfort, setOutdoorExperienceComfort] = useState('');
  
  const dispatch = useDispatch();

  onLogOut = () => {
    setLoading(true);
    dispatch(AuthActions.authentication(false, response => {}));
  };

  return (
    <View style={{flex: 1}}>
      <SafeAreaView
        style={{ marginTop: 60, ...BaseStyle.safeAreaView }}
        edges={['right', 'left', 'bottom']}>
        <ScrollView>
          <View style={styles.contain}>
            {/* <RadarChartComponent /> */}

            <View style={styles.contentTitle}>
              <Text headline semibold>
                {'Name'}
              </Text>
            </View>
            <TextInput
              onChangeText={text => setName(text)}
              placeholder={'Input Name'}
              value={name}
            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                {'Email'}
              </Text>
            </View>
            <TextInput
              onChangeText={text => setEmail(text)}
              placeholder={'Input Email'}
              value={email}
            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                {'Gender'}
              </Text>
            </View>
            <TextInput
              onChangeText={text => setGender(text)}
              placeholder={'Input Gender'}
              value={gender}
            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                {'Birthday'}
              </Text>
            </View>
            <DatePicker />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                {'Height (cm)'}
              </Text>
            </View>
            <TextInput
              onChangeText={text => setHeight(text)}
              placeholder={'Input Weight'}
              value={height}
            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                {'Weight (kg)'}
              </Text>
            </View>
            <TextInput
              onChangeText={text => setWeight(text)}
              placeholder={'Input Weight'}
              value={weight}
            />
          </View>

          <View>
            <Text style={{ padding: 20 }} headline semibold>Rate your ability to sustain physical activity for an extended period:</Text>
            <Text style={{ textAlign: 'center' }} headline semibold>{physicalSustainability}</Text>
            <Slider
              style={{ marginRight: 50, marginLeft: 50 }}
              minimumValue={1}
              maximumValue={5}
              step={1}
              minimumTrackTintColor="blue"
              maximumTrackTintColor="grey"
              value={physicalSustainability}
              onValueChange={(value) => setPhysicalSustainability(value)}
            />
            <View style={{ padding: 20 }}>
              <Text>1 (Very low endurance)</Text>
              <Text>2 (Low endurance)</Text>
              <Text>3 (Moderate endurance)</Text>
              <Text>4 (Above average endurance)</Text>
              <Text>5 (Exceptional endurance)</Text>
            </View>

            <Text style={{ padding: 20 }} headline semibold>Rate your perceived upper body strength:</Text>
            <Text style={{ textAlign: 'center' }} headline semibold>{upperBodyStrength}</Text>
            <Slider
              style={{ marginRight: 50, marginLeft: 50 }}
              minimumValue={1}
              maximumValue={10}
              step={1}
              minimumTrackTintColor="blue"
              maximumTrackTintColor="grey"
              value={upperBodyStrength}
              onValueChange={(value) => setUpperBodyStrength(value)}
            />
            <View style={{ padding: 20 }}>
              <Text>1 (Very weak)</Text>
              <Text>3 (Low strength)</Text>
              <Text>5 (Average strength)</Text>
              <Text>7 (Above average strength)</Text>
              <Text>10 (Very strong)</Text>
            </View>

            <Text style={{ padding: 20 }} headline semibold>Rate your perceived lower body strength:</Text>
            <Text style={{ textAlign: 'center' }} headline semibold>{lowerBodyStrength}</Text>
            <Slider
              style={{ marginRight: 50, marginLeft: 50 }}
              minimumValue={1}
              maximumValue={10}
              step={1}
              minimumTrackTintColor="blue"
              maximumTrackTintColor="grey"
              value={lowerBodyStrength}
              onValueChange={(value) => setLowerBodyStrength(value)}
            />
            <View style={{ padding: 20 }}>
              <Text>1 (Very weak)</Text>
              <Text>3 (Low strength)</Text>
              <Text>5 (Average strength)</Text>
              <Text>7 (Above average strength)</Text>
              <Text>10 (Very strong)</Text>
            </View>

            <View>
              <View style={{ padding: 20 }}>
                <Text style={{ marginBottom: 10 }} headline semibold>Balance and Stability:</Text>
                <RNPickerSelect
                  onValueChange={(value) => setBalanceStability}
                  items={[
                    { label: "Not Confident at All", value: "notConfident" },
                    { label: "Somewhat Confident", value: "somewhatConfident" },
                    { label: "Very Confident", value: "veryConfident" }
                  ]}
                  style={styles.inputIOS}
                  value={balanceStability}
                />

                <Text style={{ marginBottom: 10, marginTop: 50 }} headline semibold>Flexibility:</Text>
                <RNPickerSelect
                  onValueChange={(value) => setFlexibility(value)}
                  items={[
                    { label: "Yes, easily", value: "easily" },
                    { label: "Yes, but with some difficulty", value: "withDifficulty" },
                    { label: "No, unable to reach toes", value: "unable" }
                  ]}
                  style={styles.inputIOS}
                  value={flexibility}
                />
                
                <Text style={{ marginBottom: 10, marginTop: 50 }} headline semibold>Outdoor Experience:</Text>
                <RNPickerSelect
                  onValueChange={(value) => setOutdoorExperienceFrequency(value)}
                  items={[
                    { label: "Rarely or never", value: "rarelyNever" },
                    { label: "Occasionally (once a month or less)", value: "occasionally" },
                    { label: "Regularly (a few times a month)", value: "regularly" },
                    { label: "Frequently (at least once a week)", value: "frequently" }
                  ]}
                  style={styles.inputIOS}
                  value={outdoorExperienceFrequency}
                />
                
                <Text style={{ marginBottom: 10, marginTop: 50 }} headline semibold>How comfortable are you with hiking on challenging terrains?</Text>
                <RNPickerSelect
                  onValueChange={(value) => setOutdoorExperienceComfort(value)}
                  items={[
                    { label: "Not comfortable at all", value: "notComfortable" },
                    { label: "Somewhat comfortable", value: "somewhatComfortable" },
                    { label: "Very comfortable", value: "veryComfortable" }
                  ]}
                  style={styles.inputIOS}
                  value={outdoorExperienceComfort}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}
