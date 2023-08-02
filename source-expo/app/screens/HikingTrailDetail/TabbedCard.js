import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from '@components';
import { Icon } from '@components';
import { useTheme } from '@config'; 

const TabbedCard = ({ overviewData, moreInfoData }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const handleTabPress = (tab) => {
    setActiveTab(tab);
  };

  const { colors } = useTheme();

  return (
    <View>
      <View style={styles.tabContainer}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            onPress={() => handleTabPress('moreInfo')}
            style={[
              styles.tabButton,
              activeTab === 'moreInfo' ? styles.activeTabButton : null,
            ]}
          >
            <Text semibold style={styles.tabButtonText}>Overview</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleTabPress('overview')}
            style={[
              styles.tabButton,
              activeTab === 'overview' ? styles.activeTabButton : null,
            ]}
          >
            <Text semibold style={styles.tabButtonText}>More Info</Text>
          </TouchableOpacity>
        </View>
      </View>

      {activeTab === 'moreInfo' ? (
        <View style={{ paddingHorizontal: 20, marginTop: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="hourglass-start" size={10} color={colors.accent} />
              <View style={{ marginLeft: 10 }}>
                <Text subhead semibold>
                  Starting Height
                </Text>
                <Text body2>{moreInfoData.startingHeight !== null ? moreInfoData.startingHeight + ' m' : 'Not Available'}</Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="mountain" size={10} color={colors.accent} />
              <View style={{ marginLeft: 10 }}>
                <Text subhead semibold>
                  Summit Height
                </Text>
                <Text body2>{moreInfoData.summitHeight + ' m' || ''}</Text>
              </View>
            </View>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="arrow-up" size={10} color={colors.accent} />
              <View style={{ marginLeft: 10 }}>
                <Text subhead semibold>
                  Altitude Gain
                </Text>
                <Text body2>{moreInfoData.altitudeGain + ' m' || ''}</Text>
              </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="cloud-sun" size={11} color={colors.accent} />
              <View style={{ marginLeft: 10 }}>
                <Text subhead semibold>
                  Weather
                </Text>
                {moreInfoData.weather ? (
                  <Text body2>{moreInfoData.weather}</Text>
                ) : (
                  <Text body2 style={{ color: 'red' }}>No Weather Data</Text>
                )}
              </View>
            </View>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="clock" size={10} color={colors.accent} />
              <View style={{ marginLeft: 10 }}>
                <Text subhead semibold>
                  Duration
                </Text>
                <Text body2>{moreInfoData.duration || ''}</Text>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <View style={{ paddingHorizontal: 20 }}>
          <View style={descStyles.descriptionContainer}>
            <Text style={descStyles.descriptionHeading}>Peak Tidbits</Text>
            <Text style={descStyles.descriptionText}>{overviewData}</Text>
          </View>
        </View>
      )}
    </View>
  );
};



const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  tabButton: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    fontSize: 20,
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: '#2A8BF2',
  },

  tabButtonText: {
    fontSize: 16, 
  },
});

const stylesforcal = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(, 0, 0, 0.9)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
  },

  closeButtonText: {
    color: 'white', 
    fontWeight: 'bold'
  },

  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    backgroundColor:"red"

  },
  tabButton: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: '#2A8BF2',
  },
  tabButtonText: {
    fontSize: 24,
  },

});



const footerStyles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.75)', 
    borderTopWidth: 0,
    paddingHorizontal: 40,
    alignItems: 'center', 
    position: 'absolute', 
    bottom: 0, 
  },
  footerButton: {
    flex: 1,
  },
});


const descStyles = StyleSheet.create({
  descriptionContainer: {
    marginTop: 10,
  },
  descriptionHeading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
    // alignSelf: "left",
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 24,
    textAlign: 'justify'
  },
  informationContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },

});

export default TabbedCard;
