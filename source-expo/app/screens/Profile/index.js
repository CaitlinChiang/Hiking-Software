import React, {useState} from 'react';
import {View, ScrollView, TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';
import {AuthActions} from '@actions';
import {BaseStyle, useTheme} from '@config';
import {
  Header,
  SafeAreaView,
  Icon,
  Text,
  Button,
  ProfileDetail,
  ProfilePerformance,
  TextInput
} from '@components';
import styles from './styles';
import {UserData} from '@data';
import {useTranslation} from 'react-i18next';

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

  const dispatch = useDispatch();

  onLogOut = () => {
    setLoading(true);
    dispatch(AuthActions.authentication(false, response => {}));
  };

  return (
    <View style={{flex: 1}}>
      <Header
        title={t('profile')}
        renderRight={() => {
          return <Icon name="bell" size={24} color={colors.primary} />;
        }}
        onPressRight={() => {
          navigation.navigate('Notification');
        }}
      />
      <SafeAreaView
        style={BaseStyle.safeAreaView}
        edges={['right', 'left', 'bottom']}>
        <ScrollView>
          <View style={styles.contain}>
            <ProfileDetail
              image={userData.image}
              textFirst={userData.name}
              point={userData.point}
              textSecond={userData.address}
              textThird={userData.id}
            />
            <ProfilePerformance
              data={userData.performance}
              style={{marginTop: 20, marginBottom: 20}}
            />
            <TouchableOpacity
              style={[
                styles.profileItem,
                {borderBottomColor: colors.border, borderBottomWidth: 1},
              ]}
              onPress={() => {
                navigation.navigate('ChangePassword');
              }}>
              <Text body1>{t('change_password')}</Text>
              <Icon
                name="angle-right"
                size={18}
                color={colors.primary}
                style={{marginLeft: 5}}
                enableRTL={true}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.profileItem,
                {borderBottomColor: colors.border, borderBottomWidth: 1},
              ]}
              onPress={() => navigation.navigate('MyPaymentMethod')}>
              <Text body1>{t('my_cards')}</Text>
              <Icon
                name="angle-right"
                size={18}
                color={colors.primary}
                style={{marginLeft: 5}}
                enableRTL={true}
              />
            </TouchableOpacity>
            <View style={styles.contentTitle}>
              <Text headline semibold>
                {'Name'}
              </Text>
            </View>
            <TextInput
              onChangeText={text => setName(text)}
              value={name}
            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                {'Email'}
              </Text>
            </View>
            <TextInput
              onChangeText={text => setEmail(text)}
              placeholder={t('input_email')}
              value={email}
            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                {'Gender'}
              </Text>
            </View>
            <TextInput
              onChangeText={text => setGender(text)}
              placeholder={t('input_email')}
              value={gender}
            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                {'Birthday'}
              </Text>
            </View>
            <TextInput
              onChangeText={text => setBirthday(text)}
              placeholder={t('input_email')}
              value={birthday}
            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                {'Height'}
              </Text>
            </View>
            <TextInput
              onChangeText={text => setHeight(text)}
              placeholder={t('input_email')}
              value={height}
            />
            <View style={styles.contentTitle}>
              <Text headline semibold>
                {'Weight'}
              </Text>
            </View>
            <TextInput
              onChangeText={text => setWeight(text)}
              placeholder={t('input_email')}
              value={weight}
            />
          </View>
        </ScrollView>
        <View style={{paddingHorizontal: 20, paddingVertical: 15}}>
          <Button full loading={loading} onPress={() => onLogOut()}>
            {t('sign_out')}
          </Button>
        </View>
      </SafeAreaView>
    </View>
  );
}
