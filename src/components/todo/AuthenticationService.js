class AuthenticationService {
    registerSuccesfulLogin(username,password){
        sessionStorage.setItem('authUser', username);
    }

    logout(){
        sessionStorage.removeItem('authUser');
    }

    isUserLoggedIn(){
        let user = sessionStorage.getItem('authUser');
        if(user == null)return false
        return true
    }
}

export default new AuthenticationService();