import { ConflictError } from "../errors/conflictError"
import User from "../models/user.model.js"

export class UserRepository {

    async register(userData){
        try {
            const user = await User.create({
                username : userData.username,
                email : userData.eamil,
                fullName : userData.fullName,
                password : userData.password
            })

            return user
        } catch (error) {
            console.log(error)
            throw error
        }
    }


    async getUserWithId(userId){
        try {
            const fetchedUser = await User.findById(userId)

            return fetchedUser
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async updateUser(userId,userData){
        try {
            const updatedUser = await User.findByIdAndUpdate(userId,{
                username : userData.username,
                fullName : userData.fullName,
                email : userData.email,
                password : userData.password
            }, {
                new : true
            }).select("-password -refreshToken")

            return updatedUser
        } catch (error) {
            console.log(error);
            throw error
        }
    }

    async updateRefreshToken(userId,refreshToken){
        try {
           const updatedRefreshToken = await User.findByIdAndUpdate(userId,{
            refreshToken : refreshToken
           },{
            new : true
           }) 

           return updatedRefreshToken
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async getUserWithEmail(userEmail){
        try {
            const fetechedUser = await User.findOne({email : userEmail})

            return fetechedUser
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}