
//require("dotenv").config();
///const PORT=process.env.PORT
//console.log(PORT)
const mongoose=require("mongoose")
const express=require("express")
const cors=require("cors")
const app=express()
const bodyParser = require('body-parser')

const main=require("./config/db")
//console.log(connect)
app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/Slideshowmedia', express.static('Slideshowmedia'))

//console.log(POR)



const userRoute=require("./features/user/user.router")

const contactRoute=require("./features/contact/contact.router")

const cartRoute=require("./features/blog/blog.router")
const jobapplicationRoute=require("./features/userjob/userjob.router")
const slideshowRoute=require("./features/slideshow/slideshow.router")
const serviceRoute=require("./features/service/service.router")
const beforeafterRoute=require("./features/HomeBeforeAfter/beforeafter.router")
const cardRoute=require("./features/cardinfo/card.router")
const detailRoute=require("./features/servicedetails/servicedetails.router")

const promotionRoute=require("./features/promotion/promotion.router")
const videoRoute=require("./features/videoadd/video.router")

const SlotRoute=require("./features/slot/slot.router")
const AboutRoute=require("./features/aboutus/about.router")
const DateholidayRoute=require("./features/dateholiday/dateholiday.router")
const SlotholidayRoute=require("./features/slotholiday/slotholiday.router")
const FamilyRoute=require("./features/family/family.router")


app.use("/users",userRoute)
app.use("/contact",contactRoute)
app.use("/family",FamilyRoute)

app.use("/blogs",cartRoute)
app.use("/application",jobapplicationRoute)
app.use("/slideshow",slideshowRoute)
app.use("/service",serviceRoute)
app.use("/before",beforeafterRoute)
app.use("/card",cardRoute)
app.use("/detail",detailRoute)
app.use("/promotion",promotionRoute)
app.use("/video",videoRoute)
app.use("/slot",SlotRoute)

app.use("/about",AboutRoute)
app.use("/holiday",DateholidayRoute)
app.use("/slotholiday",SlotholidayRoute)









app.listen(8080,async()=>{
    try{
       await main()
   
    }catch(e){
   console.log(e.message)
    }
   
       console.log(`port running on http://localhost:8080`)
   })

   // mongoimport --drop --db masaizon --collection users --file ./users.json --jsonArray
   // {
  
  
  //"name": "naio",
  
  //"email": "sdominique0@usda.gov",
 // "password": "male",

 // "age": 37
//   }{

  //"quantity":5,
  //"user":"634b8b2b0a11c9f0e75d6fba",
  //"product":"634b92bafbebc4dec1d9ef92"
  //}