const { google } = require('googleapis');
const { OAuth2 } = google.auth

// Provide the required configuration
const calendarId = 'a89e433cde36b85b38f03f6ad0deed90d00a2a8620015345ada5a0aa762424c0@group.calendar.google.com';

// Google calendar API settings
const SCOPES = 'https://www.googleapis.com/auth/calendar';


const oAuth2Client = new OAuth2(
    '1088946478630-tjionoco3ncff20jioep3qnjhml8uros.apps.googleusercontent.com',
    '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'
)
oAuth2Client.setCredentials({
    refresh_token: '1//04ScnPp0IjSAGCgYIARAAGAQSNwF-L9Ir4Y_4m3X7dGXxGDNDgjL5QuS_LAvqk2IFLt7CB0BlfF6WtP0rUkIpYd04SI0q16CTRRg',
})
const calendar = google.calendar({ auth: oAuth2Client })

// Your TIMEOFFSET Offset
const TIMEOFFSET = '+05:30';

// Get date-time string for calender
const dateTimeForCalander = () => {

    let date = new Date();

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`;
    }
    let day = date.getDate();
    if (day < 10) {
        day = `0${day}`;
    }
    let hour = date.getHours();
    if (hour < 10) {
        hour = `0${hour}`;
    }
    let minute = date.getMinutes();
    if (minute < 10) {
        minute = `0${minute}`;
    }

    let newDateTime = `${year}-${month}-${day}T${hour}:${minute}:00.000${TIMEOFFSET}`;

    let event = new Date(Date.parse(newDateTime));

    let startDate = event;
    // Delay in end time is 1
    let endDate = new Date(new Date(startDate).setHours(startDate.getHours() + 1));

    return {
        'start': startDate,
        'end': endDate
    }
};

const insertEvent = async (event) => {

    try {
        let response = await calendar.events.insert({
            auth: oAuth2Client,
            calendarId: calendarId,
            resource: event
        });

        if (response['status'] == 200 && response['statusText'] === 'OK') {
            return 1;
        } else {
            return 0;
        }
    } catch (error) {
        console.log(`Error at insertEvent --> ${error}`);
        return 0;
    }
};

let dateTime = dateTimeForCalander();

// Event for Google Calendar
let event = {
    'summary': `This is the summary.`,
    'description': `This is the description.`,
    'start': {
        'dateTime': dateTime['start'],
        'timeZone': 'Asia/Kolkata'
    },
    'end': {
        'dateTime': dateTime['end'],
        'timeZone': 'Asia/Kolkata'
    }
};

// insertEvent(event)
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

// Get all the events between two dates
const getEvents = async (dateTimeStart, dateTimeEnd) => {

    try {
        let response = await calendar.events.list({
            auth: oAuth2Client,
            calendarId: calendarId,
            timeMin: dateTimeStart,
            timeMax: dateTimeEnd,
            timeZone: 'Asia/Kolkata'
        });

        let items = response['data']['items'];
        return items;
    } catch (error) {
        console.log(`Error at getEvents --> ${error}`);
        return 0;
    }
};

// let start = '2022-10-21T00:00:00.000Z';
// let end = '2022-10-24T00:00:00.000Z';

// getEvents(start, end)
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

// Delete an event from eventID
const deleteEvent = async (eventId) => {

    try {
        let response = await calendar.events.delete({
            auth: oAuth2Client,
            calendarId: calendarId,
            eventId: eventId
        });

        if (response.data === '') {
            return 1;
        } else {
            return 0;
        }
    } catch (error) {
        console.log(`Error at deleteEvent --> ${error}`);
        return 0;
    }
};

let eventId = 'nhaggbns86iep4jlar4073fmp0';

deleteEvent(eventId)
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });