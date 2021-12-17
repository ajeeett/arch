import React, { Component } from 'react';
import { Modal, Text, View, TouchableOpacity, Button } from 'react-native';
import Orientation from 'react-native-orientation-locker';
import VectorIcon from './../../globalComponents/VectorIcon';
import Video from 'react-native-af-video-player';
import styles from './style';
import { colors } from '../../utils/config/colors';
import { fontBold } from '../../utils/config/fonts';

const theme = {
  title: colors.white,
  more: colors.white,
  center: colors.white,
  fullscreen: colors.appBlue,
  volume: colors.white,
  scrubberThumb: colors.appBlue,
  scrubberBar: colors.appBlue,
  seconds: colors.white,
  duration: colors.white,
  progress: colors.white,
  loading: colors.appBlue,
};
export default class VideoPlayer extends Component {


  state = {
    modalVisible: false,
    isPlayback: false,
    playbackRate: 1,
    time: '',
    isPlaying: false,
    isFullScreen: false,
    duration: '',

  };
  constructor(props) {
    super(props)
    this.progress = 0
    this.onProgress = this.onProgress.bind(this)

  }

  static navigationOptions = ({ navigation }) => {
    console.log(navigation, '--nav');
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
    console.log(status);
    this.setState(prevState => ({
      isFullScreen: prevState.status,
    }));
  }
  onSeek(secs) {
    this.video.setState({ duration: 5000 }, () => {
      const val = this.video.state.duration * this.video.state.progress + secs;
      console.log(val, '--val')
    })

  }
  onProgress = (data) => {
    this.progress = data.currentTime
    console.log(this.progress)
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
            ref={ref => {
              this.video = ref;
              this.props.setRef
            }}
            // hls={true}
            // paused={false}
            // ref={props.setRef}
            autoPlay={
              this.props.autoPlay === false ? this.props.autoPlay : true
            }
            url={encodeURI(url)}
            title={title}
            logo={logo}
            placeholder={placeholder}
            onMorePress={() => this.onMorePress()}
            onFullScreen={status => {
              this.props.fullScreenD(status)
              this.onFullScreen(status);
            }}
            fullScreenOnly={this.props.fullScreenOnly}
            rotateToFullScreen={true}
            theme={theme}
            onPlay={playing => {
              console.log(this.props, '---this.props.initialDuration')
              this.setState({ isPlaying: playing })
              this.video.seekTo(this.props.initialDuration)

            }
            }
            rate={this.state.playbackRate}
            onProgress={time => {
              this.setState({ time: time }, () => {
                this.props.getDuration(this.state.time)
              });

            }}

            onError={(error) => {
              console.log('error--v', error)
            }}

          />
          {/* <Button
            style={{ fontSize: 20, color: 'green' }}
            styleDisabled={{ color: 'red' }}
            onPress={() => {
              this.video.seekTo(33)
              // const a = this.video.onSeekRelease(20 / this.state.duration);
              // console.log(a, '--a')
            }}
            title="Press Me">
          </Button> */}
          {/* <VectorIcon
            groupName="MaterialIcons"
            name="arrow-back"
            size={30}
            color={colors.white}
            style={styles.iconStyle}
            handler={() => this.backHandler()}
          /> */}
        </View>

        <Modal
          supportedOrientations={['portrait', 'landscape']}
          animationType="fade"
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
                  style={styles.playbackText}>
                  Playback Rate
                </Text>
                <View style={styles.containerView}>
                  <Text
                    style={styles.speedText}>
                    Speed:
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState(prevState => ({
                        isPlayback: !prevState.isPlayback,
                      }));
                    }}
                    style={styles.rowFlex}>
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

                <View style={styles.containerView}>
                  <View style={styles.viewWidth} />
                  <View style={styles.flexJustify}>
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
