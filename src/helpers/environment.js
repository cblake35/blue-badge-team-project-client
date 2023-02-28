let APIURL = '';

switch (window.location.hostname) {

    case 'localhost' || '127.0.0.1':
        APIURL = 'http://localhost:8000/';
        break;

    default :
        APIURL = 'https://flixdb-server.herokuapp.com/'
}

export default APIURL;