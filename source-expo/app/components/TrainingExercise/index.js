import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text} from '@components';
import PropTypes from 'prop-types';
import styles from './styles';
import {useTheme} from '@config';
import {useTranslation} from 'react-i18next';

export default function TrainingExercise(props) {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const {style, title, duration, onPress} = props;

  return (
    <TouchableOpacity
      style={[styles.contain, {shadowColor: colors.border}, style]}
      onPress={onPress}
      activeOpacity={0.9}>
      <View
        style={[
          styles.nameContent,
          {
            borderBottomColor: colors.card,
            backgroundColor: '#ce8c6c',
          },
        ]}>
        <Text body2 whiteColor semibold>
          {title}
        </Text>
      </View>
      <View
        style={[styles.mainContent, {backgroundColor: '#ce8c6c'}]}>
        <View style={{flex: 1, alignItems: 'flex-start'}}>
          <Text caption2 whiteColor>
            {'Duration / Reps'}
          </Text>
          <Text body1 whiteColor semibold>
            {duration}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

TrainingExercise.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  title: PropTypes.string,
  onPress: PropTypes.func
};

TrainingExercise.defaultProps = {
  style: {},
  title: '',
  onPress: () => {},
};
