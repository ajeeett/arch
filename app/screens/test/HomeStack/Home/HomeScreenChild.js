import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { get, isEmpty, find } from 'lodash';
import { useLazyQuery } from '@apollo/client';
import { View, FlatList } from 'react-native';
import styles from './styles';
import Header from './../../../globalComponents/Header/index';
import FeatureImagesSwiper from '../../../globalComponents/ImageSwiper/FeatureImagesSwiper';
import ScrollContainer from '../../../globalComponents/ScrollContainer';
import CoursesCard from '../../../globalComponents/CoursesCard';
import CustomButton from '../../../globalComponents/CustomButton';
import CustomText from '../../../globalComponents/CustomText';
import I18n from '../../../utils/config/I18n';
import UpcomingCourse from '../../../globalComponents/UpcomingCourse';
import { asyncStorageRead, diffInMillisec, diffInMillisecEndCalc, showSnackBar, splitDate, tConvert } from '../../../utils/Helper/helper';
import { clearStudentCountCourses, clearUpcomingLiveCourses, fetchStudentCount, fetchStudentCourses, fetchUpcomingLiveCourses } from '../../../actions/courseActions';
import Loader from '../../../globalComponents/Loader';
import { fetchPendingCourse } from '../../../actions/pendingCourseAction';
import { secondsToHms } from './../../../utils/Helper/helper';
import ZoomUs from 'react-native-zoom-us';
import CoursesCardZeroState from '../../../globalComponents/CoursesCardZeroState';
import CardTestsZeroState from '../../../globalComponents/CardTestsZeroState';
import UpcomingLiveClassZeroState from '../../../globalComponents/UpcomingLiveClassZeroState';
import { getShopifyBestSellingProduct, getShopifyProductRelevance } from '../../../api/gplQuery';
import { fetchStudentDivisionRequest } from '../../../actions/studentDivisionActions';
import PopularCardRow from '../../../globalComponents/PopularCardRow';
import { fetchCompleteProfile } from '../../../actions/userProfileActions';
import CardTests from '../../../globalComponents/CardTests';
import { clearTestDetails, fetchTestsList } from '../../../actions/onlineExamActions';
import messaging from '@react-native-firebase/messaging';
import { ZOOM_CLIENT_KEY, ZOOM_CLIENT_SECRET } from '../../../utils/config/config';
import { fetchShopifyCoursesClear, fetchShopifyCoursesRequest } from '../../../actions/shopifyActions';

export default function HomeScreenChild({ navigation, shopifyCollectionId }) {
    // const isFocused = useIsFocused();
    // const interval = useRef();
    // var intervalId = useRef();
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [studentCourseData, setStudentCourseData] = useState([]);
    const [testsListData, setTestsListData] = useState([]);
    const [upcomingLiveCourseData, setUpcomingLiveCourseData] = useState([]);
    const [pendingCourseData, setPendingCourseData] = useState([]);
    const [popularCourses, setPopularCourses] = useState([]);
    const [gqlDivisionQuery, setGqlDivisionQuery] = useState('');
    const [divisionName, setDivisionName] = useState([]);
    const [isInitialized, setIsInitialized] = useState(false);
    const [shopifyPurchasedCourses, setShopifyPurchasedCourses] = useState('');

    const [getRelevanceShopifyProduct, relevanceShopifyProduct] = useLazyQuery(getShopifyProductRelevance(`(${gqlDivisionQuery})`))
    const [getBestSellingShopifyProduct, bestSelling] = useLazyQuery(getShopifyBestSellingProduct(), {
        variables: { "ids": [shopifyCollectionId] }
    });

    const dispatch = useDispatch();

    const profileDataFetchedResp = useSelector(state => get(state, 'userProfileReducer', false));
    const studentDivisionResponse = useSelector(state => get(state, 'studentDivisionReducer', ''));
    const shopifyCoursesResponse = useSelector(state => get(state, 'shopifyCoursesReducer', ''));
    const courseDetails = useSelector(state => state.courseReducer);
    const testsListReducer = useSelector(state => state.onlineExamReducer);
    const studentCountReducer = useSelector(state => state.studentCountReducer);
    // const pendingCourseDetails = useSelector(state => state.pendingCourseReducer);
    // const commonReducer = useSelector(state => state.commonReducer);

    // useEffect(() => {
    //     // console.warn('ttt');
    // }, [commonReducer]);

    useEffect(() => {
        // // console.log(profileDataFetchedResp, '---profileDataFetchedResp');
        if (profileDataFetchedResp?.profileFetched) {
            setName(profileDataFetchedResp?.profileDataFetched?.data?.name);
        }
        else if (profileDataFetchedResp?.error) {
            // setLoading(forgotPassResponse?.isFetching);
            showSnackBar(profileDataFetchedResp?.error);
            // console.log('Error in profile fetch');
            // dispatch(clearCompleteProfileData());
        }
    }, [profileDataFetchedResp]);


    // useEffect(() => {
    //   // dispatch(fetchStudentCoursesClear());
    //   // setLoading(true)
    //   fetchStudentCourseData();
    //   fetchPendingCourseData();
    // }, []);
    useFocusEffect(
        React.useCallback(() => {
            // // console.warn('api called');
            // getBestSellingShopifyProduct();
            fetchStudentCourseData();
            fetchShopifyCourseData();
            fetchUpcomingLiveCourseData();
            // fetchPendingCourseData();
            fetchOnlineTestData();
            clearPreviousDetails();

            // set interval for student count in live class card
            // intervalId = setInterval(() => {
            //     let meetingIds = [];
            //     if (Object.keys(courseDetails?.upcomingLiveCourse).length != 0) {
            //         courseDetails?.upcomingLiveCourse.forEach(item => {
            //             if (diffInMillisec(item?.startDate) == 0 && diffInMillisecEndCalc(item?.startDate, item?.endDate) > 0) {
            //                 meetingIds.push(item?.meetingId)
            //             }
            //         });

            //         let payload = {
            //             meetingId: meetingIds
            //         }
            //         dispatch(fetchStudentCount(payload));
            //     }
            // }, 30000);

            const notListener = messaging().onMessage(remoteMessage => {
                // .
                clearPreviousDetails();
                // console.log(remoteMessage?.data, '---remoteMessage');
                // console.warn("my test", remoteMessage?.data);
                setTimeout(() => {
                    // setLoading(true)
                    fetchStudentCourseData();
                    fetchUpcomingLiveCourseData();
                    // fetchPendingCourseData();
                    fetchOnlineTestData();
                }, 1000);
                // // console.log(
                //   'Notification caused app to open from background state:',
                //   remoteMessage.notification,
                // );
                // navigation.navigate(remoteMessage.data.type);
            });

            return () => {
                notListener();
                // clearInterval(intervalId);
            }
        }, [])
    );

    const clearPreviousDetails = async () => {
        await dispatch(clearTestDetails());
        await dispatch(clearUpcomingLiveCourses());
    }

    useEffect(() => {
        initializeZoom();
        isEmpty(studentDivisionResponse?.data) ? getStudentDivision() : null;

        isEmpty(profileDataFetchedResp?.profileDataFetched) ? getUserData() : null;

        // set loader false after 15 secs
        const timer = () => setTimeout(() => { setLoading(false) }, 15000);
        const setTimer = timer();

        return () => {
            clearPreviousDetails();
            clearTimeout(setTimer);
        };
    }, []);

    const getStudentDivision = async () => {
        await dispatch(fetchStudentDivisionRequest());
    }

    const fetchShopifyCourseData = async () => {
        await dispatch(fetchShopifyCoursesRequest());
    }

    useEffect(() => {
        // console.log('shopifyCoursesResponse', shopifyCoursesResponse);
        try {
            if (shopifyCoursesResponse?.shopifyCoursesFetchSuccess) {
                setShopifyPurchasedCourses(shopifyCoursesResponse?.data);
                getBestSellingShopifyProduct();
            } else if (shopifyCoursesResponse?.error) {
                showSnackBar(shopifyCoursesResponse?.error);
                dispatch(fetchShopifyCoursesClear());
                console.log('Shopify courses error in home => ', shopifyCoursesResponse?.error);
            } else {
                // console.log("No data in shopify courses reducers: HOME");
            }
        } catch (e) {
            dispatch(fetchShopifyCoursesClear());
            console.log('Shopify courses error in catch block! ==== HOME:ERROR!', e.message);
        }
    }, [shopifyCoursesResponse])

    useEffect(() => {
        try {
            if (studentDivisionResponse?.studentDivisionFetchSuccess && !isEmpty(studentDivisionResponse?.data)) {
                const studentDivisionData = studentDivisionResponse?.data;
                // const studentDivisionData = [];

                // console.log(`division ID ------------------ `, studentDivisionData);

                if (studentDivisionData.length > 0) {
                    let filterDivisionName = [];
                    let gqlQueryOnDivision = [];

                    studentDivisionData.forEach(item => {
                        gqlQueryOnDivision.push(`product_type:'${item.name}'`)
                        filterDivisionName.push(item.name)
                    });
                    // // console.log(`division array => `, gqlQueryOnDivision);
                    // // console.log(`div.join( OR ) => `, gqlQueryOnDivision.join(` OR `));

                    setGqlDivisionQuery(gqlQueryOnDivision.join(` OR `));
                    setDivisionName(filterDivisionName);

                    if (popularCourses && popularCourses.length <= 0) {
                        setLoading(true);
                        getBestSellingShopifyProduct();
                    }
                } else {
                    // console.log("No division Id in student reducer !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
                }
            } else if (studentDivisionResponse?.error) {
                showSnackBar(studentDivisionResponse?.error);
                // console.log(studentDivisionResponse?.error, "======= studentDivisionResponse?.error");
                dispatch(fetchStudentDivisionClear());
            }
        } catch (e) {
            showSnackBar(I18n.t('global.something_went_wrong'))
            // console.log(e.message, "Error caught at student division catch block ==========!!! HOMESCREENCHILD:Error");
        }
    }, [studentDivisionResponse])

    useEffect(() => {
        // if (popularCourses && popularCourses.length <= 0) {

        if (bestSelling?.data) {
            if (bestSelling?.data?.nodes[0]?.products?.edges.length > 0) {
                let bestSellingData = bestSelling?.data?.nodes[0]?.products?.edges;
                let items = [];
                bestSellingData.forEach(element => {
                    // if (divisionName.includes(element.node.productType)) items.push(element)
                    if (divisionName.includes(element?.node?.productType) && !shopifyPurchasedCourses.includes(element?.node?.id)) items.push(element)
                });

                if (items.length > 0) {
                    setPopularCourses(items);
                    setLoading(false);
                } else {
                    setPopularCourses([]);
                    getRelevanceShopifyProduct();
                    setLoading(true);
                };
            }
        } else console.log("bestSelling.data not found");
        // } else {
        //     // console.log('Popular courses is not empty, so bestselling useeffect is executed!!');
        // }
    }, [bestSelling])

    useEffect(() => {
        let { data, loading, called } = relevanceShopifyProduct;

        if (data?.products?.edges.length > 0) {
            let items = [];
            data?.products?.edges.forEach(item => {
                if (!shopifyPurchasedCourses.includes(item?.node?.id))
                    items.push(item);
            })
            setPopularCourses(items)
            setLoading(false);
        } else if (data && called && !loading) {
            setPopularCourses([])
            setLoading(false);
        }
    }, [relevanceShopifyProduct])

    useEffect(() => {
        if (bestSelling.error) {
            setLoading(false);
            // showSnackBar(I18n.t('global.something_went_wrong'))
            console.log(bestSelling.error.message, "bestSelling.error ==========!!! Error");
        }
        if (relevanceShopifyProduct.error) {
            setLoading(false);
            // showSnackBar(I18n.t('global.something_went_wrong'))
            console.log(relevanceShopifyProduct.error.message, "relevanceShopifyProduct.error ==========!!! Error");
        }
    }, [bestSelling.error, relevanceShopifyProduct.error])

    useEffect(() => {
        setLoading(false);
        if (courseDetails?.studentCoursesFetchSuccess) {
            // console.log(courseDetails, '--??');
            setStudentCourseData(courseDetails?.studentCourses?.allCourses)
            setPendingCourseData(courseDetails?.studentCourses?.underProgressCourses)
            // dispatch(clearCourseProduct());
        }
        if (courseDetails?.upcomingCoursesFetchSuccess) {
            // console.log(courseDetails, '--??');
            // convertIsoToDate()
            // let meetingIds = [];
            // courseDetails?.upcomingLiveCourse.forEach(item => {
            //     if (diffInMillisec(item?.startDate) == 0 && diffInMillisecEndCalc(item?.startDate, item?.endDate) > 0) {
            //         meetingIds.push(item?.meetingId)
            //     }
            // });
            // // console.log(meetingIds, '========meeting ids');
            // // sending request for first meeting id only - TODO (Multiple id)

            // let payload = {
            //     meetingId: meetingIds
            // }

            // dispatch(fetchStudentCount(payload));
            setUpcomingLiveCourseData(courseDetails?.upcomingLiveCourse)
            // dispatch(clearCourseProduct());
        } else if (courseDetails?.error) {
            showSnackBar(courseDetails?.error);
            // dispatch(clearCourseProductDetail());
        }
    }, [courseDetails]);

    useEffect(() => {
        if (studentCountReducer?.dataFetched) {
            const { data } = studentCountReducer?.studentCount;
            var initialQuestionsArr = upcomingLiveCourseData.map(item => { return { ...item } });

            data.forEach(item => {
                for (let i = 0; i < initialQuestionsArr.length; i++) {
                    if (initialQuestionsArr[i].meetingId == item.meetingId) {
                        let newValue = { ...initialQuestionsArr[i], totalStudents: item?.studentCount };
                        initialQuestionsArr.splice(i, 1, newValue);
                    }
                }
            })
            // console.log(initialQuestionsArr, '----initiallol');
            setUpcomingLiveCourseData(initialQuestionsArr);
            dispatch(clearStudentCountCourses());
        } else if (studentCountReducer?.error) {
            showSnackBar(studentCountReducer?.error);
            dispatch(clearStudentCountCourses());
        }
        // dispatch(clearStudentCountCourses());
    }, [studentCountReducer])

    useEffect(() => {
        setLoading(false);
        if (testsListReducer?.navigateToInstructions) {
            // console.log(testsListReducer, '--??testsListReducer?.testsList?.data');
            setTestsListData(testsListReducer?.testsList?.data)
            // dispatch(clearCourseProduct());
        }
        else if (testsListReducer?.error) {
            showSnackBar(testsListReducer?.error);
            // dispatch(clearCourseProductDetail());
        }
    }, [testsListReducer]);

    const getUserData = async () => {
        await dispatch(fetchCompleteProfile());
        setLoading(true);
    }

    // useEffect(() => {
    //     setLoading(false);
    //     if (pendingCourseDetails?.pendingCourseSuccess) {
    //         // console.log(pendingCourseDetails, '--??');
    //         setPendingCourseData(pendingCourseDetails?.pendingCourseData?.data)
    //         // dispatch(clearCourseProduct());
    //     } else if (pendingCourseDetails?.error) {
    //         showSnackBar(pendingCourseDetails?.error);
    //     }
    // }, [pendingCourseDetails]);

    const fetchStudentCourseData = async () => {

        // await dispatch(clearUpcomingLiveCourses())
        // const token = getAccessToken();
        // await dispatch(fetchCourseProduct());
        // console.log(courseDetails?.isLoading, '--!!?');

        await dispatch(fetchStudentCourses());
        // await dispatch(clearCourseProductDetail(payload));
        setLoading(true);

    };

    const fetchUpcomingLiveCourseData = async () => {
        // const token = getAccessToken();
        // await dispatch(fetchCourseProduct());
        // console.log(courseDetails?.isLoading, '--!!?');

        await dispatch(fetchUpcomingLiveCourses());
        // await dispatch(clearCourseProductDetail(payload));
        setLoading(true);

    };
    const fetchPendingCourseData = async () => {

        await dispatch(fetchPendingCourse());
        setLoading(true);

    };

    const fetchOnlineTestData = async () => {

        await dispatch(fetchTestsList());
        setLoading(true);

    };
    const renderItem = ({ item, index }) => {
        if (item?.lastImage) {

            return (
                <CoursesCardZeroState
                    exploreCourses={() => navigation.navigate('Search')}
                    headImage={require('./../../../assets/images/courseCardZeroTop.png')}
                    bgImage={require('./../../../assets/images/bluebgcard.png')}
                />
            )

        } else {
            return (
                <CoursesCard
                    onPress={() => {
                        // console.log(item, '--ioi')
                        goToCourseName(item?.product?.id)
                    }}
                    showCoursesBg
                    courseImage={`${item?.product?.courseImage}`}
                    headImage={require('./../../../assets/images/applebook.png')}
                    bgImage={require('./../../../assets/images/bluebgcard.png')}
                    heading={item?.product?.name}
                    subHeading={`${item?.product?.chapterCount} ${item?.product?.chapterCount < 2 ? 'section' : 'sections'} • ${item?.product?.topicCount} ${item?.product?.topicCount < 2 ? 'lecture' : 'lectures'} • ${secondsToHms(item?.product?.duration)} total length`}
                    progress={Math.floor(item?.product?.progressPercentage)}
                    percentage={'80%'}

                />
            );
        };
    }
    const renderUpcomingCourseItem = ({ item, index }) => {
        // console.log(item, '--1111');
        return (
            <UpcomingCourse
                onPress={() => {
                    // console.log('inittttttt')
                    // joinMeeting(item)
                    navigation.navigate('ZoomIntroScreen', { item, name, isInitialized })
                }}
                showCoursesBg
                headImage={require('./../../../assets/images/liveclasstop.png')}
                bgImage={require('./../../../assets/images/upcominglivebg.png')}
                bowsImage={require('./../../../assets/images/liveoutercircles.png')}
                heading={item?.name}
                courseName={item?.courseName}
                subHeading={`${item?.teacherName?.length > 0 ? `By ${item?.teacherName}` : ''}`}
                classType={item?.isPaid ? 'PAID' : 'FREE'}
                liveAud={diffInMillisec(item?.startDate) == 0 ? '• LIVE' : null}
                liveAudCount={item?.totalStudents}
                endTimer={`${diffInMillisecEndCalc(item?.startDate, item?.endDate)}`}
                startTimer={`${diffInMillisec(item?.startDate)}`}
                isCourseLive={diffInMillisec(item?.startDate) > 0 ? false : true}
            // endTimer={5000}
            // startTimer={15000}
            />
        );
    };
    const goToCourseName = (productId) => {
        // navigation.navigate('CourseVideoScreen')
        // navigation.navigate('CourseDetailScreen')
        navigation.navigate('CourseDetailScreen', {
            productId
        });
    };

    const goToOnlineExam = (id) => {
        navigation.navigate('OnlineExamInstructionScreen', {
            testId: id, testType: 1
        });
        // navigation.navigate('OnlineExamInstructionScreen')
    };


    const initializeZoom = async () => {
        const token = await asyncStorageRead('@token');
        // console.log('HomeToken', token);
        ZoomUs.initialize({
            clientKey: ZOOM_CLIENT_KEY,
            clientSecret: ZOOM_CLIENT_SECRET,
        }).then(res => {
            // console.log(res);
            setIsInitialized(true);
        }).catch(err => {
            // console.log(err);
        });
    }

    // const joinMeeting = (data) => {
    //     ZoomUs.joinMeeting({
    //         userName: name,
    //         meetingNumber: data?.meetingId,
    //         password: data?.meetingPassword,
    //         // participantID: 'our-unique-id',
    //         noAudio: true,
    //         noVideo: true,
    //     })
    // }

    const courseChapterDetails = (item) => {
        const chapter = find(item, (item) => item.node.key == 'chapters');
        const duration = find(item, (item) => item.node.key == 'duration');
        return `${chapter.node.value} Chapters • ${duration.node.value} Hrs`;
    }

    const renderPopularCoursesItem = ({ item }) => (
        <PopularCardRow
            onPress={() => navigation.navigate('ShopifyWebViewHome', { course: item })}
            heading={item.node.title}
            subHeading={item.node.metafields.edges.length > 0 ? courseChapterDetails(item.node.metafields.edges) : ''}
            cost={`₹${item.node.priceRange.maxVariantPrice.amount / 100}`}
            headImage={
                item.node.images.edges.length > 0 ?
                    { uri: item.node.images.edges[0].node.originalSrc } :
                    require('../../../assets/images/testPinkBg.png')
            }
        />
    )
    const renderOnlineExamItem = ({ item }) => {
        // // console.log(item, '---imte test');
        // // console.log(item?.startDate)
        return (
            <CardTests
                onPress={() => goToOnlineExam(item.testId.toString())}
                testType={item?.isFree}
                headImage={require('./../../../assets/images/orangeTestBoard.png')}
                bgImage={require('./../../../assets/images/testPinkBg.png')}
                heading={item?.testTitle}
                courseName={item?.courseName}
                subHeading={`${tConvert(item?.startDate)}, ${splitDate(item?.startDate)}`}
                // subHeading={'10:30 AM, 07 July, 2021'}
                endTimer={`${diffInMillisecEndCalc(item?.startDate, item?.endDate)}`}
                startTimer={`${diffInMillisec(item?.startDate)}`}
            // entryWindowTime={item?.entryWindowTime}
            />)
    }

    const swiperNavigation = (data) => {
        const { contentType } = data;
        switch (contentType) {
            case 1:
                navigation.navigate('PdfViewer', {
                    topicId: data?.lastTopicId,
                    productId: data?.productId,
                    // topicFile: e?.topicFile,
                    subjectId: data?.lastSubjectId,
                });
                break;
            case 4:
                navigation.navigate('HTMLViewer', {
                    topicId: data?.lastTopicId,
                    productId: data?.productId,
                    // topicFile: e?.topicFile,
                    subjectId: data?.lastSubjectId,
                });
                break;
            case 6:
                navigation.navigate('CourseVideoScreen', {
                    topicId: data?.lastTopicId,
                    productId: data?.productId,
                    // topicFile: e?.topicFile,
                    subjectId: data?.lastSubjectId,
                });
                break;
            default: null;
        }
    }

    return (
        <ScrollContainer style={styles.scrollContainer}>
            <View style={styles.container}>

                <Header
                    hideBack
                    leftGroupName={'Ionicons'}
                    leftIcon={'arrow-back'}
                    leftAction={() => { }}
                    headerLabel={I18n.t("home.home_header")}
                />
                <View style={styles.headerBG}>
                    <View style={styles.swiperHeaderBG} />
                    <FeatureImagesSwiper goToCourses={
                        () => navigation.navigate('Search')
                    } goToVideo={(data) => {
                        // console.log(data, 'clicked data')
                        swiperNavigation(data);
                    }} data={pendingCourseData} />
                </View>


                <View>
                    <CustomText styles={styles.titleText} content={I18n.t("home.my_courses")} />
                    {studentCourseData?.length > 0 ?
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            horizontal
                            style={{}}
                            contentContainerStyle={styles.sectionSpacing}
                            data={[...studentCourseData, { lastImage: true }]}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                        />
                        :
                        <View style={[styles.alignCen, styles.sectionSpacing]}>
                            <CoursesCardZeroState
                                exploreCourses={() => navigation.navigate('Search')}
                                headImage={require('./../../../assets/images/courseCardZeroTop.png')}
                                bgImage={require('./../../../assets/images/bluebgcard.png')}
                            />
                        </View>
                    }
                </View>




                <View>
                    <CustomText styles={styles.titleText} content={I18n.t("home.upcoming_live_classes")} />

                    {upcomingLiveCourseData?.length > 0 ?
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            horizontal
                            style={{}}
                            contentContainerStyle={styles.sectionSpacing}
                            data={upcomingLiveCourseData}
                            renderItem={renderUpcomingCourseItem}
                            keyExtractor={(item) => item.meetingId}
                            extraData={upcomingLiveCourseData}
                        /> :
                        <View style={styles.sectionSpacing}>
                            {/* <UpcomingLiveClassZero
                headImage={require('./../../../assets/images/zeroLiveClassApple.png')}
                bgImage={require('./../../../assets/images/liveClassZeroState.png')}

              /> */}
                            <UpcomingLiveClassZeroState
                                headImage={require('./../../../assets/images/zeroLiveClassApple.png')}
                                heading={I18n.t("home.no_live_classes_planned")}
                                subHeading={I18n.t("home.please_check_again_after_some_time")}
                            />
                        </View>

                    }
                </View>
                <View>
                    <CustomText styles={styles.titleText} content={I18n.t("home.upcoming_live_courses")} />
                    {
                        (testsListData && testsListData.length > 0) ?
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                horizontal
                                contentContainerStyle={styles.sectionSpacing}
                                data={testsListData}
                                renderItem={renderOnlineExamItem}
                                keyExtractor={item => item.id}
                                extraData={testsListData}
                            />
                            : <CardTestsZeroState
                                headImage={require('./../../../assets/images/upcomingTestZero.png')}
                                heading={I18n.t("home.no_live_tests_planned")}
                                subHeading={I18n.t("home.please_check_again_after_some_time")}
                            />
                    }
                </View>

                <View>
                    <CustomText styles={[styles.titleText]} content={I18n.t("global.popular_courses")} />
                    {
                        (popularCourses && popularCourses.length > 0) ?
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                horizontal
                                contentContainerStyle={styles.sectionSpacing}
                                data={popularCourses}
                                renderItem={renderPopularCoursesItem}
                                keyExtractor={item => item.node.id}
                            />
                            : <CardTestsZeroState
                                headImage={require('./../../../assets/images/upcomingTestZero.png')}
                                heading={I18n.t("home.no_courses_available")}
                                subHeading={I18n.t("home.please_check_again_after_some_time")}
                            />
                    }
                </View>


                <View>
                    {/* <CustomText styles={styles.titleText} content={I18n.t("home.upcoming_live_courses")} />
                    <CardTests
                        onPress={goToOnlineExam}
                        testType={'FREE'}
                        headImage={require('./../../../assets/images/orangeTestBoard.png')}
                        bgImage={require('./../../../assets/images/testPinkBg.png')}
                        heading={'Organic Chemistry Mix Problems'}
                        subHeading={'10:30 AM, 07 July, 2021'}
                    /> */}
                    {/* <CardTestsZeroState
            headImage={require('./../../../assets/images/upcomingTestZero.png')}
            heading={I18n.t("home.no_live_tests_planned")}
            subHeading={I18n.t("home.please_check_again_after_some_time")}
          /> */}
                    {/* <CustomText
            styles={styles.titleText}
            content={I18n.t('home.news_announcement')}
          />
          <NewsZeroState
            headImage={require('./../../../assets/images/newsZero.png')}
            heading={I18n.t("home.no_news_annc")}
            subHeading={I18n.t("home.please_check_again_after_some_time")}
          /> */}

                    {/* <NewsCard
            newsText={'News'}
            headImage={require('./../../../assets/images/newsHeadCal.png')}
            bgImage={require('./../../../assets/images/newsGrayBg.png')}
            heading={'New Live Chemistry Course'}
            subHeading={
              'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et'
            }
          /> */}

                </View>

            </View>

            <CustomButton
                btnText={styles.exploreText}
                btnStyle={styles.exploreBtn}
                title={I18n.t('home.explore_courses')}
                handler={() => {

                    // clearAsyncStorage()
                    // setTimeout(async () => {
                    //   const val = await asyncStorageRead('@token')
                    //   // console.log(val, '--redefinded')
                    // }, 6000)

                }}
                handler={() => navigation.navigate('Search')}
                // isLoginLoading={isLoader ? isLoginLoading : false}
                disabled={false}
            />
            <Loader loading={loading} />

        </ScrollContainer>
    );
}
