import mongoose,{Schema} from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const departmentSchema=new Schema({
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
        designation:{
            type:String,
            required:true
        },
         refreshToken:{
            type:String
                }
    

},
{timestamps:true})
departmentSchema.pre("save",async function(next) {
    if(!this.isModified("password")) return next()
    this.password=await bcrypt.hash(this.password,10)
    next()
    
})

departmentSchema.methods.isPasswordCorrect=async function(password) {
    return bcrypt.compare(password,this.password);
}

departmentSchema.methods.generateAccessToken=function(){
     return jwt.sign({
      _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname,
      department: this.department,
      designation: this.designation,

    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:'30m'
    }
);
}

departmentSchema.methods.generateRefreshToken=function(){
    return jwt.sign({
         _id: this._id,
      email: this.email,
      username: this.username,
      fullname: this.fullname,
      department: this.department,
      designation:this.designation,

    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:'7d'
    }
);
}

export const Department = mongoose.models.Department || mongoose.model("Department", departmentSchema)