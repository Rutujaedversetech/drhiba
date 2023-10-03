const mongoose=require("mongoose")

const familySchema=new mongoose.Schema({
    
    
    name:{type:String},
    nickname:{type:String},
    family_email:{type:String},
    oemail:{type:String},
    blog_id:{type:String},
    time:{type:String},
    user_id:{type:String},
    age:{type:Number},
    date:{type:String},
    mobileNo:{type:String},
    Appofees:{type:String,default:'0'},
    AppoDesc:{type:String},
    status:{type:Boolean,required:true,default:false},
    
    visited:{type:Boolean,required:true,default:false},

    is_family:{type:Boolean,required:true,default:true}
     
    },
    {
        versionKey:false,
        timestamps:true
    }
    )

    //blogSchema.index({ name: 1, oemail: 1 ,date:1,mobileNo:1,Appofees:1,});

     const Family=mongoose.model("family",familySchema)
     module.exports=Family