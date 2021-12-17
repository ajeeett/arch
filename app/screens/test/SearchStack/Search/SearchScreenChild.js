import React, { useState, useEffect } from 'react';
import { View, Animated, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useLazyQuery } from '@apollo/client';
import { get, find, isEmpty } from 'lodash';
import { useFocusEffect } from '@react-navigation/core';
import styles from './styles';
import { colors } from '../../../utils/config/colors';
import CustomText from '../../../globalComponents/CustomText'
import Header from '../../../globalComponents/Header';
import SearchComponent from '../../../globalComponents/SearchComponent';
import PopularCardRow from '../../../globalComponents/PopularCardRow';
import ScrollContainer from '../../../globalComponents/ScrollContainer';
import CourseDataRow from '../../../globalComponents/CourseDataRow';
import { getShopifyBestSellingProduct, getShopifyProductByType, getShopifyProductQuery, getShopifyProductRelevance } from '../../../api/gplQuery';
import { showSnackBar } from "../../../utils/Helper/helper";
import { fetchStudentDivisionClear, fetchStudentDivisionRequest } from '../../../actions/studentDivisionActions';
import I18n from '../../../utils/config/I18n';
import Loader from '../../../globalComponents/Loader';
import { fetchShopifyCoursesClear, fetchShopifyCoursesRequest } from '../../../actions/shopifyActions';

export default function SearchScreenChild({ navigation, collectionId }) {
    // hide/show the header along user scroll
    const scrollY = new Animated.Value(0);
    const diffClamp = Animated.diffClamp(scrollY, 0, 150);
    const translateY = diffClamp.interpolate({
        inputRange: [0, 150],
        outputRange: [0, -150],
    });

    const dispatch = useDispatch();
    const shopifyCoursesResponse = useSelector(state => get(state, 'shopifyCoursesReducer', ''));
    const studentDivisionResponse = useSelector(state => get(state, "studentDivisionReducer", ""))

    const [loading, setLoading] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [responseData, setResponseData] = useState({});
    const [gqlDivisionQuery, setGqlDivisionQuery] = useState('');
    const [divisionName, setDivisionName] = useState([]);
    const [popularCourses, setPopularCourses] = useState([]);
    const [result, setResult] = useState({});
    const [cursor, setCursor] = useState(null);
    const [shopifyPurchasedCourses, setShopifyPurchasedCourses] = useState('');

    const [getDatafromShopify, { error, data }] = useLazyQuery(getShopifyProductQuery(searchText, `(${gqlDivisionQuery})`));
    const [getAllCoursesfromShopify, resultant] = useLazyQuery(getShopifyProductByType(`(${gqlDivisionQuery})`));
    const [getRelevanceShopifyProduct, relevanceShopifyProduct] = useLazyQuery(getShopifyProductRelevance(`(${gqlDivisionQuery})`))
    const [getBestSellingShopifyProduct, bestSelling] = useLazyQuery(getShopifyBestSellingProduct(), {
        variables: { "ids": [collectionId] }
    });

    const fetchShopifyData = async () => {
        try {
            setLoading(true);
            getDatafromShopify();
        } catch (e) {
            console.log(`Error occurred in API: ${e}`);
        }
    }

    const getStudentDivision = async () => {
        setLoading(true);
        await dispatch(fetchStudentDivisionRequest());
    }

    useFocusEffect(
        React.useCallback(() => {
            setSearchText("");
            fetchShopifyCourseData();
            getBestSellingShopifyProduct();
            getAllCoursesfromShopify();
            return () => { }
        }, [])
    );

    const fetchShopifyCourseData = async () => {
        await dispatch(fetchShopifyCoursesRequest());
    }

    useEffect(() => {
        isEmpty(studentDivisionResponse?.data) ? getStudentDivision() : null;

        // set loader false after 10 secs
        const timer = () => setTimeout(() => { setLoading(false) }, 10000);
        const setTimer = timer();

        return () => clearTimeout(setTimer);
    }, []);

    const callGqlQueries = async () => {
        setLoading(true);
        await getAllCoursesfromShopify();
        await getBestSellingShopifyProduct();
    }

    useEffect(() => {
        try {
            if (studentDivisionResponse?.studentDivisionFetchSuccess && !isEmpty(studentDivisionResponse?.data)) {
                const studentDivisionData = studentDivisionResponse.data;

                // console.log(`SEARCH_CHILD: division ID ------------------ `, studentDivisionData);

                if (studentDivisionData.length > 0 && popularCourses && popularCourses.length <= 0) {
                    let filterDivisionName = [];
                    let gqlQueryOnDivision = [];

                    studentDivisionData.forEach(item => {
                        gqlQueryOnDivision.push(`product_type:'${item.name}'`)
                        filterDivisionName.push(item.name)
                    });

                    setGqlDivisionQuery(gqlQueryOnDivision.join(` OR `));
                    setDivisionName(filterDivisionName);

                    // console.log(popularCourses, 'Popular courses object: SEARCH_CHILD');

                    if (popularCourses && popularCourses.length <= 0) {
                        // console.log(`Popular courses is empty. So calling queries: SEARCH_CHILD`);
                        callGqlQueries();
                    }
                } else if (isEmpty(result?.data)) {
                    // console.log('student division id/popular courses is empty, so executing all courses query: SEARCH_CHILD');
                    setLoading(true);
                    getAllCoursesfromShopify();
                }
            } else if (studentDivisionResponse?.error) {
                showSnackBar(studentDivisionResponse?.error);
                // console.log(studentDivisionResponse?.error, "======= studentDivisionResponse?.error");
                dispatch(fetchStudentDivisionClear());
            }
        } catch (e) {
            showSnackBar(I18n.t('global.something_went_wrong'))
            console.log(e.message, "==========!!! Error: SEARCH_CHILD");
        }
    }, [studentDivisionResponse]);

    useEffect(() => {
        try {
            if (shopifyCoursesResponse?.shopifyCoursesFetchSuccess) {
                setShopifyPurchasedCourses(shopifyCoursesResponse?.data);
                getBestSellingShopifyProduct();
                getAllCoursesfromShopify();
            } else if (shopifyCoursesResponse?.error) {
                showSnackBar(shopifyCoursesResponse?.error);
                dispatch(fetchShopifyCoursesClear());
                console.log('Shopify courses error in home => ', shopifyCoursesResponse?.error);
            } else {
                console.log("No data in shopify courses reducers: SEARCH");
            }
        } catch (e) {
            dispatch(fetchShopifyCoursesClear());
            console.log('Shopify courses error in catch block! ==== HOME:ERROR!', e.message);
        }
    }, [shopifyCoursesResponse])

    useEffect(() => {
        if (!isEmpty(searchText)) { fetchShopifyData(); }
        else if (isEmpty(searchText) && Array.isArray(responseData)) {
            setResponseData({});
            setLoading(false);
        }
    }, [searchText]);

    useEffect(() => {
        if (!isEmpty(searchText) && !isEmpty(data)) {
            consolidateSearchResult(data);
        };
    }, [data]);

    useEffect(() => {
        if (resultant?.data) {
            let items = [];
            resultant?.data?.products?.edges.forEach(item => {
                if (!shopifyPurchasedCourses.includes(item?.node?.id))
                    items.push(item)
            })
            setResult(items);
            setLoading(false);
        }
    }, [resultant])

    useEffect(() => {
        // if (popularCourses && popularCourses.length <= 0) {
        // console.log(`bestSelling => `, bestSelling.data)

        if (bestSelling.data) {
            if (bestSelling.data?.nodes[0]?.products?.edges.length > 0) {
                let bestSellingData = bestSelling.data?.nodes[0]?.products?.edges;
                let items = [];
                bestSellingData.forEach(element => {
                    if (divisionName.includes(element?.node?.productType) && !shopifyPurchasedCourses.includes(element?.node?.id)) items.push(element)
                });

                if (items.length > 0) {
                    setPopularCourses(items);
                    setLoading(false)
                } else {
                    setLoading(true);
                    setPopularCourses([]);
                    getRelevanceShopifyProduct();
                };
            }
        } else {
            console.log("bestSelling.data not found: SEARCH_CHILD")
        }
        // } else {
        //     console.log('Popular courses is not empty, so bestselling useeffect is executed!!: SEARCH_CHILD');
        // }
    }, [bestSelling])

    useEffect(() => {
        let { data, loading, called } = relevanceShopifyProduct;

        if (data?.products?.edges.length > 0) {
            let items = [];
            data?.products?.edges.forEach(item => {
                if (!shopifyPurchasedCourses.includes(item?.node?.id)) items.push(item);
            })
            setPopularCourses(items)
            setLoading(false);
        } else if (data && called && !loading) {
            setPopularCourses([])
            setLoading(false);
        }
    }, [relevanceShopifyProduct])

    useEffect(() => {
        if (error) {
            setLoading(false);
            if (error.message != 'Throttled') showSnackBar(I18n.t('global.something_went_wrong'))
            console.log(error.message, "error ==========!!! Error");
        }
        if (resultant.error) {
            setLoading(false);
            if (resultant.error.message != 'Throttled') showSnackBar(I18n.t('global.something_went_wrong'))
            console.log(resultant.error.message, "resultant.error ==========!!! Error");
        }
        if (bestSelling.error) {
            setLoading(false);
            if (bestSelling.error.message != 'Throttled') showSnackBar(I18n.t('global.something_went_wrong'))
            console.log(bestSelling.error.message, "bestSelling.error ==========!!! Error");
        }
        if (relevanceShopifyProduct.error) {
            setLoading(false);
            if (relevanceShopifyProduct.error.message != 'Throttled') showSnackBar(I18n.t('global.something_went_wrong'))
            console.log(relevanceShopifyProduct.error.message, "relevanceShopifyProduct.error ==========!!! Error");
        }
    }, [error, resultant.error, bestSelling.error, relevanceShopifyProduct.error]);

    const consolidateSearchResult = async (data) => {
        let searchResultData = [];
        let productVariantsEdges = data?.productVariants?.edges || [];
        let productEdges = data?.products?.edges || [];
        productVariantsEdges?.length > 0 ? productVariantsEdges.map(item => {
            let product = JSON.parse(JSON.stringify(item));

            if (!shopifyPurchasedCourses.includes(product?.node?.id)) {
                let updateTitle = `${product?.node?.product?.title || ''} (${product?.node?.title || ''})`;
                let variant = product?.node?.id?.split('/');
                let productUrl = `${product?.node?.product?.onlineStorePreviewUrl}?variant=${variant[variant.length - 1]})`
                product.node.product.title = updateTitle;
                product.node.product.onlineStorePreviewUrl = productUrl;
                searchResultData.push(product.node.product)
            }
        }) : null;
        productEdges?.length > 0 ? productEdges?.forEach(item => {
            if (!shopifyPurchasedCourses.includes(item?.node?.id))
                searchResultData.push(item?.node)
        }
        ) : null;

        let finalItem = [];
        await searchResultData.forEach(item => {
            if (divisionName.includes(item.productType)) finalItem.push(item)
        })
        // console.log('finalitem', finalItem);
        if (finalItem.length > 0) { setResponseData(finalItem); }
        else { setResponseData([]) };
        setLoading(false)
    }

    const allCoursesPagination = () => {
        try {
            // console.log('Flatlist end', result.data.products.edges.length);

            let lastCursor = (result?.data) ? result?.data?.products?.edges[result?.data?.products?.edges.length - 1].cursor : null;
            // console.log("Cursor", cursor);
            // console.log("lastCursor", lastCursor);
            // console.log("result.data.products.pageInfo.hasNextPage", result.data.products.pageInfo.hasNextPage);
            // console.log("lastCursor != cursor", lastCursor != cursor)
            // console.log("!resultant.loading", !resultant.loading)

            let condition = result?.data?.products?.pageInfo?.hasNextPage && lastCursor != cursor && !resultant.loading;
            // console.log("Condition => ", condition)

            if (condition) {
                setCursor(lastCursor);
                resultant.fetchMore({
                    variables: { cursor: lastCursor },
                    updateQuery: (prevResult, { fetchMoreResult }) => {
                        if (!fetchMoreResult)
                            return prevResult;
                        // console.log("Pre ", prevResult);
                        // console.log("FetchMore", fetchMoreResult);
                        let combinedData = {
                            products: {
                                edges: [...prevResult.products.edges, ...fetchMoreResult.products.edges],
                                pageInfo: { ...fetchMoreResult.products.pageInfo }
                            }
                        }
                        // console.log("combinerd", combinedData);
                        return combinedData;
                    }
                })
            }
        } catch (e) {
            // console.log('error caught at allcoursespagination', e.message);
        }
    }

    const courseChapterDetails = (item) => {
        const chapter = find(item, (item) => item.node.key == 'chapters');
        const duration = find(item, (item) => item.node.key == 'duration');
        return `${chapter.node.value} Chapters • ${duration.node.value} Hrs`;
    }

    const renderPopularCoursesItem = ({ item }) => {
        // console.log('Pop', item);
        return (
            <PopularCardRow
                onPress={() => navigation.navigate('ShopifyWebView', { course: item })}
                heading={item.node.title}
                subHeading={item.node.metafields.edges.length > 0 ? courseChapterDetails(item.node.metafields.edges) : ''}
                cost={`₹${item.node.priceRange.maxVariantPrice.amount / 100}`}
                headImage={
                    item.node.images.edges.length > 0 ?
                        { uri: item.node.images.edges[0].node.originalSrc } :
                        require('./../../../assets/images/testPinkBg.png')
                }
            />
        )
    }

    const RenderSearchCourseRowData = ({ item }) => (
        <CourseDataRow heading={item.title}
            onPress={() => navigation.navigate('ShopifyWebView', { course: item })}
            subHeading={item.metafields.edges.length > 0 ? courseChapterDetails(item.metafields.edges) : ''}
            cost={`₹${item.priceRange.maxVariantPrice.amount / 100}`}
            headImage={item.images.edges.length > 0
                ? { uri: item.images.edges[0].node.originalSrc }
                : require('./../../../assets/images/testPinkBg.png')} />
    )

    const RenderCourseRowData = ({ item }) => (
        <CourseDataRow heading={item.node.title}
            onPress={() => navigation.navigate('ShopifyWebView', { course: item })}
            subHeading={item.node.metafields.edges.length > 0 ? courseChapterDetails(item.node.metafields.edges) : ''}
            cost={`₹${item.node.priceRange.maxVariantPrice.amount / 100}`}
            headImage={item.node.images.edges.length > 0
                ? { uri: item.node.images.edges[0].node.originalSrc }
                : require('./../../../assets/images/testPinkBg.png')} />
    )

    const SearchResult = () => {
        return (
            <>
                {
                    responseData.length == 0 && !Boolean(searchText)
                        ? null :
                        (responseData.length > 0) ?
                            <>
                                <CustomText styles={styles.titleText} content={`${I18n.t('search.search_results')}(${responseData.length})`} />
                                <View style={{ paddingHorizontal: 20 }}>
                                    {responseData.length > 0 && responseData.map((item) =>
                                        <View key={item?.id}>
                                            <RenderSearchCourseRowData item={item} />
                                        </View>
                                    )}
                                </View>
                            </>
                            :
                            <>
                                {!loading ? <View style={styles.responseContainer}>
                                    <CustomText styles={styles.responseText} content={I18n.t('search.no_courses_found')} />
                                </View> : null}
                            </>
                }
            </>
        )
    }
    // { console.log('popular courses', popularCourses); }
    const PredefinedCourses = () => (
        (popularCourses?.length == 0 && isEmpty(result)) ?
            loading == false ?
                <View style={styles.responseContainer} >
                    <CustomText styles={styles.responseText} content={I18n.t('search.no_all_courses')} />
                </View> : null
            :
            <>
                {
                    (popularCourses && popularCourses.length > 0) ?
                        <>
                            <CustomText styles={styles.titleText} content={I18n.t('search.popular_courses')} />
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                horizontal
                                contentContainerStyle={styles.flatlistContainer}
                                data={popularCourses}
                                renderItem={renderPopularCoursesItem}
                                keyExtractor={item => item.node.id}
                            />
                        </>
                        : null
                }

                {result && result.length > 0 ?
                    <>
                        <CustomText styles={styles.titleText} content={I18n.t('search.all_courses')} />
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.flatlistContainer}
                            data={result}
                            renderItem={RenderCourseRowData}
                            keyExtractor={item => item.node.id}
                            onEndReachedThreshold={0.5}
                            onEndReached={allCoursesPagination}
                            extraData={result}
                        />

                        {/* {result.data.products.edges.map((item) => 
                             <View key={item.node.id}>
                                 <RenderCourseRowData item={item} />
                             </View>
                         )} */}
                    </>
                    : null
                }
            </>
    )

    return (
        <View style={styles.container}>
            <View
                style={styles.headerPosition}>
                <Animated.View
                    style={[styles.animatedView, { transform: [{ translateY: translateY }] }]}>

                    <Header leftGroupName={'Ionicons'}
                        leftIcon={'arrow-back'}
                        hideBack
                        leftAction={() => { }}
                        headerLabel={'HOME'} />
                    <View style={{ backgroundColor: colors.appBlue }}>
                        <View style={styles.headerView}>
                            <SearchComponent
                                placeholder={'Search'}
                                iconGrpName={'Feather'}
                                iconName={'search'}
                                iconSize={20}
                                iconColor={colors.darkBlue}
                                changeTextHandler={(value) => setSearchText(value)}
                                value={searchText}
                            />
                        </View>
                    </View>
                </Animated.View>
            </View>

            <ScrollContainer onScroll={e => {
                scrollY.setValue(e.nativeEvent.contentOffset.y);
            }}>
                <View style={styles.searchContainerMargTop}>
                    {searchText.length != 0 ? <SearchResult /> : <PredefinedCourses />}
                </View>
                <Loader loading={loading} />
            </ScrollContainer>
        </View>
    );
}
