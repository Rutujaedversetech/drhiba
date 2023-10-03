const express=require("express")
//const Blog = require("./family.model")
const User=require("../user/user.model");
const jwt=require("jsonwebtoken")
const nodemailer = require('nodemailer');
//const multer  = require("multer")
const axios=require('axios')
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path=require('path')
const csv = require('fast-csv');
const xlsx = require('xlsx');
const Contact = require("../contact/contact.model");
//const SlotHoliday = require("../slotholiday/slotholiday.model");
const SlotHoliday = require("../slotholiday/slotholiday.model");
const twilio = require('twilio');
const { log } = require("console");
const Family = require("./family.model");
const Blog = require("../blog/blog.model");
const accountSid = 'ACfa920c5e5afd3a6735c5a96b7c049ce4';
   const authToken = '94dbff63063c8010b2b1f6e7ef9f4e1b';
//const accountSid = 'YOUR_ACCOUNT_SID';
//const authToken = 'YOUR_AUTH_TOKEN';
const twilioClient = new twilio(accountSid, authToken);

// In-memory storage for OTPs and their validity
const otps = {};

const app=express.Router()




app.post("/info",async(req,res)=>{
    //const {oemail,password,name,mobileNo,date}=req.body
    ///let blog=await Blog.create({...req.body})
console.log('req',req.body);
      const token=req.headers["token"]
     const decoded=jwt.decode(token)
     const currentDate = new Date();


     const year = currentDate.getFullYear();
     const month = currentDate.getMonth() + 1; 
     const day = currentDate.getDate();
     
     
     // You can format the date as per your requirement
     var formattedDate = `${year}-0${month}-0${day}`;
 // console.log('decoded',decoded,decoded.role ==="patient");
     
      try{
  

  //const blog = new Family({...req.body, user_id:decoded.id,oemail:decoded.email});
  const data = await Family.create({...req.body, user_id:decoded.id,family_email:req.body.family_email});

  //const data=  blog.save();
  console.log('data',data);
 
  if(data){
 //res.status(200).json({ message: 'family member added successfully',pay:"1234" });
res.send(data)
  }
   }



  catch(e){
      res.send(e.message)
  }
      
  })
  



  app.get("/myfamily",async(req,res)=>{
    //res.send('hello')
            //let id=req.params.id
       const token=req.headers["token"]
      // res.send('hello')
       
       try{
         const decoded=jwt.decode(token)
         console.log('decoded',decoded);
         let user=await Family.find({"user_id":decoded.id})
     
           if(user){
               res.send(user)
           }else{
               res.send("user not found")
               
           }
       }catch(e){
           res.send(e.message)
       }
      })
    
 
  
          










app.get("/",async(req,res)=>{
  //console.log("token",token)
//  const id=req.headers.id
 // console.log('userid',id);

 // const {limit=10,page=1}=req.query

    try{
        let user=await Family.find({})
console.log(user);
    res.send(user)    
    
}catch(e){
    res.send(e.message)
}
})


app.get("/getall",async(req,res)=>{

    const {limit,email, query}=req.query
    const searchQuery = req.query;
    const ITEMS_PER_PAGE = limit ;
    const TotalData=await Blog.find({})
console.log('searchQuery',searchQuery.query);

try {
  if(query==''){
    console.log('it is empty');
    const items= await Blog.find();
      //res.send(items)
      const page = parseInt(req.query.page) || 1; // Extract the page number from the query params, default to 1
      console.log('page',page);
            const startIndex = (page - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
            // let data=await Contact.find()
    
             const data1 = await Blog.find()
  const totalItems = data1.length; // Replace with the total number of items from your data source
      const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    
      // const paginatedData = data.slice(startIndex, endIndex);
      const paginatedData = await Blog.find().limit(limit).skip((page-1)*limit)

      res.send({paginatedData,totalPages,TotalData})



  }
  
  if(query){
    console.log('query',query);
    console.log('query',query);
    try {
      console.log('query',query);
      
      const page = parseInt(req.query.page) || 1; // Extract the page number from the query params, default to 1
      console.log('page',page);
            const startIndex = (page - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;





      const data = await Blog.find({$or: [
        { name: { $regex: query, $options: 'i' } },
        { oemail: { $regex: query, $options: 'i' } },
        { date: { $regex: query, $options: 'i' } },
        { mobileNo: { $regex: query, $options: 'i' } },
       //{ age: parseInt(query) },
       { age: !isNaN(query) ? parseInt(query) : null }, // Convert query to an integer if valid, otherwise null

         { Appofees: { $regex: query, $options: 'i' }},

      ]});
      const totalItems = data.length; // Replace with the total number of items from your data source
      const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    
      const paginatedData = data.slice(startIndex, endIndex);
      res.send({paginatedData,totalPages,TotalData})

          } catch (error) {
      console.error('Error fetching search results:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
  
         else if(searchQuery.query!=='') {
          //console.log('searchQuery',searchQuery);
          console.log('searchQuery123',searchQuery.startDate,searchQuery.query);

          try{
            const query1 = {};
    
            // Loop through the searchQuery object and construct the MongoDB query
            Object.keys(searchQuery).forEach((field) => {
              if (field !== 'page' && field !== 'limit') {
                if (field === 'visited') {
                  if (searchQuery[field] !== '') {
                    query1[field] = searchQuery[field] === 'true'; // Convert string to boolean
                  }
        
                } 
                else if (field === 'status') {
                  if (searchQuery[field] !== '') {
                    query1[field] = searchQuery[field] === 'true'; // Convert string to boolean
                  }
        
                } 
                else if (field === 'startDatek'||field === 'endDatel'){
              //    console.log('jkhelooooooooo');
              //    try {
              //     const paginatedData =  Blog.find({
              //       date: { $gte: searchQuery.startDate, $lte: searchQuery.endDate },
              //     });
              // console.log(paginatedData);
              //     //res.json(filteredData);
              //    // res.send({paginatedData})
    
              //   } catch (error) {
              //     res.status(500).json({ error: 'An error occurred' });
              //   }
        
                } 
                else {
                  query1[field] = { $regex: searchQuery[field], $options: 'i' };
                }
              }
            });
        
        console.log('wed',query1);
            const items = await Blog.find(query1);
           // res.send(items);
    
            console.log('wed',query1);

            const page = parseInt(req.query.page) || 1; // Extract the page number from the query params, default to 1
    console.log('page',page);
          const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
          // let data=await Contact.find()
  
           const data = await Blog.find(query1);
           const totalItems = data.length; // Replace with the total number of items from your data source
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  
    const paginatedData = data.slice(startIndex, endIndex);
// const items = await Contact.find(query1);
        //res.send(items);
        res.send({paginatedData,totalPages,TotalData})
            }
    
          
      catch(e){
          res.send(e.message)
      }
         }
} catch (error) {
  
}



  })



///used
app.get("/speblogs/:id", async(req,res)=>{
  let id=req.params.id
 // let num=Number(id)
  console.log(id)
  //let product=db.products.find((products)=> products.id===num)
  let user=await Blog.findById({"_id":id})
  console.log(user);

  try{
      if(user){
          res.send(user)
      }else{
          res.send("user not found")
      }
  }catch(e){
      res.send(e.message)
  }

  })






  
  

     app.delete("/memeber/:id", async(req,res)=>{
      let id=req.params.id
     console.log("id",id);

      const token=req.headers["token"]


      try{
          
          const decoded=jwt.decode(token)
          console.log(decoded);
  
          if(decoded.role ==="patient" || decoded.role==="doctor" ){
              let blog1=await Family.findById({"_id":id});
              console.log("blog",blog1.blog_id)
              // if(decoded.id==blog1.author){
                let data=await Family.findByIdAndDelete({"_id":id});
console.log('datadelete',data);
let data2=await Blog.findById({"_id":blog1.blog_id});
console.log('data2',data2);

                  if(data){
                    let data2=await Blog.findByIdAndDelete({"_id":blog1.blog_id});
//console.log('data2',data2);
                  res.send('oppointment deleted')

                  







              }else{
                  res.send("oppointment is not found to delete")
              }  
            // }else{
            //     res.send(' cant delete other writers blog')
            // }
  
          }
  else{
    return  res.status(403).send('not allowed to delete oppointment')
         
    //res.send(blog)
  
  }        
  
      }catch(e){
          res.send(e.message)
      }

    })





    
    
    
    

    
         




          app.patch("/update/:id", async(req,res)=>{
            let id=req.params.id
           
      
            //const token=req.headers["token"]
      
            try{
                
               // const decoded=jwt.decode(token)
               // console.log(decoded);
        
                
    
        //if(decoded.role ==="doctor"  ){
            //let user=await Contact.findById({"_id":id});
           // console.log("blog",contacteduser)
                let contactreduser=await Family.findByIdAndUpdate({"_id":id},{...req.body},{new:true})
                console.log('edited',contactreduser);

                if(contactreduser){
                  console.log('edited');

       let contactreduser2=await Blog.findByIdAndUpdate({"_id":contactreduser.blog_id},
      {name:contactreduser.name,age:contactreduser.age,mobileNo:contactreduser.mobileNo},{new:true})
      //let contactreduser2k=await Blog.findById({"_id":contactreduser.blog_id})

      console.log('====================================');
console.log('edited123',contactreduser2);
console.log('====================================');
                res.send(contactreduser)
            }else{
                res.send("member is not found to update")
            }  
    
    
        // }
    // else{
    // return  res.status(403).send('not allowed to update blog')
       
    // //res.send(blog)
    
    // }        
     }catch(e){
                res.send(e.message)
            }
      
          })
      




          app.patch("/status/update/:id", async(req,res)=>{
            let id=req.params.id
           
      
            //const token=req.headers["token"]
      
            try{
                
               // const decoded=jwt.decode(token)
               console.log('id',id,req.body);
        
                
    
        //if(decoded.role ==="doctor"  ){
            //let user=await Contact.findById({"_id":id});
           // console.log("blog",contacteduser)
                let contactreduser=await Family.findOneAndUpdate({"blog_id":id},{...req.body},{new:true})
               // let contactreduser=await Family.find({"blog_id":id})
               console.log('contactreduser34',contactreduser);

                if(contactreduser){
                res.send(contactreduser)
               console.log('contactreduser34',contactreduser);
            }else{
                res.send("member is not found to update")
                console.log('contactreduser34','member is not found to update');

            }  
    
    
        // }
    // else{
    // return  res.status(403).send('not allowed to update blog')
       
    // //res.send(blog)
    
    // }        
     }catch(e){
                res.send(e.message)
            }
      
          })






module.exports=app