require('dotenv').config()

export const api_key = () => {
    console.log("API key is: " + process.env.API_KEY)
    return process.env.API_KEY // process.env.REACT_APP_API_KEY -- development
}