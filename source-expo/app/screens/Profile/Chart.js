import React from 'react';
import { View } from 'react-native';
// import RadarChart from 'react-svg-radar-chart';
import { VictoryChart, VictoryPolarAxis, VictoryArea } from 'victory-native';


const RadarChartComponent = () => {
  // const data = [
  //   {
  //     data: {
  //       endurance: 0.7,
  //       upperBodyStrength: .8,
  //       lowerBodyStrength: 0.9,
  //       balanceAndStability: 0.67,
  //       flexibility: 0.8,
  //       outdoorExperience: 0.9,
  //       comfort: 1
  //     },
  //     meta: { color: 'blue' }
  //   },
  //   {
  //     data: {
  //       endurance: 0.6,
  //       upperBodyStrength: .85,
  //       lowerBodyStrength: 0.5,
  //       balanceAndStability: 0.6,
  //       flexibility: 0.7,
  //       outdoorExperience: 0.8,
  //       comfort: 0.9
  //     },
  //     meta: { color: 'red' }
  //   }
  // ];

  const data = [
    { key: 'Endurance', value: 4 },
    { key: 'Upper Body Strength', value: 2 },
    { key: 'Lower Body Strength', value: 5 },
    { key: 'Balance and Stability', value: 3 },
    { key: 'Flexibility', value: 1 },
    { key: 'OutdoorExperience', value: 4},
    { key: 'Comfort', value: 2}
  ];

  const captions = {
    // columns
    endurance: 'Endurance',
    upperBodyStrength: 'Upper Body Strength',
    lowerBodyStrength: 'Lower Body Strength',
    balanceAndStability: 'Balance and Stability',
    flexibility: 'Flexibility',
    outdoorExperience: 'Outdoor Experience',
    comfort: 'Comfort with Challenging Terrains'
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <VictoryChart polar>
        <VictoryPolarAxis dependentAxis />
        <VictoryPolarAxis />
        <VictoryArea
          data={data}
          x="key"
          y="value"
          style={{
            data: { fill: 'rgba(100, 149, 237, 0.7)' },
          }}
        />
      </VictoryChart>
    </View>
  );
};

export default RadarChartComponent;
