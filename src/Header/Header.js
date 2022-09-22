import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import moment from 'moment';

import {
  getFormattedDate,
  calculateDaysArray,
  availableNumberOfDays,
} from '../utils';
import styles from './Header.styles';

const getDayTextStyles = (numberOfDays) => {
  const fontSize = numberOfDays === 7 ? 12 : 14;
  return {
    fontSize,
  };
};

const Column = ({
  column,
  numberOfDays,
  format,
  style,
  textStyle,
  today
}) => {
  const formattedDate = getFormattedDate(column, format);
  const fullTextStyle = [getDayTextStyles(7), textStyle];

  return (
    <View style={[styles.column, style]}>
      {moment(today).format('YYYY-MM-DD') === formattedDate ?
        <>
          {/* <Text style={[fullTextStyle, { color: '#2797BA', }]}>{moment(formattedDate).format('ddd')}</Text>
          <View style={{ width: 26, height: 26, borderColor: '#2797BA', borderRadius: 26, backgroundColor: '#2797BA', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={[fullTextStyle, { color: 'white', fontSize: 16 }]}>{moment(formattedDate).format('DD')}</Text>
          </View> */}
        </>
        :
        <>
          {/* <Text style={fullTextStyle}>{moment(formattedDate).format('ddd')}</Text>
          <View style={{ width: 26, height: 26, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={fullTextStyle}>{moment(formattedDate).format('DD')}</Text>
          </View> */}
        </>
      }
    </View>
  );
};

const Columns = ({
  columns,
  numberOfDays,
  format,
  style,
  textStyle,
  TodayComponent,
  today
}) => {
  return (
    <View style={styles.columns}>
      {columns.map((column) => {
        return (
          <Column
            style={style}
            textStyle={textStyle}
            key={column}
            column={column}
            numberOfDays={numberOfDays}
            format={format}
            TodayComponent={TodayComponent}
            today={today}
          />
        );
      })}
    </View>
  );
};

const WeekViewHeader = ({
  numberOfDays,
  initialDate,
  formatDate,
  style,
  textStyle,
  TodayComponent,
  rightToLeft,
  today
}) => {
  const columns = calculateDaysArray(initialDate, 7, false);

  return (
    <View style={styles.container}>
      {columns && (
        <Columns
          format={formatDate}
          columns={columns}
          numberOfDays={numberOfDays}
          style={style}
          textStyle={textStyle}
          TodayComponent={TodayComponent}
          today={today}
        />
      )}
    </View>
  );
};

WeekViewHeader.propTypes = {
  numberOfDays: PropTypes.oneOf(availableNumberOfDays).isRequired,
  initialDate: PropTypes.string.isRequired,
  formatDate: PropTypes.string,
  style: PropTypes.object,
  textStyle: PropTypes.object,
  rightToLeft: PropTypes.bool,
  TodayComponent: PropTypes.elementType,
};

WeekViewHeader.defaultProps = {
  formatDate: 'MMM D',
};

export default React.memo(WeekViewHeader);
