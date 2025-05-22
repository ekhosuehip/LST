import { config } from 'dotenv';

config()



const configData = {
    mongo: {
        url: process.env.DB_URL
    },
    server: {
        port: process.env.PORT || 3000
    },
    appKey: {
        key: process.env.appKey,
        cardKey: process.env.CARD,
        cvvKey: process.env.CVV
    }
}

export default configData