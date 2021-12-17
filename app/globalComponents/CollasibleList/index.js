import React from 'react';
import { FlatList, Text, View, Image, TouchableOpacity } from 'react-native';
import { colors } from '../../utils/config/colors';
import styles from './style';
import { List } from 'react-native-paper';
import OnlineGreen from '../../assets/svg/OnlineGreen';
import CustomText from '../CustomText';
import PlayButton from '../../assets/svg/PlayButton';
import { fontRegular } from '../../utils/config/fonts';
import { secondsToHms } from '../../utils/Helper/helper';

export default function CollapsibleList(props) {
    console.log(props?.subjectArray, '--su')

    const renderList = (item) => {
        return (
            <List.Accordion
                left={() => (
                    <View style={styles.outerLeftView}>
                        <Text style={styles.outerLeftText}>{item.item.name}</Text>

                        <Text style={styles.outerChapterSmall}>{item.item?.chapterCount} Chapters • {item.item?.subjectDuration ? secondsToHms(item.item?.subjectDuration) : '00:00:00'}</Text>
                        {/* <Text style={styles.outerChapterSmall}>13 Chapters • 257 Hrs</Text> */}

                    </View>
                )}
                // titleStyle={styles.outerTitleStyle}
                titleStyle={{ width: 0 }}
                title={props => null
                    // <View style={styles.outerTitleView}>
                    //     <Text style={styles.outerTitleText}>13 Chapters • 257 Hrs</Text>
                    // </View>
                }
                style={styles.outerStyle}
            >
                {/* {renderChapter} */}

                {item.item?.chapters.map((e, index) => {
                    return (
                        <List.Accordion
                            left={() => (
                                <View style={styles.innerLeftView}>
                                    {e?.chapterStudyStatus == 0 ?
                                        <OnlineGreen color={colors.btnGray} /> :
                                        e?.chapterStudyStatus == 1 ?
                                            <OnlineGreen color={colors.buttonYellow} />
                                            : <OnlineGreen color={colors.lightGreen} />}
                                </View>
                            )}
                            titleStyle={styles.innerTitleStyle}
                            title={
                                <View style={styles.innerTitleView}>
                                    <Text style={styles.innerTitleText}>{e.name}</Text>
                                </View>
                            }
                            style={styles.innerStyle}
                            right={props => (<Text>Conectar</Text>)}
                        >
                            <List.Item
                                style={styles.outerStyleRes}
                                title={
                                    <View style={styles.displayFlex}>
                                        <Text style={styles.outerTitleText}>{e?.topicCount} Topics • {e?.chapterDuration ? secondsToHms(e?.chapterDuration) : '00:00:00'} </Text>
                                    </View>}
                                right={t =>
                                (
                                    e?.resourceCount ? <View style={styles.innerRightView}>
                                        <View style={styles.innerRightInView}>
                                            <Text style={styles.resourceText}>{e?.resourceCount > 1 ? `${e?.resourceCount} Resources` : `${e?.resourceCount} Resource`} </Text>
                                        </View>
                                    </View> : null
                                )} />


                            {item.item?.chapters[index]?.topics.map((element) => {
                                console.log(element, '------!!');
                                return (
                                    <List.Item
                                        title={
                                            null
                                        }
                                        titleStyle={{ width: 0, height: 0 }}
                                        descriptionNumberOfLines={5}
                                        // key={i.toString()}
                                        description={() => (
                                            <TouchableOpacity onPress={() => props.goToVideo(element, item?.item)} activeOpacity={0.8} style={styles.gotoVideo}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <View style={styles.innerLeftTopicView}>
                                                        {element?.studyStatus == 0 ?
                                                            <OnlineGreen color={colors.btnGray} /> :
                                                            element?.studyStatus == 1 ?
                                                                <OnlineGreen color={colors.buttonYellow} />
                                                                : <OnlineGreen color={colors.lightGreen} />}
                                                    </View>

                                                    <CustomText
                                                        styles={styles.topicTitle}
                                                        content={element?.name}
                                                        ellipseMode={"tail"}
                                                        lineNumbers={1} />
                                                    {item.item?.chapters[index]?.status ? null :
                                                        element?.ispaid == 1 ?
                                                            <View style={[styles.tagView, { backgroundColor: colors.lightGreen }]}>
                                                                <CustomText lineNumbers={1}
                                                                    ellipseMode={'tail'}
                                                                    styles={styles.tag}
                                                                    content={'FREE'} />
                                                            </View>
                                                            : <View style={[styles.tagView, { backgroundColor: colors.red }]}>
                                                                <CustomText lineNumbers={1}
                                                                    ellipseMode={'tail'}
                                                                    styles={styles.tag}
                                                                    content={'PAID'} />
                                                            </View>}
                                                </View>

                                                <CustomText styles={{
                                                    marginVertical: 5,
                                                    flex: 3,
                                                    fontSize: 12,
                                                    fontFamily: fontRegular,

                                                }}
                                                    lineNumbers={3}
                                                    content={element?.description}
                                                // content={'element?.description'}
                                                // content={element?.description + element?.description + element?.description + element?.description}

                                                />
                                                <CustomText styles={[{ flex: 1, }, styles.footerText]} content={`${secondsToHms(element?.topicDuration)}`} />
                                            </TouchableOpacity>
                                        )}
                                        left={() => (
                                            <TouchableOpacity onPress={() => props.goToVideo(element, item?.item)} activeOpacity={0.8} style={{
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
                                                {/* <Image
                                                    source={require('./../../assets/images/courseImage.png')}
                                                    resizeMode="cover"
                                                    style={{ width: 90, height: 90, borderRadius: 5 }}
                                                /> */}
                                                {element?.contentType == 1 ?
                                                    <View
                                                        // source={require('./../../assets/images/courseImage.png')}
                                                        // resizeMode="cover"
                                                        style={styles.resourceIcon}
                                                    >
                                                        <Image style={styles.imageIcon} resizeMode='contain' height={70} width={70}
                                                            source={require('./../../assets/images/pdfBGLess.png')} />
                                                    </View>
                                                    : element?.contentType == 0 || element?.contentType == 2 ?
                                                        <View style={styles.resourceIcon}>
                                                            <Image style={styles.imageIcon} resizeMode='contain' height={70} width={70}
                                                                source={require('./../../assets/images/liveTestBGLess.png')} />
                                                        </View> : element?.contentType == 4 ?
                                                            <View style={styles.resourceIcon}>
                                                                <Image style={styles.imageIcon} resizeMode='contain' height={70} width={70}
                                                                    source={require('./../../assets/images/textBGLess.png')} />
                                                            </View>
                                                            : element?.contentType == 5 ?
                                                                <View style={styles.resourceIcon}>
                                                                    <Image style={styles.imageIcon} resizeMode='contain' height={70} width={70}
                                                                        source={require('./../../assets/images/liveClassBGLess.png')} />
                                                                </View> : <View style={styles.resourceIcon} >
                                                                    <Image style={styles.imageIcon} resizeMode='contain' height={70} width={70}
                                                                        source={require('./../../assets/images/videoBGLess.png')} />
                                                                </View>
                                                }
                                                {/* {element?.contentType == 6 ? <PlayButton style={{
                                                    position: 'absolute',
                                                }} /> : null} */}
                                            </TouchableOpacity>
                                        )} // styled
                                        right={() => (null)} // styled
                                    />


                                )
                            })}


                        </List.Accordion>
                    )
                })}
            </List.Accordion>


        )
    }


    // const renderChapter = (item) => {
    //     console.log('inrender');
    //     return (

    //     )
    // }
    return (
        <View>
            <FlatList
                data={props?.subjectArray}
                renderItem={renderList}
                keyExtractor={item => item.id}
            />
            {/* {props?.subjectArray.map((e) => {
              
            })} */}




            {/* <List.Accordion
                left={() => (
                    <View style={styles.innerTitleView}>
                        <Text style={styles.outerLeftText}>Chemistry</Text>
                    </View>
                )}
                titleStyle={styles.textStyleMarginStart}
                title={
                    <View style={styles.outerTitleView}>
                        <Text style={styles.outerTitleText}>13 Chapters • 257 Hrs</Text>
                    </View>
                }
                style={styles.outerStyle}>
                <List.Item title="First item" />
                <List.Item title="Second item" />
            </List.Accordion>
            <List.Accordion
                left={() => (
                    <View style={styles.innerTitleView}>
                        <Text style={styles.outerLeftText}>Maths</Text>
                    </View>
                )}

                titleStyle={styles.textStyleMarginStart}

                title={
                    <View style={styles.outerTitleView}>
                        <Text style={styles.outerTitleText}>13 Chapters • 257 Hrs</Text>
                    </View>
                }
                style={styles.outerStyle}>
                <List.Item title="First item" />
                <List.Item title="Second item" />
            </List.Accordion>
         */}
        </View>
    )
}
