class User {
    constructor(userDetails, UserId, password, createdAt, lastLogin) {
        this.name = userDetails.name;
        this.userId = UserId;
        this.windowsId = userDetails.windowsId;
        this.phoneNumber = userDetails.phoneNumber;
        this.password = password;
        this.email = userDetails.email;
        this.imageUrl = "";
        this.timeZone = userDetails.timeZone;
        this.isAdmin = userDetails.isAdmin;
        this.darkState = false;
        this.sharedElements = {
            domains: [],
            dashboards: [],
            content: [],
        };
        this.createdAt = createdAt;
        this.lastLogin = lastLogin;
    }
}

module.exports = User;
