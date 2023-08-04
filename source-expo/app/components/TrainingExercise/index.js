import React, { useState } from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Text} from '@components';
import PropTypes from 'prop-types';
import styles from './styles';
import {useTheme} from '@config';
import {useTranslation} from 'react-i18next';
import { CheckBox } from '@rneui/themed';

export default function TrainingExercise(props) {
  const {t} = useTranslation();
  const {colors} = useTheme();
  const {style, title, duration, onPress} = props;
  const [isSelected, setSelection] = useState(false);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ width: 300 }}>
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
      </View>

      <View style={{ width: 10, marginLeft: -20, marginTop: -20 }}>
        <CheckBox
          checked={isSelected}
          onPress={() => setSelection(!isSelected)}
        />
      </View>
    </View>
  );
}

TrainingExercise.propTypes = {
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  title: PropTypes.string,
  value: PropTypes.bool,
  onValueChange: PropTypes.func
};

TrainingExercise.defaultProps = {
  style: {},
  title: '',
  value: false,
  onValueChange: () => {},
};
