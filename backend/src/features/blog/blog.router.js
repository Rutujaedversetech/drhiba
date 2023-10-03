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
//const SlotHoliday = require("../slotholiday/slotholiday.model");
const SlotHoliday = require("../slotholiday/slotholiday.model");
const twilio = require('twilio');
const { log } = require("console");
const Family = require("../family/family.model");
const accountSid = 'ACfa920c5e5afd3a6735c5a96b7c049ce4';
   const authToken = 'f672935bdbb3109fe79856216f982718';
//const accountSid = 'YOUR_ACCOUNT_SID';
//const authToken = 'YOUR_AUTH_TOKEN';
const twilioClient = new twilio(accountSid, authToken);

// In-memory storage for OTPs and their validity
const otps = {};

const app=express.Router()




app.post("/appointment",async(req,res)=>{
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
  //  if(decoded.role ==="patient" && decoded.email==oemail){
  //  if(decoded.password==password){


  // async function checkMobileNumber(number) {
  //   const accountSid1 = 'AC306d22d172cc37d63a03a11263d31f86';
  //   const authToken2 = '5376de12b94e1eea62ff7180670a1633';
  //   const twilioPhoneNumber = +13253997702;
  
  //   const url = `https://lookups.twilio.com/v1/PhoneNumbers/${number}?Type=carrier`;
  
  //   try {
  //     const response = await axios.get(url, {
  //       auth: {
  //         username: accountSid1,
  //         password: authToken2,
  //       },
  //     });
  
  //     // Check the status of the mobile number
  //     if (response.data && response.data.carrier && response.data.carrier.type !== 'landline') {
  //       return true; // Mobile number exists
  //     } else {
  //       return false; // Mobile number does not exist or is a landline
  //     }
  //   } catch (error) {
  //     console.error('Error checking mobile number:', error);
  //     return false;
  //   }
  // }
  
  // // Example usage
  // const mobileNumber = `+91${mobileNo}`;
  // checkMobileNumber(mobileNumber)
  //   .then(result => {
  //     console.log(result);
  //     if(result){
  //       const blog = new Blog({...req.body});

  // const data=  blog.save();

        
    
  //   const transporter = nodemailer.createTransport({
  //             service: 'gmail',
  //             auth: {
  //               user: 'rutujalomate@edversetech.com',
  //               pass: 'uxmgjxvczlvdbfep',
  //             },
  //           });
          
  //           // Compose the email content
  //           const mailOptions = {
  //             from: 'rutujalomate@edversetech.com',
  //             to: 'lomaterutuja1206@gmail.com',
  //             subject: 'New Appointment Booking',
  //             text: `Hello Doctor,
          
  //             You have a new appointment booking.
          
  //             Patient Name: ${name}
  //             Patient mobile number: ${mobileNo}
  //             oppointment date:${date}
  
  //             Patient Email: ${oemail}
          
          
  //             Please contact the patient for further details.
          
  //             Regards,
  //             Your Clinic`,
  //           };
          
  //           // Send the email
  //           transporter.sendMail(mailOptions, (error, info) => {
  //             if (error) {
  //               console.log(error);
  //               res.status(500).json({ error: 'An error occurred while sending the email' });
  //             } else {
  //               console.log('Email sent: ' + info.response);
  //               res.status(200).json({ message: 'Appointment booked successfully',pay:"1234" });
  //             }
  //           });


  //     }
  //     else{
  //       res.json({ message: 'please provide valid mobile number',pay:"1234" });
  //     }
  //   })
  //   .catch(error => {
  //     console.error('Error:', error);
  //   });





  //         // else{
  //         //     res.send({message:"please signup"})
  //         // }
  //       }
  //       else{
  //           res.send({message:"please enter correct password"})
  //       }
  //   }

  //         else{
  //  res.send({message:'please create your account'})
  // }

  //const blog = new Blog({...req.body,oemail:decoded.email});
  // const data = await Blog.create({...req.body,oemail:decoded.email});

  //const data=  blog.save();
  //console.log('time',data);
  //const SlotHoliday = new SlotHoliday({...req.body,date:req.body.date,time:req.body.time});
   // const data6=  SlotHoliday.save();
  // if(data){
    //const SlotHoliday = new SlotHoliday({date:req.body.date,time:req.body.time});
    //const data6=  SlotHoliday.save();

    const saveImage = SlotHoliday({
      date: req.body.date,
  
      time: req.body.time,
  
    });
    saveImage
      .save()
      .then((res) => {
        console.log("data is saved",saveImage);
      })
      .catch((err) => {
        console.log(err, "error has occur");
      });

      //let blog=await Famil.findByIdAndDelete({"_id":id});
      console.log("data is saved",saveImage);

      const data = await Blog.create({...req.body,oemail:decoded.email,slotholiday_id:saveImage._id});
      console.log('blogdata',data);

      if(data){
  let user2=await Family.findByIdAndUpdate({"_id":data.family_id},          
  { date: req.body.date,
    blog_id:data._id,
    time: req.body.time, },
{new:true})
console.log('null',user2!==null);
if(user2!==null ||data.is_admin){
  let user3=await User.findByIdAndUpdate({"_id":data.family_id},          
  { is_bookedAppo: true,
     },
     
  {new:true})
  console.log('user3',user2,user3);

}



// const token=jwt.sign({...user3},"Secreate123",
// {expiresIn:'12 day'}
// )
// console.log('====================================');
// console.log(user3);
// console.log('====================================');

      res.status(200).json({ message: 'Appointment booked successfully',pay:"1234" });
}
     

  }
   //}



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






  
  

     app.delete("/:id", async(req,res)=>{
      let id=req.params.id
     console.log("id",id);

      const token=req.headers["token"]

      try{
          
          const decoded=jwt.decode(token)
          console.log(decoded);
  
          if(decoded.role ==="doctor" || decoded.role==="patient" ){
              let blog1=await Blog.findById({"_id":id});
              console.log("blog",blog1)
              // if(decoded.id==blog1.author){
                let blog=await Blog.findByIdAndDelete({"_id":id});
console.log('====================================');
console.log('delete',blog);
console.log('====================================');
                  if(blog){
                    const result = await SlotHoliday.deleteMany({
                      date: blog1.date,
                      time: blog1.time,
                    });
                    const result2 = await Family.findOneAndUpdate(
                      {"blog_id":id},{status:false},{new:true}
                    );
                    let user3=await User.findByIdAndUpdate({"_id":blog.family_id},          
{ is_bookedAppo: false,
   },
{new:true})
                    
                    console.log("result",result,result2,user3)

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





    
    
    
    
      app.post("/usercontact",async(req,res)=>{
        const currentDate = new Date();
    
    
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; 
    const day = currentDate.getDate();
    
    
    // You can format the date as per your requirement
    var formattedDate = `${day}-0${month}-${year}`;
    
    console.log("Current Date:", formattedDate);
        //const {email,name,subject,message,status}=req.body
    
           
           try{
         
            let contactUser=await Contact.create({...req.body,Date:formattedDate})
            res.send(contactUser)
    
    
           }catch(e){
               res.send(e.message)
           }
          })

          
    
          app.get('/csv', async (req, res) => {
            try {
              const dataFromMongoDB = await Blog.find().lean();
          
              const csvStream = csv.format({ headers: true });
              csvStream.pipe(fs.createWriteStream('datablog.csv'));
              //const stream = doc.pipe(fs.createWriteStream('data.pdf')); // Pipe the PDF to a file stream
        
              dataFromMongoDB.forEach(data => {
                csvStream.write(data);
        
              });
          
              csvStream.end();
          
              res.download('datablog.csv', 'MongoDatablog.csv', (err) => {
                if (err) {
                  console.error('Error downloading CSV:', err);
                  res.status(500).send('Internal server error');
                }
        
              });
            } catch (error) {
              console.error('Error generating CSV:', error);
              res.status(500).send('Internal server error');
            }
          });


          app.get('/excel', async(req, res) => {
            // Fetch data from MongoDB and format it as an array of objects.
            const dataFromMongo = [
              { name: 'Alice', age: 25 },
              { name: 'Bob', age: 30 },
              // ... fetch more data from MongoDB
            ];
            const dataFromMongoD = await Blog.find().lean(); // Using .lean() to get plain objects
            const dataFromMongoDB = dataFromMongoD.map(item => {

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

              return { _id: item._id.toString(),Name:item.name,Email:item.oemail,Age:item.age,Mobile_No:item.mobileNo,
                date:item.date,Fees:item.Appofees,status:v };
            });
        
          
            // Create a new workbook and worksheet
            const wb = xlsx.utils.book_new();
            const ws = xlsx.utils.json_to_sheet(dataFromMongoDB);
        
        
            const columnWidths = [];
            dataFromMongoDB.forEach(item => {
              Object.keys(item).forEach((key, columnIndex) => {
                const cellValue = String(item[key]);
                const cellWidth = cellValue.length * 1.5; // Adjust the multiplier as needed
                if (!columnWidths[columnIndex] || cellWidth > columnWidths[columnIndex]) {
                  columnWidths[columnIndex] = cellWidth;
                }
              });
            });
        
            // Apply column widths to the worksheet
            ws['!cols'] = columnWidths.map(width => ({ wch: width }));
          
            // Add the worksheet to the workbook
            xlsx.utils.book_append_sheet(wb, ws, 'MongoData');
          
            // Write the workbook to a buffer
            const buffer = xlsx.write(wb, { bookType: 'xlsx', type: 'buffer' });
          
            // Set the appropriate headers for Excel download
            res.setHeader('Content-Disposition', 'attachment; filename=MongoData.xlsx');
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
            
            // Send the Excel data as the response
            res.send(buffer);
          });



          app.patch("/update/:id", async(req,res)=>{
            let id=req.params.id
           
      
            //const token=req.headers["token"]
      
            try{
                
               // const decoded=jwt.decode(token)
               // console.log(decoded);
        
                
    
        //if(decoded.role ==="doctor"  ){
            //let user=await Contact.findById({"_id":id});
           // console.log("blog",contacteduser)
                let contactreduser=await Blog.findByIdAndUpdate({"_id":id},{...req.body},{new:true})
    console.log('contactreduser',contactreduser);
                if(contactreduser){
                  // const result = await SlotHoliday.deleteMany({
                  //   date: req.body.date,
                  //   time: req.body.time,
                  // });
                  // console.log('====================================');
                  // console.log('result',result);
                  // console.log('====================================');
                  if(contactreduser.visited){
                    const result2 = await Family.findOneAndUpdate(
                      {"blog_id":id},{status:false},{new:true}
                    );
                  }
                  if(!contactreduser.visited){
                    const result2 = await Family.findOneAndUpdate(
                      {"blog_id":id},{status:true},{new:true}
                    );
                  }

                res.send(contactreduser)
            }else{
                res.send("user is not found to update")
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
      

          app.get('/data', async (req, res) => {
           // const startDate = new Date(req.query.startDate);
            //const endDate = new Date(req.query.endDate);


            const startDate = req.query.startDate;
            const endDate = req.query.endDate;
            
          console.log('startDate',startDate,endDate);
            try {
              const paginatedData = await Blog.find({
                date: { $gte: startDate, $lte: endDate },
              });
          
              //res.json(filteredData);
              res.send({paginatedData,totalPages:0,TotalData:0})

            } catch (error) {
              res.status(500).json({ error: 'An error occurred' });
            }
          });









          app.post('/sendotp', (req, res) => {
            const { mobileNo } = req.body;
          
            // Generate a random 6-digit OTP
            const otp = Math.floor(100000 + Math.random() * 900000);
          
            // Store OTP and its validity timestamp
            otps[mobileNo] = { otp, timestamp: Date.now() };
          
            // Send OTP via Twilio
            twilioClient.messages
              .create({
                body: `Your OTP is: ${otp}`,
                from: +16109838997,
                to: `+91${mobileNo}`,
              })
              .then(() => {
                res.send('OTP sent successfully');
              })
              .catch((error) => {
                console.error(error);
                res.status(500).send('Failed to send OTP');
              });
          });
          


          app.post('/validate-otp', (req, res) => {
            const { mobileNo, otp } = req.body;
          
            const storedOtp = otps[mobileNo];
          
            if (!storedOtp || otp !== storedOtp.otp || Date.now() - storedOtp.timestamp > 60000) {
              console.log(!storedOtp || otp !== storedOtp.otp || Date.now() - storedOtp.timestamp > 60000);
              console.log(!storedOtp);
              console.log(otp !== storedOtp.otp);
             /// console.log(Date.now() - storedOtp.timestamp > 60000);
              res.status(401).send('Invalid OTP');
            } else {
              
              // Valid OTP
              res.send('OTP validated successfully');
            }
          });







module.exports=app