const URL = {
    DEV: 'https://shasta.tronscan.org/#/transaction/',
    PROD: 'https://tronscan.org/#/transaction/'
}

const TRON_NODE = window.location.hostname == 'localhost' ? URL.DEV : URL.PROD

export default TRON_NODE