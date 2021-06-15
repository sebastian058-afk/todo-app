import axios from "axios";
import {API_URL} from '../../Constants';

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authUser';

class AuthenticationService {

    executeBasicAuthenticationService(username, password){        
        return axios.get(`${API_URL}/basicauth`, 
        {headers:{authorization: this.createBasicAuthToken(username, password)}});
    }

    executeJwtAuthenticationService(username, password){        
        return axios.post( `${API_URL}/authenticate`, {username,password} );
    }

    createBasicAuthToken(username, password){
        return 'Basic ' + window.btoa(username + ":" + password);
    }

    createJwtToken(token){
        return 'Bearer ' + token;
    }

    registerSuccesfulLogin(username,password){        
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        this.setUpAxiosInterceptors(this.createBasicAuthToken(username,password));
    }
    
    registerSuccesfulLoginJwt(username, token){
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username);
        sessionStorage.getItem('authToken', token);
        this.setUpAxiosInterceptors(this.createJwtToken(token));
    }

    logout(){
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    }

    isUserLoggedIn(){
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        if(user == null)return false
        return true
    }

    getUserLoggedIn(){
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        if(user == null) console.log("There's no user logged in");
        return sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
    }

    setUpAxiosInterceptors(jwtAuthHeader){
        axios.interceptors.request.use(
            (config) => {
                if(this.isUserLoggedIn){
                    config.headers.authorization = jwtAuthHeader;
                }
                return config
            }
        );
    }
}

export default new AuthenticationService();