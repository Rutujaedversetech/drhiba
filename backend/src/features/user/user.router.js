const express=require("express");
const { db } = require("./user.model");
const User=require("./user.model");
const axios = require('axios');

const app=express.Router()
const nodemailer = require('nodemailer');
const EmailVerifier = require('email-verifier');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const xlsx = require('xlsx');
const csv = require('fast-csv');


app.use(express.urlencoded({extended:true}))


const jwt=require("jsonwebtoken");
const Blog = require("../blog/blog.model");
const blacklist=[]


app.post("/signup",async(req,res)=>{
    const {name,email,password,age,role,is_superAdmin}=req.body
const token=req.headers["token"]
    try{
    //     if(token){
    //     const decoded=jwt.decode(token)
    //     if(decoded){
    //         if(decoded.role=="doctor"){
    //             let user=new User({name,email,password,age,role:"patient"})
    //             console.log('user1',user)
    //            // await user.save()
    //           //return  res.send('patient created sucessfully')

    //         }else{
    //             res.status(403).send("you are not allowed to create patient")
    //         }
    //     }
    

    // }

    }catch(e){
        res.send("Non doctor side is try to create writer")
    }
    
   // let user=new User({name,email,password,age})
   // console.log('user2',user)
   // await user.save()
   try {
    // let user=await User.create({name,email,password,age})
    // console.log("user",user)
//const date=new Date

    // const transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //       user: 'rutujalomate@edversetech.com',
    //       pass: 'uxmgjxvczlvdbfep',
    //     },
    //   });
    
    //   // Compose the email content
    //   const mailOptions = {
    //     from: 'rutujalomate@edversetech.com',
    //     to: 'lomaterutuja1206@gmail.com',
    //     subject: 'New Appointment Booking',
    //     text: `Hello Doctor,
    
    //     You have a new appointment booking.
    
    //     Patient Name: ${name}
    //     Patient Email: ${email}
    //     Appointment Date: ${date}
    
    
    //     Please contact the patient for further details.
    
    //     Regards,
    //     Your Clinic`,
    //   };
    
    //   // Send the email
    //   transporter.sendMail(mailOptions, (error, info) => {
    //     if (error) {
    //       console.log(error);
    //       res.status(500).json({ error: 'An error occurred while sending the email' });
    //     } else {
    //       console.log('Email sent: ' + info.response);
    //       res.status(200).json({ message: 'Appointment booked successfully' });
    //     }
    //   });

    



//const email = 'example@example.com'; // Replace with the email address you want to verify

// const verifier = new EmailVerifier({
//   apiKey: 'live_4f2c5730d559437eff68c29bbfadbc740c4e5d964920dd912af87057945167c5' 
// });

// verifier.verify(email, (err, data) => {
//   if (err) {
//     console.error('Error verifying email:', err);
//   } else {
//     console.log('Email verification result:', data);
//     // Handle the verification result here
//   }
// });
// const apiKey = 'live_3fadc373c7b232a03eb27fd4a642dc30bc9d1dbd0633b5fb65e77b38e3b0609b'
// async function verifyEmail(email) {
//     try {
//       const response = await axios.get(`https://api.kickbox.com/v2/verify?email=${email}`, {
//         headers: {
//           Authorization: `Bearer ${apiKey}`
//         }
//       });
//       console.log('Verification result:', response.data);
//       // Handle the verification result here
//       // if(response.data.result=='deliverable'){





    try {
      const {name,email,password,age,role,is_superAdmin,mobileNo,is_admin}=req.body
      const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1; // Note: Months are zero-based, so add 1
const day = currentDate.getDate();
const date= `${year}-0${month}-${day}`
console.log(`Current date: ${year}-${month}-${day}`);
      if(role=="doctor"){
       // is_superAdmin=true
             let user=await User.create({name,email,mobileNo,password,age,
              role,is_superAdmin:true,date:date,is_admin})
             console.log("user",user)

             return  res.status(201).send({message:"signup sucessfully"})

      }
      //console.log(is_superAdmin);
    let user=await User.create({name,email,mobileNo,password,age,role,is_superAdmin,is_admin,date:date})
     console.log("user",user)
      return  res.status(201).send({message:"signup sucessfully"})
     } catch (error) {
      //return res.send(error)
      console.log(error.name,error.code);
      if (error.name === 'MongoServerError' && error.code === 11000) {
        // Duplicate username
        return res.status(422).send('User already signedup!');
      }
      // return res.status(422).send(error.message)
  
     }
  

//         // }
//         // else{
//             res.send('please enter valid email')
//         // }

//     } catch (error) {
//       console.error('Error verifying email:', error);
//     }
//   }
  
  //verifyEmail(email);

      //return  res.status(201).send(user)
   } catch (error) {
    return res.send(error.message)
   }
   

})










// app.post("/appointment",async(req,res)=>{
//   const token=req.headers["token"]

//   var decoded=jwt.decode(token)
// const email=decoded.email
//   const {oppointment_email,password,name,mobileNo,date}=req.body


// console.log('oppointment_email',oppointment_email);
   
//     try{
//   if(decoded.role ==="patient" && decoded.email==oppointment_email){

//     let user=await User.findOne({email:oppointment_email})
//     console.log(user);
//         if(user){
//     //let blogs=await Blog.find(query).limit(limit).skip((page-1)*limit).populate("author")
//     let pate =await Blog.create({oppointment_email,password,name,mobileNo,date})

// //res.send(user)
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

//             Patient Email: ${email}
        
        
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
    
//         }
//         else{
//             res.send({message:"please signup"})
//         }
//       }
//         else{
//  res.send({message:'please create your account'})
// }
// }catch(e){
//     res.send(e.message)
// }
    
// })







app.post("/login",async(req,res)=>{
    const {email,password}=req.body
    console.log(email,password)
    const currentDate = new Date();


    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; 
    const day = currentDate.getDate();
    const hours = currentDate.getHours();
const minutes = currentDate.getMinutes();
const seconds = currentDate.getSeconds();
    
    // You can format the date as per your requirement
    var formattedDate = `${day}-0${month}-${year}  ${hours}:${minutes}:${seconds}`;
    
    //console.log("Current Date:", formattedDate);

    try{
       let user=await User.findOne({email})
      console.log('login',user)
       if(user){
        if(user.password===password){
            const token=jwt.sign({id:user._id,isLoggedin: true,
              is_bookedAppo:user.is_bookedAppo,
              isLoggedinTime:formattedDate,is_admin:true,
              name:user.name,age:user.age,
              role:user.role,email:user.email,mobileNo:user.mobileNo,password:user.password},"Secreate123",
            {expiresIn:'12 day'}
            )
                   let user2=await User.findByIdAndUpdate({"_id":user.id},          
                     { isLoggedin: true,isLoggedinTime:formattedDate,is_admin:true, },
                   {new:true})


            const refreshtoken=jwt.sign({},"Secreaterefresh123",
            {expiresIn:'13 days'})
            res.send({message:'Login Successfull',token,refreshtoken,user})

        }
        else{
            res.status(404).send({message:` Athentication failed incorrect password`})
        }
       }else{
        res.status(404).send({message:`user with email ${email} not found`})

       }

    }catch(e){
        res.send(e.message)
    }
    
})




app.get("/getall",async(req,res)=>{
    const {limit, query}=req.query
    const searchQuery = req.query;
    const ITEMS_PER_PAGE = limit ;
    const { role,name,email } = searchQuery;
    const { is_superAdmin } = searchQuery;
    const TotalData=await User.find({})


try {
  if(query==''){
    console.log('it is empty');
    const items= await User.find();
      //res.send(items)
      const page = parseInt(req.query.page) || 1; // Extract the page number from the query params, default to 1
      console.log('page',page);
            const startIndex = (page - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
            // let data=await Contact.find()
    
             const data1 = await User.find()
  const totalItems = data1.length; // Replace with the total number of items from your data source
      const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    
      // const paginatedData = data.slice(startIndex, endIndex);
      const paginatedData = await User.find().limit(limit).skip((page-1)*limit)

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





      const data = await User.find({$or: [
        { name: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
        { role: { $regex: query, $options: 'i' } },
         { date: { $regex: query, $options: 'i' } },
        // { status: { $regex: query, $options: 'i' }},

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
                else if (field === 'is_superAdmin' ) {
                  if (searchQuery[field] !== '') {
                    console.log('is_superAdmin',searchQuery[field]=='true');
                    query1[field] = searchQuery[field] === 'true'; // Convert string to boolean
                  }
        
                } 

                            else {
                              console.log('here');
                  query1[field] = { $regex: searchQuery[field], $options: 'i' };
               //   query1[field] = { $regex: searchQuery[field], $options: 'i' };

                }
              }
            });
        


      


console.log('query1',query1);

            const page = parseInt(req.query.page) || 1; // Extract the page number from the query params, default to 1
    console.log('page',page);
          const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
          // let data=await Contact.find()
  
           const data = await User.find(query1);
           const totalItems = data.length; // Replace with the total number of items from your data source
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  
    const paginatedData = data.slice(startIndex, endIndex);
// const items = await Contact.find(query1);
        //res.send(items);



//         if (role !== 'doctor' && role !== 'patient'&& role !== 'staff' ) {
//             const additionalRolesQuery = {
//               $or: [{ role: 'patient' }, { role: 'staff' }],
//             };
//             const paginatedData = await User.find(additionalRolesQuery);
//             res.send({paginatedData,totalPages})
//             return;
//           }
    //       if (role === 'staff' && is_superAdmin=='true') {
    //         console.log('hello123');
    //         const additionalRolesQuery = {
    //                        $or: [{ role: 'doctor' }],
    //                       };
    //                       console.log('additionalRolesQuery',additionalRolesQuery);
    //                       const paginatedData = await User.find(additionalRolesQuery);
    //                       res.send({paginatedData,totalPages})
    //                       return;
    // } 
//   else  if (role === 'staff' && is_superAdmin=='false') {
//       const additionalRolesQuery = {
//                      $or: [{ role: 'staff' },{role:"doctor"}
//                     
                    
//                     ],
//                     };
//                     const paginatedData = await User.find(additionalRolesQuery);
//                     res.send({paginatedData,totalPages})
//                     return;
// } 
//    else if (role === 'staff') {
//       const additionalRolesQuery = {
//                      $or: [{ role: 'doctor' },{ role: 'staff' }],
//                     };
//                     const paginatedData = await User.find(additionalRolesQuery);
//                     res.send({paginatedData,totalPages})
//                     return;
// } 

//else {
//             query1.role = 'patient';
//           }
      //let data;
// if (role !== 'staff') {
// if(role=='patient'){
//   const additionalRolesQuery = {
//     $or: [{ role: 'patient' }],
//   };
//  const data = await User.find({ $and: [query1, additionalRolesQuery] });
//          const paginatedData = await User.find(additionalRolesQuery);

//   console.log(paginatedData);
// }
// else if(role=='doctor'){
//   const additionalRolesQuery = {
//     $or: [{ role: 'doctor' }],
//   };
//  const data = await User.find({ $and: [query1, additionalRolesQuery] });
//          const paginatedData = await User.find(additionalRolesQuery);

//   console.log(paginatedData);
// }
// else if(role !== 'doctor')
// {
//   const additionalRolesQuery = {
//     $or: [{ role: 'patient' },{ role: 'staff' }],
//   };
//  const data = await User.find({ $and: [query1, additionalRolesQuery] });
//          const paginatedData = await User.find(additionalRolesQuery);

//  // console.log(paginatedData);
//   res.send({paginatedData,totalPages})

// }


// } else if (role=='staff') {
//   console.log('hii');
//   // Include both "doctor" and "staff" records
//   const additionalRolesQuery = {
//     $or: [{ role: 'doctor' }, { role: 'staff' }],
//   };
//  const data = await User.find({ $and: [query1, additionalRolesQuery] });
//          const paginatedData = await User.find(additionalRolesQuery);

//          res.send({paginatedData,totalPages})

// }

        res.send({paginatedData,totalPages,TotalData})



            }
    
          
      catch(e){
          res.send(e.message)
      }
         }
} catch (error) {
  
}



  })







// app.use((req,res,next)=>{
//     const token=req.headers.token
//     //const{email,password}=req.body
//       ///console.log("email",email,password)
//       if(!token){
//         res.send("missung token")
//       }
//       //const verification=jwt.verify(token,"Secreate123")

//       try{
//         const verification=jwt.verify(token,"Secreate123")
// console.log(verification);
//         if(verification.exp>new Date().getTime()){
//            // let user=await User.findById({"_id":id})

//             res.send('token is expired')

//         }
//         if(blacklist.includes(token)){
//             return res.send('token already used')
//                }
//                next()

//   }catch(e){
//       res.send(e.message)
//   }
  
//   })
  //app.use(authMiddleware)





  app.post("/logout",async(req,res)=>{
    const token=req.headers.token
blacklist.push(token)
const decoded=jwt.decode(token)

let user2=await User.findByIdAndUpdate({"_id":decoded.id},          
                     { isLoggedin: false },
                   {new:true})
return res.send('logged out sucessfully')
})









app.post("/refresh", async(req,res)=>{
    let id=req.params
   const refreshtoken=req.headers['refreshtoken']
   if(!refreshtoken){
    res.send("token not found")
   }
    //console.log(req.method,req.url)
    //let product=db.products.find((products)=> products.id===num)
const verification=jwt.verify(refreshtoken,"Secreaterefresh123")
    try{
        if(verification){
           // let user=await User.findById({"_id":id})
const newtoken=jwt.sign({id:verification.id,age:verification.age},'Secreate123',
{expiresIn:'10 days'}
)
            res.send({token:newtoken})
        }else{
            res.send("user not found")
        }
    }catch(e){
        res.send(e.message)
    }
  
    })





    app.patch("/user/:id", async(req,res)=>{
        let id=req.params.id
       
  
        //const token=req.headers["token"]
  
        try{
            
          //  const decoded=jwt.decode(token)
            //console.log(decoded);
    
            

        //let blog1=await Blog.findById({"_id":id});
        //console.log("blog",blog1)
        //if(decoded.id==blog1.author){
           let user24=await User.findByIdAndUpdate({"_id":id},{...req.body},{new:true})
         let user=await User.findById({"_id":id})

            console.log('user345',user24,user);

            if(user){
              console.log('====================================');
              console.log('user345',user24);
              console.log('====================================');
            res.send(user)
  
      //}else{
         // res.send(' cant update other writers blog')
      //}

    }
else{
return  res.status(403).send('not allowed to update blog')
   
//res.send(blog)

}        
 }catch(e){
            res.send(e.message)
        }
  
      })







app.get("/user/:id", async(req,res)=>{
    let {id}=req.params
   const token=req.headers['token']
   if(!token){
    console.log('hiiii')
    return res.send('Unauthorized')
   }
//    if(blacklist.includes(token)){
// return res.send('token already expired')
//    }
    //console.log(req.method,req.url)
    //let product=db.products.find((products)=> products.id===num)
// if(verification){
//     return res.send("verify")
// }
    try{
        const verification=jwt.verify(token,"Secreate123")

        if(verification){
            let user=await User.findOne({_id:id})

            res.send(user)
        }else{
            res.send("user not found")
        }
    }catch(e){
        console.log(e.message);

        if(e.message=="jwt expired"){
            console.log('jklhguiop');

blacklist.push(token)
        }
       return res.send(blacklist)

    }
  
    })


    app.delete("/:id", async(req,res)=>{
        let id=req.params.id
       console.log("id",id);
  
       // const token=req.headers["token"]
  
        try{
            
        //    const decoded=jwt.decode(token)
        //    console.log(decoded);
    
           // if(decoded.role ==="doctor" || decoded.role==="admin" ){
                let blog1=await User.findById({"_id":id});
                console.log("blog",blog1)
                // if(decoded.id==blog1.author){
                  let blog=await User.findByIdAndDelete({"_id":id});
  
                    if(blog){
                    res.send('user deleted')
                }else{
                    res.send("user is not found to delete")
                }  
              // }else{
              //     res.send(' cant delete other writers blog')
              // }
    
           // }
   // else{
    //  return  res.status(403).send('not allowed to delete oppointment')
           
      //res.send(blog)
    
   // }        
    
        }catch(e){
            res.send('can not find blog by this id ')
        }
  
      })




      app.get('/csv', async (req, res) => {
        try {
          const dataFromMongoDB = await User.find().lean();
      
          const csvStream = csv.format({ headers: true });
          csvStream.pipe(fs.createWriteStream('datausers.csv'));
          //const stream = doc.pipe(fs.createWriteStream('data.pdf')); // Pipe the PDF to a file stream
    
          dataFromMongoDB.forEach(data => {
            csvStream.write(data);
    
          });
      
          csvStream.end();
      
          res.download('datausers.csv', 'MongoDataUsers.csv', (err) => {
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
        const dataFromMongoD = await User.find().lean(); // Using .lean() to get plain objects
        const dataFromMongoDB = dataFromMongoD.map(item => {

          if(item.is_superAdmin){
            v="Yes"
          }
          else{
            v='No'
    
           }
  
           if(item.role=="staff"){
            s="Yes"
          }
          else{
            s='No'
    
           }
  

          return { _id: item._id.toString(),Name:item.name,Email:item.email,superAdmin:v,staff:s,
            JOINED_DATE	:item.date };
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





      app.get("/pdf",async(req,res)=>{

        const doc = new PDFDocument();
  const stream = doc.pipe(fs.createWriteStream('data34.pdf')); // Pipe the PDF to a file stream

  try {
    // Connect to MongoDB and fetch data
    const data = await User.find({});
   

    let y = 30;
    const margin = 10;
    const columnWidths = [80, 90, 50, 80, 80,80,80]; // Adjust column widths as needed

    // Draw table header
    drawRow(['Name', 'Email', 'superuser', 'staff', 'joined_Date','last_login'], doc, y, columnWidths);
    y += 40;

    // Draw table rows
    for (const item of data) {
let v;
let s;

        if(item.is_superAdmin){
          v="Yes"
        }
        else{
          v='No'
  
         }

         if(item.role=="staff"){
          s="Yes"
        }
        else{
          s='No'
  
         }



      drawRow([item.name, item.email,v,s, item.date,0], doc, y, columnWidths);
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
      res.setHeader('Content-Disposition', 'attachment; filename="data3.pdf"');
      fs.createReadStream('data3.pdf').pipe(res);
    });
  } catch (error) {
    console.error('Error generating PDF:', error);
    res.status(500).send('Internal Server Error');
  }

            })






    module.exports=app


    
      //app.use(authMiddleware)












