/* 
Complete the following tasks to get this controller working.
- Establish and export a routing service 
- Ensure the app.js knows about this controller.
- All routes that involve the path: localhost:4000/job get routed to this file.
- Create a Route that is localhost:4000/job/
-Request Type: Get
-Response: JSON: message "Works from Job Controller"
*/
// ! fs: this gives us access to the file system that is built in with nodejs
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const router = require("express").Router();
const dbPath = "./assets/job-detail.db.json"; // relative to the app.js file
/* 
Endpoint: "localhost:4000/job/all"
Request Type: GET
Response: 

{
message: "success"
}
*/

router.get("/all", (req, res) => {
  let jobArray = read();
  res.json({ message: "success", jobs: jobArray });
});

// Endpoint: localhost:4000/job/get-by-id/:id
// :id = "params" | req.params
// Request Type: GET
// Response: JSON: message: "success", job: job
router.get("/get-by-id/:id", (req, res) => {
  try {
    console.log(req.params);
    const { id } = req.params;
    let jobArray = read();
    let job = jobArray.find((item) => item.id === id);

    if (!job) throw new Error("Job not found");

    res.json({ message: "success", job: job });
  } catch (error) {
    res.json({ message: "error", error: error.message });
  }
});

// Create Endpoint: localhost:4000/job/add
// Request Type: POST
// Data: dateApplied, companyName, jobTitle, contact, status
//  send JSON: message: success
// ? Create Endpoint: localhost:4000/job/add
// req type: POST
// Data: dateApplied, comapnyName, jobTitle, contact, status
// send JSON: message: success
router.post("/add", (req, res) => {
  const { dateApplied, companyName, jobTitle, contact, status } = req.body;

  let jobArray = read();

  let id = uuidv4(); // This will create a unique ID for our job data

  jobArray.push({ id, dateApplied, companyName, jobTitle, contact, status });

  save(jobArray);
  res.json({
    message: `success`,
    jobs: jobArray,
  });
});

// DELETE
// Endpoint: localhost:4000/jobs/delete/:id
// :id = "params" | req.params
// Request Type: DELETE

router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;
  // Read the File
  let jobArray = read();
  // Modify the Data
  jobArray = removeOne(jobArray, id);
  // Save the Data to the File
  save(jobArray);

  res.json({ message: "delete success", jobs: jobArray });
});

// UPDATE
// Endpoint: localhost:4000/jobs/update/?id=
//  req.query
// Request Type: PATCH

router.patch("/update/", (req, res) => {
  console.log(req.query);
  const { id } = req.query;
  // Read the File
  let jobArray = read();
  // Modifying the data
  jobArray = updateOne(jobArray, id, req.body);

  // Save the data to the file
  save(jobArray);

  res.json({ message: "update success", jobs: jobArray });
});

// Helper Functions

function read() {
  const file = fs.readFileSync(dbPath);
  return JSON.parse(file);
}

function save(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data));
}

// Deleting
function removeOne(originalArray, id) {
  const modifiedArray = originalArray.filter((item) => item.id !== id);
  return modifiedArray;
}

// updating
function updateOne(originalArray, id, updatedInfo) {
  const index = originalArray.findIndex((item) => item.id === id);
  // console.log(index);
  if (index != -1) {
    originalArray[index] = { ...originalArray[index], ...updatedInfo };
  }
  return originalArray;
}

module.exports = router;
