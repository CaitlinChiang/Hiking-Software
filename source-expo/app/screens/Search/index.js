import React, {useState} from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {BaseStyle, useTheme} from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  Button,
  Text,
  TextInput,
  BucketListItem
} from '@components';
import {useTranslation} from 'react-i18next';
import { HikingTrailsData } from '@data';

export default function Search({navigation}) {
  const {colors} = useTheme();
  const {t} = useTranslation();
  const offsetKeyboard = Platform.select({
    ios: 0,
    android: 20,
  });

  const [keyword, setKeyword] = useState('');
  const [loading, setLoading] = useState(false);
  const [hikingTrails, setHikingTrails] = useState(HikingTrailsData);
  const [filteredHikingTrails, setFilteredHikingTrails] = useState(hikingTrails);

  const fuzzySearch = (text, target) => {
    const pattern = text
      .split('')
      .map((char) => `(?=.*${char})`)
      .join('');
    const regex = new RegExp(pattern, 'i');
    return regex.test(target);
  };

  const handleSearch = (text) => {
    setKeyword(text);

    const filteredTrails = hikingTrails.filter((trail) =>
      fuzzySearch(text.toLowerCase(), trail.name.toLowerCase()) ||
      fuzzySearch(text.toLowerCase(), trail.location.toLowerCase())
    );

    setFilteredHikingTrails(filteredTrails);
  };

  return (
    <View style={{flex: 1}}>
      <Header
        title={t('search')}
        renderLeft={() => {
          return <Icon name="arrow-left" size={20} color={colors.primary} />;
        }}
        onPressLeft={() => {
          navigation.goBack();
        }}
      />
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'left', 'bottom']}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'android' ? 'height' : 'padding'}
          keyboardVerticalOffset={offsetKeyboard}
          style={{flex: 1}}>
          <ScrollView contentContainerStyle={{padding: 20}}>
            <TextInput
              onChangeText={(text) => handleSearch(text)}
              placeholder={'Search for a Hiking Trail'}
              value={keyword}
            />
            <View style={{ paddingHorizontal: 0, marginBottom: 20 }}>
              {filteredHikingTrails.length > 0 ? (
                filteredHikingTrails.map((trail, index) => (
                  <BucketListItem
                    key={index}
                    name={trail.name}
                    location={trail.location}
                    summitHeight={trail.summitHeight}
                    duration={trail.duration}
                    ydsGrading={trail.ydsGrading}
                    ydsClass={trail.ydsClass}
                    style={{ marginTop: 10, width: '100%' }}
                    image={trail.imageSrc}
                    onPress={() =>
                      navigation.navigate('HikingTrailDetail', {
                        name: trail.name,
                        location: trail.location,
                        duration: trail.duration,
                        summitHeight: trail.summitHeight,
                        imageSrc: trail.imageSrc,
                      })
                    }  
                  />
                ))
              ) : (
                <Text style={{ marginTop: 20, textAlign: 'center', fontWeight: 500, fontSize: 20 }}>No hiking trails found.</Text>
              )}
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}
