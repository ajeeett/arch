import React, { useState, useEffect } from 'react';
import { get } from 'lodash';
import {
  Text,
  View,
  TouchableOpacity,
  BackHandler,
  Keyboard,
  Alert,
  Image,
  TouchableWithoutFeedback,
  ScrollView,
  FlatList,
} from 'react-native';
import styles from './styles';
import Header from '../../../globalComponents/Header/index';
import FeatureImagesSwiper from '../../../globalComponents/ImageSwiper/FeatureImagesSwiper';
import ScrollContainer from '../../../globalComponents/ScrollContainer';
import { colors } from '../../../utils/config/colors';
import CoursesCard from '../../../globalComponents/CoursesCard';
import CardTests from '../../../globalComponents/CardTests';
import NewsCard from '../../../globalComponents/NewsCard';
import CustomButton from '../../../globalComponents/CustomButton';
import CustomText from '../../../globalComponents/CustomText';
import CoursesTopSection from '../../../globalComponents/CoursesTopSection';
import { useFocusEffect } from '@react-navigation/native';
import { List } from 'react-native-paper';
import { fontBold, fontRegular, fontSemiBold } from '../../../utils/config/fonts';
import { width } from '../../../utils/config/theme';
import OnlineGreen from '../../../assets/svg/OnlineGreen';
import CollapsibleList from '../../../globalComponents/CollasibleList/index';
import VideoPlayer from '../../../globalComponents/VideoPlayer';
import { useDispatch, useSelector } from 'react-redux';
import { showSnackBar } from '../../../utils/Helper/helper';
import {
  fetchCourseProductDetail,
  clearCourseProductDetail,
} from '../../../actions/courseActions';
import Loader from '../../../globalComponents/Loader';
import { isTablet } from 'react-native-device-info';
import { clearTestDetails } from '../../../actions/onlineExamActions';

export default function CourseDetailScreen({ navigation, route }) {
  const [currentIndex, setCurrentIndex] = useState(null);
  const [resourceCount, setResourceCount] = useState('');
  const [expanded, setExpanded] = React.useState(false);

  const productId = route?.params?.productId;
  console.log(productId, '---prod');

  const handlePress = () => setExpanded(!expanded);

  const courseData = [
    {
      category: 'Physics',
      subCategories: [
        {
          id: 0,
          val: 'test',
        },
      ],
    },
    {
      category: 'Chemistry',
      subCategories: ['a', 'b'],
    },
    {
      category: 'Maths',
      subCategories: ['a', 'b'],
    },
    { '': '' },
    { '': '' },
    { '': '' },
    { '': '' },
    { '': '' },
    { '': '' },
    { '': '' },
    { '': '' },
    { '': '' },
    { '': '' },
    { '': '' },
    { '': '' },
    { '': '' },
    { '': '' },
    { '': '' },
    { '': '' },
    { '': '' },
  ];

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [courseProductDetails, setCourseProductDetails] = useState({});

  const courseDetails = useSelector(state => state.courseReducer);
  const isLoading = useSelector(state =>
    get(state, 'courseReducer.isLoading', false),
  );
  const courseProductData = useSelector(state =>
    get(state, 'courseReducer', {}),
  );

  // useEffect(() => {
  //     fetchCourseData(productId);
  // }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchCourseData(productId);
      clearPreviousDetails();
      return () => { };
    }, []),
  );

  const clearPreviousDetails = async () => {
    await dispatch(clearTestDetails());
  }

  useEffect(() => {
    setLoading(isLoading);
    if (courseProductData?.productDetailFetchSuccess) {
      console.log(courseProductData?.courseProductDetail, '--??');
      console.log(courseProductData?.courseProductDetail?.data, '--??12345');
      // console.log(courseProductData?.courseProductDetail?.data?.subject[0]?.chapters, '--??12345');
      if (courseProductData?.courseProductDetail?.data?.subject != null) {
        const data =
          courseProductData?.courseProductDetail?.data?.subject[0]?.chapters[0]
            ?.topics;
        var count = 0;
        for (let index = 0; index < data?.length; index++) {
          console.log(data[index].topicFile, '---data[index]');
          if (data[index].topicFile != null) {
            count = count + 1;
          }
          // if( typeof data[index] !== 'undefined' ) {
          //     // foo could get resolved and it's defined
          // }
          // const element = data[index];
          // const isEmpty = Object.values(data[index]).every(x => (x === null || x === ''));
          // console.log(Object.keys(data[index]), '---isEmpty');
        }
        setResourceCount(count);
        console.log(count, '---finalCount');

        // for (var topicFile in data) {
        //     // if (data[topicFile] !== null) {
        //     //     console.log(data[topicFile] + " is blank. Deleting it");
        //     //     count = count + 1;
        //     // }
        // }
        // console.log(count, '-----cccdddddddd')
        // const result = courseProductData?.data?.subject[0]?.chapters[0]?.topics.reduce((r, o) =>

        //     r + +!Object.values(o).includes(null)
        //     , 0);

        // console.log(result, '---var');

        setCourseProductDetails(courseProductData?.courseProductDetail?.data);
        // dispatch(clearCourseProduct());
      }
    } else if (courseProductData?.courseProductDetail?.error) {
      // setCourseProductDetails([])
      showSnackBar(courseProductData?.courseProductDetail?.error);
      // dispatch(clearCourseProductDetail());
    }
  }, [courseProductData]);

  const fetchCourseData = async () => {
    // const token = getAccessToken();
    // await dispatch(fetchCourseProduct());
    console.log('fetching');
    let payload = {
      ProductId: productId,
    };

    await dispatch(clearCourseProductDetail());
    await dispatch(fetchCourseProductDetail(payload));
    // await dispatch(clearCourseProductDetail(payload));

    setLoading(isLoading);
  };

  return (
    <ScrollContainer>
      <View style={styles.container}>
        <Header
          leftGroupName={'Ionicons'}
          leftIcon={'arrow-back'}
          leftAction={() => { }}
          headerLabel={'COURSE HOME'}
        />

        <View
          style={isTablet() ? { marginHorizontal: 20 } : { marginHorizontal: 20 }}>
          <CoursesTopSection
            title={courseProductDetails?.product?.name}
            desc={courseProductDetails?.product?.description}
            courseImage={
              courseProductDetails?.product?.courseImage
              // uri: 'https://admindev-v1.allendigital.in/images/course/2343086e-1e05-4978-a8c3-da50aaad1f5e.png'

              // courseProductDetails?.product?.course?.courseImage
            }
          />

          <CustomText styles={styles.labelText} content={'Course Structure'} />
        </View>

        <CollapsibleList
          subjectArray={
            courseProductDetails?.subject ? courseProductDetails.subject : []
          }
          resourceCount={resourceCount}
          courseData={courseData}
          goToVideo={(e, i) => {
            console.log(e, 'clicked data####');
            console.log(i);
            var status = e?.status;
            if (status && e?.enableBeforeLiveClass && e?.contentType == 6) {
              navigation.navigate('CourseVideoScreen', {
                topicId: e.id,
                productId: productId,
                topicFile: e?.topicFile,
                subjectId: i?.id,
              });
            } else if (status && e?.enableBeforeLiveClass && e?.contentType == 1) {
              console.log(e, '----Go to pdf');

              navigation.navigate('PdfViewer', {
                source: e?.topicFile,
                topicId: e.id,
                productId: productId,
                topicDuration: e?.topicDuration,
              });
            } else if (status && e?.enableBeforeLiveClass && e?.contentType == 4) {
              console.log(e, '----Go to HTMLViewer');
              navigation.navigate('HTMLViewer', {
                data: e,
                screenTitle: e?.name,
                topicId: e.id,
                productId: productId,
                topicDuration: e?.topicDuration,
              });
            } else if (e?.contentType == 5 && e?.ispaid == 0) {
              console.log(e, '----basic type');
              showSnackBar('This is a live class');
            } else if (e?.contentType == 0 && e?.ispaid == 0) {
              console.log(e, '----basic type');
              showSnackBar('This is a live Test');
            } else if (status && e?.contentType == 5 && e?.ispaid == 1) {
              console.log(e, '----basic type');
              showSnackBar('You have not purchased this course');
            } else if (status && e?.enableBeforeLiveClass && e?.contentType == 2) {
              console.log(e, '----Go to TEst');
              navigation.navigate('OnlineExamInstructionScreen', {
                testId: e?.url, testType: 2
              });
            } else if (status && !e?.enableBeforeLiveClass) {
              showSnackBar('Please attend live class to view the topic');
            } else {
              showSnackBar('Sorry, You did not purchased this subject / topic');
            }
          }}
        />

        <Loader loading={loading} />
      </View>
    </ScrollContainer>
  );
}
