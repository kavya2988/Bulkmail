import { useState } from "react"
import axios from "axios"
import * as XLSX from "xlsx"

function App()
{

  

  const[msg,setmsg]=useState("")
      const [status,setStatus]=useState(false)
      const [emailList,setEmailList] = useState([])
      const [subject,setSubject] = useState("")
      //const emailList=XLSX.utils.sheet_to_json(worksheet,{header:'A'})
     
    
      
      //const totalemail=emailList.map(function(item){
       // return(item.A)
     // }
      
  function handlemsg(event)
  {
    setmsg(event.target.value)
  }
  function handlefile(event)
  {
    

    const file=event.target.files[0]
    const reader=new FileReader()
    reader.onload=function(event)
{
    const data=event.target.result
    const workbook=XLSX.read(data,{type:"binary"})
    const sheetName=workbook.SheetNames[0]
    const worksheet=workbook.Sheets[sheetName]
    const email=XLSX.utils.sheet_to_json(worksheet,{header:'A'})
   

    const totalEmails = email.map(item => item.A)

    setEmailList(totalEmails)
}
    reader.readAsBinaryString(file)
}
  

  function send()
  {
    setStatus(true)
    axios.post("http://localhost:5000/sendemail",{msg:msg,emailList:emailList,subject:subject})
    .then(function(data)
    {
      setStatus(false)
      if(data.data=== true)
      {
        alert("email sent sucessfully")
      }
      else{
        alert("email failed")
      }}).catch(function(error)
    {
setStatus(false)
alert("server error")
    })
  }
  return(
    <div>
      <div className="bg-blue-950 text-white text-center">
        <h1 className="font-medium px-5 py-3">Bulkmail</h1>
      </div>

      <div className="bg-blue-800 text-white text-center">
        <h1 className="font-medium px-5 py-3">We can help your business with sending multiple emails at once</h1>
      </div>

      <div className="bg-blue-600 text-white text-center">
        <h1 className="font-medium px-5 py-3">Drag and drop</h1>
      </div>


      <div className="bg-blue-400 flex flex-col items-center text-black px-5 py-3">
        <h1 className="font-medium px-5 py-3"></h1>
        <input type="text" placeholder="Enter Subject" value={subject} onChange={(e) => setSubject(e.target.value)}
  className="w-[80%] py-2 px-2 bg-white outline-none border border-black rounded mb-4"
/>
        <textarea onChange={handlemsg} value={msg} className="h-32 w-[80%] py-2 px-2 bg-white outline-none border border-black rounded " placeholder="enter email body"></textarea>
        <div>
          <input type="file"  onChange={handlefile} className="border-4 border-dashed border-white py-4 px-4 mt-5 mb-5"/>
        </div>
          <p>Total email in the file is:{emailList.length}</p>
          <button  onClick={send} className="bg-blue-950 py-2 px-2 text-white font-medium rounded-md w-fit">{status?"Sending..":"Send"}</button>
       
      </div>
      <div className="bg-blue-300 text-white text-center p-8">
        
      </div>

      <div className="bg-blue-300 text-white text-center p-8">
        
      </div>

    </div>
  )
}


export default App
