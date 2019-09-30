import User from '../model/user';

class UserService {
    generateCommonUser(data) {
        const user = new User();
        user.username= data.givenName,
        user.email= data.email,
        user.fname= data.givenName,
        user.lname= data.familyName,
        user.googleId= data.googleId,
        user.imageUrl= data.imageUrl,
        user.enabled= data.enabled,
        user.loginCount= data.loginCount

        return user;
    }
}