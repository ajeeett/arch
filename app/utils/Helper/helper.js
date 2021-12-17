import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
import { Platform } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import RNFetchBlob from 'rn-fetch-blob';
import { colors } from '../config/colors';
import { fontBold } from '../config/fonts';
import { width } from '../config/theme';

export const isEmpty = str => {
    if (str == null || str.trim() == '') {
        return true;
    } else {
        return false;
    }
}

export const inValidEmail = str => {
    let email_regex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (!email_regex.test(str)) {
        return true;
    } else {
        return false;
    }
}

export const inValidPassword = str => {
    // let pass_regex = /^[@#](?=.{7,13}$)(?=\w{7,13})(?=.*[A-Z])(?=.*\d)/;
    // let pass_regex = /^(?=.*[A-Z])(?=.*\d)/;
    // let pass_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
    let pass_regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/
    if (!pass_regex.test(str)) {
        return true;
    } else {
        return false;
    }
}

export const isNotPasswordSame = (pass, repass) => {
    if (pass !== repass) {
        return true;
    } else {
        return false;
    }
}


export const inValidPhoneNumber = str => {
    if (str.length < 10 || str.length > 12) {
        return true;
    } else {
        return false;
    }
}
/**
 * 
 * @param {*} msg 
 * @param {*} type danger, default, info, none, success, warning
 * @param {*} bgColor 
 */
export const showSnackBar = (msg, bgColor) => {
    showMessage({
        message: msg,
        type: 'info',
        backgroundColor: bgColor ? bgColor : colors.red,
        color: 'white',
        // titleStyle: {
        //     fontSize: 20,
        //     alignSelf: 'center',
        //     justifyContent: 'center',
        //     paddingTop: 20
        // },
        // style: {
        //     height: 100,
        //     width: width,
        //     textAlign: 'center',
        //     // justifyContent: 'center',
        //     // alignItems: 'center',
        //     padding: 30,
        //     fontFamily: fontBold,
        //     fontSize: 20
        // },
        // textStyle: {
        //     fontFamily: fontBold,
        //     fontSize: 20
        // }
    })
}

export const millisToMinutesAndSeconds = (millis) => {
    var minutes = Math.floor(millis / 60);
    var seconds = ((millis % 60)).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

export const secondsToHms = (seconds) => {
    if (!seconds) return '';

    let duration = seconds;
    let hours = duration / 3600;
    duration = duration % (3600);

    let min = parseInt(duration / 60);
    duration = duration % (60);

    let sec = parseInt(duration);

    if (sec < 10) {
        sec = `0${sec}`;
    }
    if (min < 10) {
        min = `0${min}`;
    }

    if (parseInt(hours, 10) > 0) {
        if (sec == 0 && min == 0) {
            return `${parseInt(hours, 10)}h`
        } else {
            return `${parseInt(hours, 10)}h ${min}m ${sec}s`
        }

    }
    else if (min == 0) {
        return `${sec}s`
    } else if (sec == 0) {
        return `${min}m`
    }
    else {
        return `${min}m ${sec}s`
    }
}

export const convertIsoToDate = (d1, d2) => {
    // var date = new Date('2021-09-04T12:37:00');
    // var year = date.getFullYear();
    // var month = date.getMonth() + 1;
    // var dt = date.getDate();

    // if (dt < 10) {
    //     dt = '0' + dt;
    // }
    // if (month < 10) {
    //     month = '0' + month;
    // }
    var r2 = new Date().toISOString();
    // console.log(r2, '--rw');
    const date1 = new Date('2021-09-04T13:15:30');
    const date2 = new Date(r2);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    // console.log(diffTime + " milliseconds");
    // console.log(diffDays + " days");

    // console.log(getHumanizedDiff(new Date("2021-09-04T13:15:30.000Z") - new Date()));




    const date31 = '2021-09-04T14:15:30.000Z'
    const date32 = '2021-09-04T14:32:30Z'

    const DAY_UNIT_IN_MILLISECONDS = 24 * 3600 * 1000

    const diffInMilliseconds = new Date(date31).getTime() - new Date(date2).getTime()
    const diffInDays = diffInMilliseconds / DAY_UNIT_IN_MILLISECONDS

    // console.log(diffInDays, 'day(s)');
    // console.log(diffInMilliseconds, '---millis');

    return diffTime;
    // // console.log(year + '-' + month + '-' + dt, '---mydate');

}

function getHumanizedDiff(diff) {
    var unitmapping = {
        "days": 24 * 60 * 60 * 1000,
        "hours": 60 * 60 * 1000,
        "minutes": 60 * 1000,
        "seconds": 1000
    };

    return Math.floor(diff / unitmapping.days) + " days " +
        Math.floor((diff % unitmapping.days) / unitmapping.hours) + " hours " +
        Math.floor((diff % unitmapping.hours) / unitmapping.minutes) + " minutes " +
        Math.floor((diff % unitmapping.minutes) / unitmapping.seconds) + " seconds " +
        Math.floor((diff % unitmapping.seconds)) + " milliseconds";
}


export const calculateMillis = (d1) => {

    const date1 = new Date('2021-09-04T12:37:00');
    const date2 = new Date('2021-09-05T12:37:00');
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    // console.log(diffTime + " milliseconds");
    // console.log(diffDays + " days");
    return diffTime;

}


// export const diffInMillisec = (d1) => {

//     var isoDateString = new Date().toISOString();
//     // console.log(isoDateString, '=======?');

//     var currentDate = new Date();
//     var convertedDate = convertUTCDateToLocalDate(new Date(currentDate));

//     // console.log(d1, '---date from server');
//     // console.log(currentDate);
//     // console.log(convertedDate.toISOString(), '--convertedDate');
//     var date2 = convertedDate.toISOString()
//     const DAY_UNIT_IN_MILLISECONDS = 24 * 3600 * 1000

//     const diffInMilliseconds = new Date(d1).getTime() - new Date(date2).getTime()
//     const diffInDays = diffInMilliseconds / DAY_UNIT_IN_MILLISECONDS

//     // console.log(diffInDays, 'day(s)');
//     // console.log(diffInMilliseconds, '---millwwwis');
//     return diffInMilliseconds > 0 ? diffInMilliseconds : 0;

// }

const getDate = () => {
    var date = new Date().toISOString();

    // console.log(date);

    // var datetime = moment(date).format("YYYY-MM-DDTHH:mm:ss.SSS");
    var datetime = moment(date).format("YYYY-MM-DDTHH:mm:ss");

    // console.log(datetime, '--final');
    return datetime;
}

export const diffInMillisec = (d1) => {

    var cDate = getDate()
    const DAY_UNIT_IN_MILLISECONDS = 24 * 3600 * 1000
    const diffInMilliseconds = new Date(d1).getTime() - new Date(cDate).getTime()
    const diffInDays = diffInMilliseconds / DAY_UNIT_IN_MILLISECONDS

    // console.log(d1, '---server end date');
    // console.log(cDate, '---my end date');
    // console.log(diffInDays, 'day(s)');
    // console.log(diffInMilliseconds, '---end millwwwis');
    return diffInMilliseconds > 0 ? diffInMilliseconds : 0;


    // var currentDate = new Date();
    // var convertedDate = convertUTCDateToLocalDate(new Date(currentDate));

    // // console.log(d1, '---end date from server');
    // // console.log(currentDate);
    // // console.log(convertedDate.toISOString(), '-- end convertedDate');
    // var date2 = convertedDate.toISOString()
    // const DAY_UNIT_IN_MILLISECONDS = 24 * 3600 * 1000

    // const diffInMilliseconds = new Date(d1).getTime() - new Date(date2).getTime()
    // const diffInDays = diffInMilliseconds / DAY_UNIT_IN_MILLISECONDS

    // // console.log(diffInDays, 'day(s)');
    // // console.log(diffInMilliseconds, '---end millwwwis');
    // return diffInMilliseconds > 0 ? diffInMilliseconds : 0;

}


export const diffInMillisecEndCalc = (d1, d2) => {
    let start = moment(d1).format("YYYY-MM-DDTHH:mm:ss");
    let current = moment().format("YYYY-MM-DDTHH:mm:ss");

    let time = (start >= current) ? start : current;

    var cDate = getDate()
    const DAY_UNIT_IN_MILLISECONDS = 24 * 3600 * 1000
    const diffBwCurrentEnd = new Date(d2).getTime() - new Date(time).getTime()
    // console.log(diffBwCurrentEnd, '--diffBwCurrentEnd');

    if (diffBwCurrentEnd > 0) {
        const diffInMilliseconds = new Date(d2).getTime() - new Date(time).getTime()
        // console.log('diffInMilliseconds', diffInMilliseconds);
        const diffInDays = diffInMilliseconds / DAY_UNIT_IN_MILLISECONDS

        // console.log(d1, '---server start date');
        // console.log(d2, '---server end date');
        // console.log(diffInDays, 'day(s)');
        // console.log(diffInMilliseconds, '---end millwwwis');
        return diffInMilliseconds > 0 ? diffInMilliseconds : 0;
    } else {

        return 0;
    }



}


export const diffInMillisec1 = (d1) => {

    const date1 = '2021-09-04T13:15:30Z'
    const date2 = '2021-09-05T13:15:30Z'
    var currentDate = new Date();
    var were = convertUTCDateToLocalDate(new Date(currentDate));

    // console.log(d1);
    // console.log(currentDate);
    // console.log(were.toISOString(), '--op');
    // let istDate = moment().tz("Asia/Kolkata");
    // // console.log(istDate, '--istDate');
    const DAY_UNIT_IN_MILLISECONDS = 24 * 3600 * 1000

    const diffInMilliseconds = new Date(d1).getTime() - new Date(currentDate).getTime()
    const diffInDays = diffInMilliseconds / DAY_UNIT_IN_MILLISECONDS

    // console.log(diffInDays, 'day(s)');
    // console.log(diffInMilliseconds, '---millwwwis');
    return diffInMilliseconds;

}

function convertUTCDateToLocalDate(date) {
    var newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate;
}

export const asyncStorageAdd = async (itemName, item) => {
    try {
        await AsyncStorage.setItem(itemName, item);
        return true;
    }
    catch (e) {
        return e;
    }
}

export const asyncStorageRead = async (itemName) => {
    let item = await AsyncStorage.getItem(itemName);
    return item;
}

export const clearAsyncStorage = async () => {
    AsyncStorage.clear()
}

export const convertMinsToSecs = (minutes) => {
    return minutes * 60;
}

export const convD = (date) => {

}

export const formatToReadableDate = (date) => {
    var datetime = moment(date).format("DD/MM/YYYY hh:mm A");
    return datetime;
}


export const getNext30Date = (date) => {
    const nextDate = moment(date).add(30, 'days').format("DD/MM/YYYY hh:mm A");
    console.log(nextDate, '----pp?')
    return nextDate;
}

export const tConvert = (date) => {
    // Check correct time format and split into components
    // time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    // if (time.length > 1) { // If time format correct
    //     time = time.slice(1);  // Remove full string match value
    //     // console.log(time, "----finalTimer");
    //     time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
    //     time[0] = +time[0] % 12 || 12; // Adjust hours
    // }

    const date1 = date;
    var dateee = moment(date1).format("hh:mm A");
    // console.log(dateee, "--dateeedateee");

    return dateee; // return adjusted time or original string


    // const timeString12hr = new Date('1970-01-01T' + time + 'Z')
    //     .toLocaleTimeString('en-US',
    //         { timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric' }
    //     );
    // return timeString12hr
}

export const splitDate = (date) => {
    var splittedDateArr = date.split('T');
    var splittedDate = moment(splittedDateArr[0]).format('DD MMM YYYY')
    return splittedDate;
}

export const decimalNumericOnly = (text) => {
    return text.replace(/[`~A-Za-z!@#$%^&*()_|\=?;:'",<>\s\{\}\[\]\\\/]/gi, "");
}

export const fetchImageFromUrl = (url) => {
    let folderName = url.includes('Question') ? 'Question' : "Answer";
    let img = url.split('/');
    let newImgUri = img[img.length - 1];
    let imageName = `${newImgUri}`;

    let dirs = RNFetchBlob.fs.dirs;
    let path = Platform.OS === 'ios' ? dirs['MainBundleDir'] + imageName : `${dirs.PictureDir}/AllenClassroom/${folderName}/${imageName}`;
    return new Promise((resolve, reject) => {
        RNFetchBlob.config({
            fileCache: true,
            appendExt: 'png',
            indicator: false,
            IOSBackgroundTask: true,
            path: path,
            addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                path: path,
                description: 'Image'
            },
        }).fetch("GET", url).then(res => {
            console.log(res, 'end downloaded')
            resolve(res);
        }).catch(e => {
            console.log('error in rnfetchblob');
            reject(false)
        });
    })
}