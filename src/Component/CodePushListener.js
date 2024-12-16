import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import codePush from "react-native-code-push";
import ProgressCircle from "./ProgressCircle";
import Colors  from "../Constant/styles";

const CodePushListener = () => {
  const [downloadingCodePushBundleStatus, setDownloadingCodePushBundleStatus] = useState("");
  const [downloadingCodePushBundleSize, setDownloadingCodePushBundleSize] = useState("0");
  const [downloadingCodePushBundleProgress, setDownloadingCodePushBundleProgress] = useState("");
  const checkStatus = async ()=>{
    await codePush.sync({
      updateDialog: true,
      installMode: codePush.InstallMode.IMMEDIATE,
    },(status) => {
      switch (status) {
      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        setDownloadingCodePushBundleStatus("DOWNLOADING");
        break;
      case codePush.SyncStatus.INSTALLING_UPDATE:
        setDownloadingCodePushBundleStatus("INSTALLING");
        break;
      }
    },
    ({ receivedBytes, totalBytes }) => {
      const progress = (receivedBytes / totalBytes) * 100;
      setDownloadingCodePushBundleSize(totalBytes/1024);
      setDownloadingCodePushBundleProgress(progress);
    });
  };
  useEffect(()=>{
    setInterval(() => {
      checkStatus();     
    }, 500000);//user open app auto update every 500 sec
  });
  useEffect(()=>{
    checkStatus();     
  });
  return (
    downloadingCodePushBundleStatus && 
      <View style={styles.Container}>
        <ProgressCircle progress={downloadingCodePushBundleProgress} />
        <Text style={styles.msgTxt}>  {downloadingCodePushBundleStatus}  </Text>
        <Text style={styles.msgTxt}>( {Number(downloadingCodePushBundleSize).toFixed(2)}.KB )  </Text>
      </View>
  );
};
export default CodePushListener;

const styles = StyleSheet.create({
  Container: {
    flex:1,
    width:'100%',
    height:'100%',
    alignSelf:'center',
    zIndex:10,
    position:"absolute",
    borderColor:Colors.AliceBlue,
    justifyContent:"center",
    alignItems:"center",
    padding:15,
    gap:15,
    backgroundColor:Colors.Opacity
  },
  msgTxt: {
    color: "white",
    fontSize: 25,
  },
});
