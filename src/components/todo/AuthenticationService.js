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

    getUserLoggedIn(){
        let user = sessionStorage.getItem('authUser');
        if(user == null) console.log("There's no user logged in");
        return sessionStorage.getItem('authUser');
    }
}

export default new AuthenticationService();