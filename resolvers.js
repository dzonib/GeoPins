const dummyUser = {
    _id: "123",
    name: "test",
    email: "test@test.com",
    picture: "https://pictures.com/2133/yo"
    
}


module.exports = {
    Query: {
        me: () => dummyUser
    }
}