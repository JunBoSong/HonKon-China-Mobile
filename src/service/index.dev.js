import * as mock from './mock/index'


export const httpGet = (urlKey, params) => {
   return new Promise((resolve) => {
        resolve(mock[urlKey])
    }) 
};;
export const httpPost = (urlKey, params) => {
   return new Promise((resolve) => {
        resolve(mock[urlKey])
    }) 
};