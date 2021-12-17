import React, { Component } from 'react';
import {
  Alert,
  Modal,
  Text,
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import Orientation from 'react-native-orientation-locker';
import VectorIcon from '../VectorIcon';
import Video from 'react-native-af-video-player';
import styles from './style';
import { colors } from '../../utils/config/colors';

const theme = {
  title: '#FFF',
  more: '#fff',
  center: '#fff',
  fullscreen: colors.appBlue,
  volume: '#fff',
  scrubberThumb: colors.appBlue,
  scrubberBar: colors.appBlue,
  seconds: '#fff',
  duration: '#fff',
  progress: '#fff',
  loading: colors.appBlue,
};
export default class VideoPlayer2 extends Component {


  state = {
    modalVisible: false,
    isPlayback: false,
    playbackRate: 1,
    time: '',
    isPlaying: false,
    isFullScreen: false,
  };
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    const header = state.params && (state.params.fullscreen ? undefined : null);
    const tabBarVisible = state.params ? state.params.fullscreen : true;
    return {
      header,
      tabBarVisible,
    };
  };
  onMorePress() {
    this.setModalVisible(true);
  }

  setModalVisible = visible => {
    this.setState({ modalVisible: visible });
  };

  onFullScreen(status) {
    this.setState(prevState => ({
      isFullScreen: !prevState.status,
    }));
  }
  onSeek(secs) {
    this.video.state.duration * this.video.state.progress + secs;
  }



  backHandler = () => {
    if (this.state.isFullScreen) {
      Orientation.unlockAllOrientations();
      this.setState(prevState => ({
        isFullScreen: !prevState.isFullScreen,
      }));
    } else {
      this.props.navigation.goBack();
      Orientation.unlockAllOrientations();
      this.setState(prevState => ({
        isFullScreen: !prevState.isFullScreen,
      }));
    }
  };
  render() {
    const url = this.props.url;
    const logo = this.props.logo;
    const placeholder =
      this.props.placeholder || require('./../../assets/images/thumbnail.jpg');
    const title = this.props.title;
    const { modalVisible } = this.state;

    return (
      <>
        <View>
          <Video
            autoPlay
            url={'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'}
            title={'title'}
            theme={theme}
            // logo={logo}
            // placeholder={logo}
            rotateToFullScreen

          />
        </View>

        <Modal
          supportedOrientations={['portrait', 'landscape']}
          animationType="none"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            this.setModalVisible(false);
          }}>
          <TouchableOpacity
            style={styles.container}
            activeOpacity={1}
            onPressOut={() => {
              this.setModalVisible(false);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 20,
                    paddingBottom: 20,
                    color: '#fff',
                  }}>
                  Playback Rate
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 18,
                      color: '#FFFF00',
                    }}>
                    Speed:
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState(prevState => ({
                        isPlayback: !prevState.isPlayback,
                      }));
                    }}
                    style={{ flexDirection: 'row' }}>
                    <Text style={styles.modalText}>
                      {this.state.playbackRate === 1
                        ? 'Normal'
                        : `${this.state.playbackRate}X`}
                    </Text>
                    <VectorIcon
                      groupName="MaterialIcons"
                      name="keyboard-arrow-right"
                      size={20}
                      color={'grey'}
                    />
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{ width: '60%' }} />
                  <View style={{ justifyContent: 'flex-end' }}>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ playbackRate: 0.5, isPlayback: false });
                        this.setModalVisible(false);
                      }}>
                      <Text style={styles.modalTextN}>0.5</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({
                          playbackRate: 0.75,
                          isPlayback: false,
                        });
                        this.setModalVisible(false);
                      }}>
                      <Text style={styles.modalTextN}>0.75</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ playbackRate: 1, isPlayback: false });
                        this.setModalVisible(false);
                      }}>
                      <Text style={styles.modalTextN}>Normal</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({
                          playbackRate: 1.25,
                          isPlayback: false,
                        });
                        this.setModalVisible(false);
                      }}>
                      <Text style={styles.modalTextN}>1.25</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ playbackRate: 1.5, isPlayback: false });
                        this.setModalVisible(false);
                      }}>
                      <Text style={styles.modalTextN}>1.5</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        this.setState({ playbackRate: 2, isPlayback: false });
                        this.setModalVisible(false);
                      }}>
                      <Text style={styles.modalTextN}>2</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
      </>
    );
  }
}
