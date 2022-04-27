import { StyleSheet, Platform, StatusBar, Dimensions } from "react-native"

export const globalStyles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  },
  dropShadow:{
    shadowColor: '#171717',
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  appLogo:{
    width: 225,
    height: 225
  },
  primaryBG: {
    backgroundColor: "#23374F"
  },
  secondaryBG: {
    backgroundColor: "#2F4763"
  },
  tertiaryBG: {
    backgroundColor: "#6989AE"
  },
  quarternaryBG: {
    backgroundColor: "#192533"
  },
  primaryText: {
    color: "#FFFFFF"
  },
  secondaryText: {
    color: "#C7D0D7"
  },
  tertiaryText: {
    color: "#808B9D"
  },
  navigationBG: {
    backgroundColor: "#27314B"
  },
  avatarFull: {
    width: 160,
    height: 160,
 },
 addBG: {
   backgroundColor: "#01C16F"
 },
 locationIconBG: {
   backgroundColor: "#12528A"
 },
 logsIconBG: {
   backgroundColor: "#CB2828"
 }
});
