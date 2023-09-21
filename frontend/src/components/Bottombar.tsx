import React from "react";
import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";

interface BottomTabBarProps {
  state: any; // 네비게이션 상태
  descriptors: any; // 스크린 디스크립터
  navigation: any; // 네비게이션 객체
}

const iconMap = {
  home: require("../../assets/sel_home.png"), // 홈 아이콘 이미지
  home2: require("../../assets/unsel_home.png"), // 홈 아이콘 이미지
  chart: require("../../assets/sel_chart.png"), // 프로필 아이콘 이미지
  chart2: require("../../assets/unsel_chart.png"), // 프로필 아이콘 이미지
  search: require("../../assets/sel_search.png"),
  search2: require("../../assets/unsel_search.png"),
  like: require("../../assets/sel_like.png"),
  like2: require("../../assets/unsel_like.png"),
};

const BottomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <View style={styles.box}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };
        var name = route.name;
        if (!isFocused) {
          name = route.name + "2";
        }

        const iconSource = iconMap[name]; // 해당 라우트에 대한 이미지 소스 가져오기

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={styles.btn}
          >
            <Image source={iconSource} style={{ width: 24, height: 24 }} />
            <Text style={{ color: isFocused ? "#FFFFFF" : "#90FFF8" }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};
const styles = StyleSheet.create({
  box: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 90,
    borderTopColor: "#90FFF8",
    borderTopWidth: 2,
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default BottomTabBar;
