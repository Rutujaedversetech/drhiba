// backend/app.js or index.js

const express = require('express');
const multer = require('multer');
const path = require('path');
const Slider = require('./slotholiday.model');
const fs = require('fs');
const ImageModel = require('./slotholiday.model');
const Service = require('./slotholiday.model');
const Card = require('./slotholiday.model');
const Slot = require('./slotholiday.model');
const SlotHoliday = require('./slotholiday.model');
const PDFDocument = require('pdfkit');
const xlsx = require('xlsx');
const csv = require('fast-csv');

const app = express();



// Handle the file upload
app.post("/upload", (req, res) => {
  console.log(req.file,req.body);
  const saveImage = SlotHoliday({
    date: req.body.date,

    time: req.body.time,

  });
  saveImage
    .save()
    .then((res) => {
      console.log("data is saved");
    })
    .catch((err) => {
      console.log(err, "error has occur");
    });

    res.send(saveImage)
});





app.get("/getall",async(req,res)=>{

  const {limit ,query}=req.query
  const ITEMS_PER_PAGE = limit ;
  const searchQuery = req.query;

  const TotalData= await SlotHoliday.find();

  try{
    if(query==''){
      console.log('it is empty');
      const items= await SlotHoliday.find();
        //res.send(items)
        const page = parseInt(req.query.page) || 1; // Extract the page number from the query params, default to 1
        console.log('page',page);
              const startIndex = (page - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
              // let data=await Contact.find()
      
               const data1 = await SlotHoliday.find()
    const totalItems = data1.length; // Replace with the total number of items from your data source
        const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
      
        // const paginatedData = data.slice(startIndex, endIndex);
        const paginatedData = await SlotHoliday.find().limit(limit).skip((page-1)*limit)
  
        res.send({paginatedData,totalPages,TotalData})
  //res.send(data1)

  
  
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
  
  
        // subject:{type:String},
        // pro_text:{type:String},
        // image:{type:String}, 
        // publish:{type:String},
  
  
        const data = await SlotHoliday.find({$or: [
          { time: { $regex: query, $options: 'i' } },

          { date: { $regex: query, $options: 'i' } },

  
        ]});
        const totalItems = data.length; // Replace with the total number of items from your data source
        const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
      
        const paginatedData = data.slice(startIndex, endIndex);
        res.send({paginatedData,totalPages,TotalData})
          //res.send(data)

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

       const data = await SlotHoliday.find(query1);
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
//res.send(data)


        }

      
  catch(e){
      res.send(e.message)
  }
     }







  }
catch(e){
  res.send(e.message)
}
})


app.delete("/:id", async(req,res)=>{
let id=req.params.id
console.log("id",id);

// const token=req.headers["token"]

try{
    
    // const decoded=jwt.decode(token)
    // console.log(decoded);

    // if(decoded.role ==="doctor" || decoded.role==="admin" ){
        let blog1=await SlotHoliday.findById({"_id":id});
        console.log("blog",blog1)
        // if(decoded.id==blog1.author){
          let blog=await SlotHoliday.findByIdAndDelete({"_id":id});

            if(blog){
            res.send('data deleted')

        }else{
            res.send("data is not found to delete")
        }  
      // }else{
      //     res.send(' cant delete other writers blog')
      // }

//       }
// else{
// return  res.status(403).send('not allowed to delete oppointment')
   
// //res.send(blog)

// }        

}catch(e){
    res.send('can not find blog by this id ')
}

})



app.delete("/datetime", async(req,res)=>{
  let date=req.params.date
  let time=req.params.time

//  console.log("id",id);
  
  // const token=req.headers["token"]
  
  try{
      
      // const decoded=jwt.decode(token)
      // console.log(decoded);
  
      // if(decoded.role ==="doctor" || decoded.role==="admin" ){
         // let blog1=await SlotHoliday.findById({"_id":id});
        //  console.log("blog",blog1)
          // if(decoded.id==blog1.author){
            let blog=  await SlotHoliday.deleteMany({
              date: date,
              time: time,
            });
  
              if(blog){
              res.send('data deleted')
  
          }else{
              res.send("data is not found to delete")
          }  
        // }else{
        //     res.send(' cant delete other writers blog')
        // }
  
  //       }
  // else{
  // return  res.status(403).send('not allowed to delete oppointment')
     
  // //res.send(blog)
  
  // }        
  
  }catch(e){
      res.send('can not find blog by this id ')
  }
  
  })


app.get('/csv', async (req, res) => {
  try {
    const dataFromMongoDB = await SlotHoliday.find().lean();

    const csvStream = csv.format({ headers: true });
    csvStream.pipe(fs.createWriteStream('dataslotholiday.csv'));
    //const stream = doc.pipe(fs.createWriteStream('data.pdf')); // Pipe the PDF to a file stream

    dataFromMongoDB.forEach(data => {
      csvStream.write(data);

    });

    csvStream.end();

    res.download('dataslotholiday.csv', 'MongoDataService.csv', (err) => {
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
  const dataFromMongoD = await SlotHoliday.find().lean(); // Using .lean() to get plain objects
  const dataFromMongoDB = dataFromMongoD.map(item => {

    

     


    return { _id: item._id.toString(),Date:item.date,Time:item.time};
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
const stream = doc.pipe(fs.createWriteStream('dataSlotholiday.pdf')); // Pipe the PDF to a file stream

try {
// Connect to MongoDB and fetch data
const data = await SlotHoliday.find({});


let y = 30;
const margin = 10;
const columnWidths = [100,100]; // Adjust column widths as needed

// Draw table header
drawRow(['date', 'time'], doc, y, columnWidths);
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



drawRow([item.date,item.time], doc, y, columnWidths);
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
res.setHeader('Content-Disposition', 'attachment; filename="dataSlotholiday.pdf"');
fs.createReadStream('dataSlotholiday.pdf').pipe(res);
});
} catch (error) {
console.error('Error generating PDF:', error);
res.status(500).send('Internal Server Error');
}

      })







module.exports=app
