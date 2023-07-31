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
  const {style, title, complete, past, currentDate, onPress} = props;

  return (
    <TouchableOpacity
      style={[styles.contain, {shadowColor: colors.border}, style]}
      onPress={onPress}
      activeOpacity={0.9}>
      {currentDate && (
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarCircle} />
          <View style={styles.progressBarLine} />
        </View>
      )}
      <View
        style={[
          styles.nameContent,
          {
            paddingVertical: 15,
            backgroundColor: past ? '#C1C1C1' : '#ce8c6c',
          },
        ]}>
        <Text body2 whiteColor semibold style={{ textDecorationLine: past ? 'line-through' : 'none' }}>
          {title}
        </Text>
        <View style={{ ...styles.overlay, backgroundColor: complete ? '#14A92A' : '#FF5D1C' }}>
          <Text style={styles.overlayText}>{complete ? 'Complete' : 'Incomplete'}</Text>
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
