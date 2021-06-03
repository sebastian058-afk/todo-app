import axios from "axios";

class AuthenticationService {

    executeBasicAuthenticationService(username, password){        
        return axios.get('http://localhost:8080/basicauth', 
        {headers:{authorization: this.createBasicAuthToken(username, password)}});
    }

    createBasicAuthToken(username, password){
        return 'Basic ' + window.btoa(username + ":" + password);
    }

    registerSuccesfulLogin(username,password){        
        sessionStorage.setItem('authUser', username);
        this.setUpAxiosInterceptors(this.createBasicAuthToken(username,password));
    }

    logout(){
        sessionStorage.removeItem('authUser');
    }

    isUserLoggedIn(){
        let user = sessionStorage.getItem('authUser');
        if(user == null)return false
        return true
    }

    getUserLoggedIn(){
        let user = sessionStorage.getItem('authUser');
        if(user == null) console.log("There's no user logged in");
        return sessionStorage.getItem('authUser');
    }

    setUpAxiosInterceptors(basicAuthHeader){        
        axios.interceptors.request.use(
            (config) => {
                if(this.isUserLoggedIn){
                    config.headers.authorization = basicAuthHeader;
                }
                return config
            }
        );
    }
}

export default new AuthenticationService();