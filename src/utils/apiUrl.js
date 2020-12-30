const URL = {
    DEV: 'http://localhost:8002',
    PROD: 'https://api2.webdicebot.xyz'
}

const API_URL = window.location.hostname == 'localhost' ? URL.DEV : URL.PROD

export default API_URL