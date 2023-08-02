import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Text } from '@components';
import { Icon } from '@components';

const TabbedCard = ({ overviewData, moreInfoData }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const handleTabPress = (tab) => {
    setActiveTab(tab);
  };

  return (
    <View>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          onPress={() => handleTabPress('overview')}
          style={[
            styles.tabButton,
            activeTab === 'overview' ? styles.activeTabButton : null,
          ]}
        >
          <Text semibold>Overview</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleTabPress('moreInfo')}
          style={[
            styles.tabButton,
            activeTab === 'moreInfo' ? styles.activeTabButton : null,
          ]}
        >
          <Text semibold>More Info</Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'overview' ? (
        <View style={{ paddingHorizontal: 20 }}>
          <View style={descStyles.descriptionContainer}>
            <Text style={descStyles.descriptionHeading}>Overview</Text>
            <Text style={descStyles.descriptionText}>{overviewData}</Text>
          </View>
        </View>
      ) : (
        <View style={{ paddingHorizontal: 20 }}>
          <View style={stylesforcal.itemReason}>
            <Icon name="hourglass-start" size={18} color={colors.accent} />
            <View style={{ marginLeft: 15 }}>
              <Text subhead semibold>
                Starting Height
              </Text>
              <Text body2>{moreInfoData.startingHeight + ' m' || ''}</Text>
            </View>
          </View>

          <View style={stylesforcal.itemReason}>
            <Icon name="mountain" size={18} color={colors.accent} />
            <View style={{ marginLeft: 10 }}>
              <Text subhead semibold>
                Summit Height
              </Text>
              <Text body2>{moreInfoData.summitHeight + ' m' || ''}</Text>
            </View>
          </View>

          <View style={stylesforcal.itemReason}>
            <Icon name="arrow-up" size={18} color={colors.accent} />
            <View style={{ marginLeft: 12 }}>
              <Text subhead semibold>
                Altitude Gain
              </Text>
              <Text body2>{moreInfoData.altitudeGain + ' m' || ''}</Text>
            </View>
          </View>

          <View style={stylesforcal.largerItemReason}>
            <Icon name="cloud-sun" size={18} color={colors.accent} />
            <View style={{ marginLeft: 10 }}>
              <Text subhead semibold>
                Weather
              </Text>
              <Text body2>{moreInfoData.weather || ''}</Text>
            </View>
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
    paddingVertical: 8,
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: '#2A8BF2',
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
    marginTop: 20,
    paddingHorizontal: 5,
  },
  descriptionHeading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 5,
    // alignSelf: "left",
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'justify'
  },
  informationContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },

});

export default TabbedCard;
