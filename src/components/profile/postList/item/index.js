import React, { useState, useRef } from "react";
import { View, Text, Image, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Video } from "expo-av";

export default function ProfilePostListItem({ item }) {

  const [modalVisible, setModalVisible] = useState(false);
  const videoRef = useRef(null);

  const handleThumbnailPress = () => {
    setModalVisible(true);
  }

  const handleModalClose = () => {
    setModalVisible(false);
  }

  const handleModalShow = () => {
    if (videoRef.current) {
      videoRef.current.playAsync();
    }
  }

  return (
    <TouchableOpacity onPress={handleThumbnailPress}>
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: item.media[1] }} />
      </View>
      <Modal
        visible={modalVisible}
        animationType='slide'
        onRequestClose={handleModalClose}
        onShow={handleModalShow}
      >
        <View style={modalStyles.container}>
          <Video
            ref={videoRef}
            source={{ uri: item.media[0] }}
            style={modalStyles.video}
            resizeMode='contain'
            isLooping={true}
            shouldPlay
          />
          <TouchableOpacity onPress={handleModalClose}>
            <Text style={modalStyles.closeButton}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 120,
    height: 120,
  },
});

const modalStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,1)',
  },
  video: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    marginTop: -50,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: 'white',
    color: 'black'
  }
});
