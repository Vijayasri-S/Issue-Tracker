import mongoose,{Schema} from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const userSchema=new Schema({
        username:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true
        },
        password:{
            type:String,
            required:true
        },
        fullname:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true
        },
        department:{
            type:String,
            required:true
        },
        rollno:{
            type:String,
            required:true
        },
         refreshToken:{
            type:String
                }
    

},
{timestamps:true})
userSchema.pre("save",async function name(next) {
    if(!this.isModified("password")) return next()
    this.password=await bcrypt.hash(this.password,10)
    next()    
})
userSchema.methods.isPasswordCorrect=async function(password) {
    return bcrypt.compare(password,this.password);
}
export const User=mongoose.model("User",userSchema)
userSchema.methods.generateAccessToken=function(){
     return jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username,
        fullname:this.fullname,
        department:this.department,
        rollno:this.rollno

    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:'30m'
    }
);
}
userSchema.methods.generateRefreshToken=function(){
    return jwt.sign({
        _id:this._id,
        email:this.email,
        username:this.username,
        fullname:this.fullname,
        department:this.department,
        rollno:this.rollno

    },
    process.env.ACCESS_REFRESH_TOKEN_SECRET,
    {
        expiresIn:'7d'
    }
);
}
