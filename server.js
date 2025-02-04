const express = require("express")
const app = express()
const port = process.env.PORT || 8080


// tells express to use EJS
app.set("view engine", "ejs")


// database
const mongoose = require("mongoose");
require("dotenv").config();


// If the server receives a request at / , respond by sending back the string "HELLO WORLD"
// app.get("/", (req,res) => {
//  return res.send("HELLO WORLD!")
// })


// REQUIRED:
const Student = require("./models/Student.js")



// Add a record
// http://localhost:8000/
// Every time you go to this endpoint, the code inside the function will execute
// Inserting a student and outputting a message to the browser
// Every time you go to this endpoint (refresh in the browser), you will get
// a new Peter Patel inserted into the database
app.get("/", async (req,res) => {
   // insert a  new student
   await Student.create({
       name:"Jonny Burger",
       gpa:4.0,
       tuitionPaid: false
   })
   return res.send("Student inserted, refresh database to see results")
})



// Update Exixting Document
app.get("/update", async (req,res) => {
    // update an existing student
    await Student.findByIdAndUpdate("67a15c4a8068261d06c6263d", {name:"Paula Patel", gpa:5.1234})
    await Student.findByIdAndUpdate("67a15ee4860b4b930ca37adb", {name:"Daves New", gpa:3.56})
    return res.send("Student updated, refresh the database to see results")
 })




 //Update a particular record
// http://localhost:8080/update-specific-student/67a15c4a8068261d06c6263d
app.get("/update-specific-student/:docId", async (req,res)=>{
    // update the specific student
    await Student.findByIdAndUpdate(req.params.docId, {name:"Paula Patel 22222", gpa:99999})
    return res.send(`Student ${req.params.docId}, refresh the database to see results`)
 })
 

//Update all records
// http://localhost:8080/update-all/67a15ee4860b4b930ca37adb/Beyonce/100000000
app.get("/update-all/:docId/:updatedName/:updatedGPA", async (req,res)=>{
   // update the specific student
   await Student.findByIdAndUpdate(req.params.docId, {name:req.params.updatedName, gpa:parseFloat(req.params.updatedGPA)})
   return res.send(`Student ${req.params.docId} updated!`)
})

//Delete a record
// http://localhost:8080/delete
app.get("/delete", async (req,res) => {
    // delete an existing student
    await Student.findByIdAndDelete("67a15ee4860b4b930ca37ad9")
    return res.send("Student deleted")
 })
 
//Delete using a particular url
// http://localhost:8080/delete2/67a15ee3860b4b930ca37ad7
app.get("/delete2/:docId", async (req,res) => {
    // delete an existing student
    await Student.findByIdAndDelete(req.params.docId)
    return res.send("Student deleted 2")
 })
 
 
 



const startServer = async () => {   
   console.log(`The server is running on http://localhost:${port}`)
   console.log(`Press CTRL + C to exit`)


   // MongoDB Connection
   try {
       await mongoose.connect(process.env.MONGODB_URI)
       console.log("Success! Connected to MongoDB")
   } catch (err) {
       console.error("Error connecting to MongoDB:", err);
   }   
}
app.listen(port, startServer)


