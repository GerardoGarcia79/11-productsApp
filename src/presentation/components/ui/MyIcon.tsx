import {Icon, useTheme} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet} from 'react-native';

interface Props {
  name: string;
  color?: string;
  white?: boolean;
}

export const MyIcon = ({color, name, white = false}: Props) => {
  const theme = useTheme();
  let iconColor: string;

  if (white) {
    iconColor = theme['color-info-100'];
  } else if (!color) {
    iconColor = theme['text-basic-color'];
  } else {
    iconColor = theme[color] ? theme[color] : color;
  }

  return (
    <Icon
      style={[styles.icon, {tintColor: iconColor}]} // Force tintColor
      name={name}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 32,
    height: 32,
  },
});
