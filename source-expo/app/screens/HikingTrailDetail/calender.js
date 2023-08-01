import React, { setState, useState, useEffect } from 'react';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import { MaterialIcons } from '@expo/vector-icons';
import _isEmpty from 'lodash/isEmpty'
import moment from 'moment';
import handleDateSelection from './DateSelectionUtils';


export default class CalendarWithPeriodFill extends React.Component {
    state = {
      start: {},
      end: {}, 
      period: {},
      name: {},
      blockedDateRanges: []
 }

getDateString(timestamp) {
   const date = new Date(timestamp)
   const year = date.getFullYear()
   const month = date.getMonth() + 1
   const day = date.getDate() 

let dateString = `${year}-`
if (month < 10) {
  dateString += `0${month}-`
} else {
  dateString += `${month}-`
}
if (day < 10) {
  dateString += `0${day}`
} else {
  dateString += day
}

return dateString
}

getPeriod(startTimestamp, endTimestamp) {
 const periodo = {}
 let currentTimestamp = startTimestamp
 while (currentTimestamp < endTimestamp) {
   const dateString = this.getDateString(currentTimestamp)
   periodo[dateString] = {
     color: '#58e8f5',
     startingDay: currentTimestamp === startTimestamp,
   }
   currentTimestamp += 24 * 60 * 60 * 1000
 }
 const dateString = this.getDateString(endTimestamp)
 periodo[dateString] = {
   color: '#4ed2de',
   endingDay: true,
 }
 return periodo
}

setDay(dayObj) {
  const { start, end } = this.state
  const {
    dateString, day, month, year,
  } = dayObj

  if (!_isEmpty(start) && _isEmpty(end)) {
    handleDateSelection(start.dateString, dateString, this.props.name);
  }

  const timestamp = new Date(year, month - 1, day).getTime();
  const newDayObj = { ...dayObj, timestamp };

  const startIsEmpty = _isEmpty(start);
  if (startIsEmpty || (!startIsEmpty && !_isEmpty(end))) {
    const periodo = {
      [dateString]: {
        color: '#4ed2de',
        endingDay: true,
        startingDay: true,
      },
    };
    this.setState({ start: newDayObj, period: periodo, end: {} });
  } else {
    const { timestamp: savedTimestamp } = start;
    if (savedTimestamp > timestamp) {
      const periodo = this.getPeriod(timestamp, savedTimestamp);
      this.setState({ start: newDayObj, end: start, period: periodo });
    } else {
      const periodo = this.getPeriod(savedTimestamp, timestamp);
      this.setState({ end: newDayObj, start: start, period: periodo });
    }
  }
}

render() {
 const { period } = this.state

  const disabledDates = {};
  this.props?.blockedDateRanges?.forEach((range) => {
    const startDate = moment(range.startDate);
    const endDate = moment(range.endDate);
    while (startDate.isSameOrBefore(endDate)) {
      disabledDates[startDate.format('YYYY-MM-DD')] = { disabled: true };
      startDate.add(1, 'days');
    }
  });

  const markedDates = { ...period, ...disabledDates };

  return (
    <Calendar
      onDayPress={this.setDay.bind(this)}
      current={moment().format('YYYY-MM-DD')}
      minDate={'2001-01-01'}
      maxDate={'2030-12-31'}
      onDayLongPress={(day) => {
        console.log('selected day', day.dateString);
      }}
      monthFormat={'MMMM - yyyy'}
      onMonthChange={(month) => {
        console.log('month changed', month);
      }}
      hideArrows={false}
      renderArrow={(direction) =>
        direction == 'left' ? (
          <MaterialIcons name="arrow-back" size={24} color="#3485E4" />
        ) : (
          <MaterialIcons name="arrow-forward" size={24} color="#3485E4" />
        )
      }
      hideExtraDays={true}
      firstDay={1}
      onPressArrowLeft={(subtractMonth) => subtractMonth()}
      onPressArrowRight={(addMonth) => addMonth()}
      disableAllTouchEventsForDisabledDays={true}
      enableSwipeMonths={true}
      markingType={'period'}
      markedDates={markedDates}
    />
  );
  
  }
}