const express=require("express")
const Blog = require("./blog.model")
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


const app=express.Router()



app.post("/appointment",async(req,res)=>{
  const {oemail,password,name,mobileNo,date}=req.body
  ///let blog=await Blog.create({...req.body})
console.log('req',req.body);
    const token=req.headers["token"]
    const decoded=jwt.decode(token)

console.log('decoded',decoded,decoded.role ==="patient");
   
    try{
 if(decoded.role ==="patient" && decoded.email==oemail){
 if(decoded.password==password){
    // let user=await User.findOne({email})
    // console.log(user);
        // if(user){
    //let blogs=await Blog.find(query).limit(limit).skip((page-1)*limit).populate("author")

//res.send(user)

async function checkMobileNumber(number) {
  const accountSid1 = 'AC306d22d172cc37d63a03a11263d31f86';
  const authToken2 = '5376de12b94e1eea62ff7180670a1633';
  const twilioPhoneNumber = +13253997702;

  const url = `https://lookups.twilio.com/v1/PhoneNumbers/${number}?Type=carrier`;

  try {
    const response = await axios.get(url, {
      auth: {
        username: accountSid1,
        password: authToken2,
      },
    });

    // Check the status of the mobile number
    if (response.data && response.data.carrier && response.data.carrier.type !== 'landline') {
      return true; // Mobile number exists
    } else {
      return false; // Mobile number does not exist or is a landline
    }
  } catch (error) {
    console.error('Error checking mobile number:', error);
    return false;
  }
}

// Example usage
const mobileNumber = `+91${mobileNo}`;
checkMobileNumber(mobileNumber)
  .then(result => {
    console.log(result);
    if(result){
      const blog = new Blog({...req.body});

const data=  blog.save();

      
  
  const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'rutujalomate@edversetech.com',
              pass: 'uxmgjxvczlvdbfep',
            },
          });
        
          // Compose the email content
          const mailOptions = {
            from: 'rutujalomate@edversetech.com',
            to: 'lomaterutuja1206@gmail.com',
            subject: 'New Appointment Booking',
            text: `Hello Doctor,
        
            You have a new appointment booking.
        
            Patient Name: ${name}
            Patient mobile number: ${mobileNo}
            oppointment date:${date}

            Patient Email: ${oemail}
        
        
            Please contact the patient for further details.
        
            Regards,
            Your Clinic`,
          };
        
          // Send the email
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log(error);
              res.status(500).json({ error: 'An error occurred while sending the email' });
            } else {
              console.log('Email sent: ' + info.response);
              res.status(200).json({ message: 'Appointment booked successfully',pay:"1234" });
            }
          });


    }
    else{
      res.json({ message: 'please provide valid mobile number',pay:"1234" });
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });





        // else{
        //     res.send({message:"please signup"})
        // }
      }
      else{
          res.send({message:"please enter correct password"})
      }
  }

        else{
 res.send({message:'please create your account'})
}
 }



catch(e){
    res.send(e.message)
}
    
})


app.get("/asd",async(req,res)=>{
  //res.send('hello')
          //let id=req.params.id
     const token=req.headers["token"]
    // res.send('hello')
     
     try{
       const decoded=jwt.decode(token)
       console.log('decoded',decoded.email);
       let user=await Blog.find({"oemail":decoded.email})
   
         if(user){
             res.send(user)
         }else{
             res.send("user not found")
             
         }
     }catch(e){
         res.send(e.message)
     }
    })
  










app.get("/getall",async(req,res)=>{

 
  try{

  //let data=await About.find()
res.send('data')

  
}catch(e){
  res.send(e.message)
}
})

app.get("/pdf",async(req,res)=>{

  const doc = new PDFDocument();
const stream = doc.pipe(fs.createWriteStream('data2.pdf')); // Pipe the PDF to a file stream

try {
// Connect to MongoDB and fetch data
const data = await Blog.find({});


let y = 30;
const margin = 10;
const columnWidths = [80, 90, 50, 80, 80,80,80]; // Adjust column widths as needed

// Draw table header
drawRow(['Name', 'Email', 'Age', 'Mobile', 'Appointment date','Fees','status'], doc, y, columnWidths);
y += 40;

// Draw table rows
for (const item of data) {
let v;

// {
//   !item.visited ? item.status ?(v='Appointment isn't Visited'):
//    (<Text backgroundColor={''}>pending</Text>)          :(<Link to={`/patient/${item._id}`}>
//      <Button bg={'gray'}>Documents</Button></Link>
//    )

//  }
 if(!item.visited){
  if(item.status){
    v='confirmed'

  }
  else{
    v='pending'

   }
 }else{
  v='visited'

 }

drawRow([item.name, item.oemail, item.age, item.mobileNo, item.date,item.Appofees,v], doc, y, columnWidths);
y += 40;
}


function drawRow(rowData, doc, y, columnWidths) {
  let x = 10; // Starting x-coordinate
  for (let i = 0; i < rowData.length; i++) {
    doc.text(rowData[i], x, y, { width: columnWidths[i] });
    x += columnWidths[i]+10;
  }
}



// Finalize and close PDF
doc.end();

// Wait for the PDF stream to finish writing
stream.on('finish', () => {
// Send the generated PDF as a response
res.setHeader('Content-Type', 'application/pdf');
res.setHeader('Content-Disposition', 'attachment; filename="data2.pdf"');
fs.createReadStream('data2.pdf').pipe(res);
});
} catch (error) {
console.error('Error generating PDF:', error);
res.status(500).send('Internal Server Error');
}

      })


      app.get("/",async(req,res)=>{
        //console.log("token",token)
        const id=req.headers.id
        console.log('userid',id);
      
        const {limit=10,page=1}=req.query
      
          try{
              let user=await User.findById({"_id":id})
      console.log(user);
              if(user){
          let blogs=await Blog.find({"author":id}).limit(limit).skip((page-1)*limit)
      res.send(blogs)
              }
              else{
                  res.send("please signup")
              }
          
      }catch(e){
          res.send(e.message)
      }
      })
// app.delete("/:id", async(req,res)=>{
// let id=req.params.id
// console.log("id",id);

// // const token=req.headers["token"]

// try{
    
//     // const decoded=jwt.decode(token)
//     // console.log(decoded);

//     // if(decoded.role ==="doctor" || decoded.role==="admin" ){
//         let blog1=await About.findById({"_id":id});
//         console.log("blog",blog1)
//         // if(decoded.id==blog1.author){
//           let blog=await About.findByIdAndDelete({"_id":id});

//             if(blog){
//             res.send('data deleted')

//         }else{
//             res.send("data is not found to delete")
//         }  
//       // }else{
//       //     res.send(' cant delete other writers blog')
//       // }

// //       }
// // else{
// // return  res.status(403).send('not allowed to delete oppointment')
   
// // //res.send(blog)

// // }        

// }catch(e){
//     res.send('can not find blog by this id ')
// }

// })

app.get("/getall",async(req,res)=>{

  const {limit,email, query}=req.query
  const searchQuery = req.query;
  const ITEMS_PER_PAGE = limit ;

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

    res.send({paginatedData,totalPages})



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
    res.send({paginatedData,totalPages})

        } catch (error) {
    console.error('Error fetching search results:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

       else if(searchQuery.query!=='') {
        console.log('searchQuery',searchQuery);
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
      res.send({paginatedData,totalPages})
          }
  
        
    catch(e){
        res.send(e.message)
    }
       }
} catch (error) {

}



})

app.post("/blogpost",async(req,res)=>{
  const token=req.headers["token"]

   try{
       
       const decoded=jwt.decode(token)
       console.log('decoded',decoded.id);
       //console.log('req.body',req.body.author);

       if(decoded.role =="user" && req.body.author==decoded.id){
           let blog=await Blog.create({...req.body,name:decoded.name,create:decoded.iat})
   
 res.send({blog,decoded})
}
   else{
       return  res.status(403).send('You are not allowed to create blog')
   
}        

   }catch(e){
       res.send(e.message)
   }
})

app.get("/:id", async(req,res)=>{
  let id=req.params.id
 // let num=Number(id)
  //console.log(req.method,req.url)
  //let product=db.products.find((products)=> products.id===num)
  let user=await Blog.findById({"_id":id})
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

module.exports=app
