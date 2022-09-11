import axios from 'axios';
import { API_NOTIFICATION_MESSAGES, SERVICE_URLS } from '../constants/config';
import { getAccessToken,getType } from '../utils/common-utils';

const API_URL= 'http://localhost:8000';

const axiosInstance= axios.create({
   baseURL: API_URL,
   timeout:10000,
   headers:{
    "content-type": "application/json"
   }
})

axiosInstance.interceptors.request.use(
    function(config){
        if(config.TYPE.params){
             config.params = config.TYPE.params;
        }else if(config.TYPE.query){
             config.url= config.url + '/' + config.TYPE.query;
        }
        return config
    },
    function(error){
        return Promise.reject(error)
    }
)

axiosInstance.interceptors.response.use(
    function(response){
        //stop loder here
        return processResponse(response)
    },
    function(error){
        //stop loder here
        return Promise.reject(processError(error))
    }
)


/////////////////
//If success -> return {isSuccess:true, data:object}
//If fail -> return {isFailure:true, status:string, msg:string, code:int}
/////////////////

const processResponse= (response) => {
    if(response?.status===200){
        return {isSuccess:true, data:response.data}
    }else{
        return {isFailure:true, status:String, msg:response?.msg, code:response?.code}
    }
}

/////////////////
//If success -> return {isSuccess:true, data:object}
//If fail -> return {isFailure:true, status:string, msg:string, code:int}
/////////////////

const processError= (error) => {
    if(error.response){
        //Request maked and server responded with other status code
        // other which falls out of range 2.x.x
        console.log('Error in response: ',error.toJSON())
        return  {
            isError:true,
            msg:API_NOTIFICATION_MESSAGES.responseFailure,
            code: error.response.status
        }
    }else if(error.request){
          //Request maked but no reponse recieved
          console.log('Error in request: ',error.toJSON()) 
          return  {
            isError:true,
            msg:API_NOTIFICATION_MESSAGES.requestFailure,
            code:''
        }
    }
    else{
         //something happened in setting up request that triggers an error
         console.log('Error in network: ', error.toJSON())
         return  {
            isError:true,
            msg:API_NOTIFICATION_MESSAGES.networkError,
            code:''
        } 
    }
}

const API = {};

for (const [key,value] of Object.entries(SERVICE_URLS)) {
    API[key] = (body, showUploadProgress,showDownloadProgress)=>
          axiosInstance({
            method:value.method,
            url:value.url,
            data:value.method=== 'DELETE'? {}:body,
            responseType:value.responseType,
            headers:{
               authorization: getAccessToken()
            },
            TYPE:getType(value,body),
            onUploadProgress:function (progressEvent) {
                if (showUploadProgress) {
                    let precentageCompleted= Math.round((progressEvent.loaded*100)/progressEvent.total)
                    showUploadProgress(precentageCompleted)
                }
            },
            onDownloadProgress:function (progressEvent) {
                if (showDownloadProgress) {
                    let precentageCompleted= Math.round((progressEvent.loaded*100)/progressEvent.total)
                    showDownloadProgress(precentageCompleted)
                }
            },
          })
}

export {API} ;