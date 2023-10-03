// backend/app.js or index.js

const express = require('express');
const multer = require('multer');
const path = require('path');
//const Slider = require('./slideshow.model');
const fs = require('fs');
const Beforeafter = require('./servicedetails.model');
const ServiceDetails = require('./servicedetails.model');
const PDFDocument = require('pdfkit');
const xlsx = require('xlsx');
const csv = require('fast-csv');

const app = express();
app.use(express.json({ limit: '10mb' })); // Adjust the limit as needed

// Set up the file storage using multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'Slideshowmedia'); // Specify the directory where files will be stored
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const fileExtension = path.extname(file.originalname);
    cb(null, uniqueSuffix + fileExtension);
  }
});

//const upload = multer();
const upload = multer({ dest: 'Slideshowmedia/' })


// Handle the file upload

app.post('/upload', upload.fields([{ name: 'image1' }, { name: 'image2' }]), async (req, res) => {
    try {
        // const uploadedImages = req.files; // Array of uploaded image files

        // if (uploadedImages.length !== 2) {
        //   return res.status(400).json({ error: 'Please upload exactly two images' });
        // }
    console.log(req.body.service,req.body.description);
        const imageRecord = {
             image1 :req.files['image1'][0].path,
             image2 : req.files['image2'][0].path,
             service:req.body.service,
             description:req.body.description
          
        };
    
        const insertedImage = await ServiceDetails.create(imageRecord);
        res.send(insertedImage)
    
       // res.status(201).json({ message: 'Images uploaded and saved to the database', image: insertedImage });
    } catch (error) {
     // res.status(500).json({ error: 'An error occurred while uploading images' });
      res.send(error)

    }
  });



app.get("/getall",async(req,res)=>{

  const {limit ,query}=req.query
  const ITEMS_PER_PAGE = limit ;
  const TotalData= await ServiceDetails.find();

  try{
    if(query==''){
      console.log('it is empty');
      const items= await ServiceDetails.find();
        //res.send(items)
        const page = parseInt(req.query.page) || 1; // Extract the page number from the query params, default to 1
        console.log('page',page);
              const startIndex = (page - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
              // let data=await Contact.find()
      
               const data1 = await ServiceDetails.find()
    const totalItems = data1.length; // Replace with the total number of items from your data source
        const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
      
        // const paginatedData = data.slice(startIndex, endIndex);
        const paginatedData = await ServiceDetails.find().limit(limit).skip((page-1)*limit)
  
        res.send({paginatedData,totalPages,TotalData})
 // res.send(data1)

  
  
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
  
  
        const data = await ServiceDetails.find({$or: [
          { service: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } },


  
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
          let blog1=await ServiceDetails.findById({"_id":id});
          console.log("blog",blog1)
          // if(decoded.id==blog1.author){
            let blog=await ServiceDetails.findByIdAndDelete({"_id":id});

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
    const dataFromMongoDB = await ServiceDetails.find().lean();

    const csvStream = csv.format({ headers: true });
    csvStream.pipe(fs.createWriteStream('dataservice.csv'));
    //const stream = doc.pipe(fs.createWriteStream('data.pdf')); // Pipe the PDF to a file stream

    dataFromMongoDB.forEach(data => {
      csvStream.write(data);

    });

    csvStream.end();

    res.download('dataservice.csv', 'MongoDataService.csv', (err) => {
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
  const dataFromMongoD = await ServiceDetails.find().lean(); // Using .lean() to get plain objects
  const dataFromMongoDB = dataFromMongoD.map(item => {

    

     


    return { _id: item._id.toString(),service:item.service,description:item.description};
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
const stream = doc.pipe(fs.createWriteStream('dataservice.pdf')); // Pipe the PDF to a file stream

try {
// Connect to MongoDB and fetch data
const data = await ServiceDetails.find({});


let y = 30;
const margin = 10;
const columnWidths = [100,100]; // Adjust column widths as needed

// Draw table header
drawRow(['Service', 'Description'], doc, y, columnWidths);
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



drawRow([item.service, item.description], doc, y, columnWidths);
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
res.setHeader('Content-Disposition', 'attachment; filename="dataservice.pdf"');
fs.createReadStream('dataservice.pdf').pipe(res);
});
} catch (error) {
console.error('Error generating PDF:', error);
res.status(500).send('Internal Server Error');
}

      })




module.exports=app
