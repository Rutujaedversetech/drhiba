const mongoose=require("mongoose")

const blogSchema=new mongoose.Schema({
    
    
    name:{type:String},
    oemail:{type:String},
    family_id:{type:String},
    slotholiday_id:{type:String},
    password:{type:String},
    time:{type:String},
    is_admin:{type:Boolean,default:false},

    age:{type:Number},
    date:{type:String},
    mobileNo:{type:String},
    Appofees:{type:String,default:'0'},
    AppoDesc:{type:String},
    status:{type:Boolean,required:true,default:false},
    is_cancelled:{type:Boolean,required:true,default:false},

    visited:{type:Boolean,required:true,default:false},

     
    },
    {
        versionKey:false,
        timestamps:true
    }
    )

    //blogSchema.index({ name: 1, oemail: 1 ,date:1,mobileNo:1,Appofees:1,});

     const Blog=mongoose.model("blog",blogSchema)
     module.exports=Blog