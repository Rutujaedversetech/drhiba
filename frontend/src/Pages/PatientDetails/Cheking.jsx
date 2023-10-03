import React, { useEffect, useRef, useState } from 'react'
import axios from "axios";
import { getAllContacts } from '../../Redux/contact/action';
import { useDispatch } from 'react-redux';

const Cheking = () => {
  const dispatch = useDispatch();

    const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const [name, setName] = useState("");

    const getItems = async () => {
        //setLoading(true);
        try {
          const res = await axios.get("http://localhost:8080/application/getall");
          setItems(res.data.blogs);
          //setLoading(false);
          console.log(res.data.blogs);
        } catch (error) {
          console.log(error);
        }
      };
      useEffect(() => {
        getItems();
      }, []); 

      const downloadFile = async (id) => {
        try {
          const res = await axios.get(
            `http://localhost:8080/application/download/${id}`,
            { responseType: "blob" }
          );
          const blob = new Blob([res.data], { type: res.data.type });
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = "file.pdf";
          // link.download = res.headers["content-disposition"].split("filename=")[1];
          link.click();
        } catch (error) {
          console.log(error);
        }
      };

// useEffect(()=>{
//   dispatch(getAllContacts())

// },[])
// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { getSingleContact } from '../../Redux/contact/action';
// import { useParams } from 'react-router-dom';

// const ContactSpecificdetais = () => {
//     const contact = useSelector((state)=>state.contact.singleData)
//     console.log('contact',contact);
//     const {id}=useParams();
//     console.log(id);

//     const dispatch = useDispatch();

//     useEffect(()=>{
//         dispatch(getSingleContact(id))
      
//       },[])

      const fileInput = document.getElementById('file-input'); // Assuming you have an input element with id 'file-input' for file selection
console.log(fileInput);
      const handy= () => {
const file = fileInput.files[0];
console.log(file);

  const reader = new FileReader();
  reader.onload = () => {
    const arrayBuffer = reader.result;
    const byteArray = new Uint8Array(arrayBuffer);

    const url = 'http://edversetech.com/ShareFile/uploadFile.php';
    const formData = new FormData();
    formData.append('file', new Blob([byteArray]));

    fetch(url, {
      method: 'POST',
      body: formData
    })
      .then(response => {
        console.log('File uploaded successfully!');
        // Handle the response as needed
      })
      .catch(error => {
        console.error('Error uploading file:', error);
        // Handle the error as needed
      });
  };

  reader.readAsArrayBuffer(file);  
  

      };
      







      return (
    <div>
      
      
      <input id='file-input' type='file' onChange={handy}/>
      
       <div className="items">
    {items &&
      items.map((item) => (
        <div className="item" key={item._id}>
          <h3>{item.name}</h3>
          <button onClick={() => downloadFile(item._id)}>
            Download File
          </button>
        </div>
      ))}
  </div></div>
  )
}

export default Cheking