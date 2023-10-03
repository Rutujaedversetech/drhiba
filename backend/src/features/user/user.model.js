const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    name:{type:String},
    email:{type:String, required:true,unique:true},
    password:{type:String},
    age:{type:Number},
    oppointment_email:{type:String},
    date:{type:String},
    mobileNo:{type:String},
    isLoggedin:{type:Boolean,default:false},
    is_bookedAppo:{type:Boolean,default:false},
    is_admin:{type:Boolean,default:true},

    isLoggedinTime:{type:String},

    is_superAdmin:{
        type:Boolean,
        enum:['true','false'],
        default:"false"
    
    },
    role:{
        type:String,
        enum:["patient","doctor",'staff'],
        default:"patient"
    }
    

},{
        versionKey:false,
        timestamps:true
    }
    )
     const User=mongoose.model("user",userSchema)
     module.exports=User