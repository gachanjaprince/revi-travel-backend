<div id="header">
  <h1>Revi Travel (Backend)</h1>
  <p> The Node.js server is designed to handle user registration, authentication, and post creation for our React app, using MongoDB as the primary database for storing user and post objects. Further, it leverages passport & passport-jwt for user authentication, allowing secure access to protected resources. </p>
</div>
<div align="center">
  <img src="https://img.shields.io/badge/node.js-white?style=for-the-badge&logo=Node.js&logoColor=339933" alt="Node JS Logo" height="27.5"/>&nbsp;
  <img src="https://img.shields.io/badge/-MongoDB-13aa52?style=for-the-badge&logo=mongodb&logoColor=white" alt="Mongo db" height="27.5"/>&nbsp;
  <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB" alt="Express JS Logo" height="27.5"/>&nbsp;
  <img src="https://img.shields.io/badge/Passport_Js-black?style=for-the-badge&logo=passport&logoColor=" alt="Passport JS Logo" height="27.5"/>&nbsp;
</div>
<div>
  <h2>Installation</h2>
  <p> 1. Install the Server packages. </p>
  <div class="highlight highlight-source-js notranslate position-relative overflow-auto" dir="auto">
    <code>npm install</code>
  </div>
  <p> 2. Create a .env file and insert your MongoDB connection string, Cloudinary variable and JWT signature. </p>
  <div class="highlight highlight-source-js notranslate position-relative overflow-auto" dir="auto">
    <pre>
      <span class="pl-c1">MONGODB_URI</span><span class="pl-c1">=</span><span class="pl-s">`mongodb+srv://...`</span>
      <span class="pl-c1">CLOUD_NAME</span><span class="pl-c1">=</span><span class="pl-s">`...`</span>
      <span class="pl-c1">API_KEY</span><span class="pl-c1">=</span><span class="pl-s">`...`</span>
      <span class="pl-c1">API_SECRET</span><span class="pl-c1">=</span><span class="pl-s">...</span>
      <span class="pl-c1">JWT_SECRET</span><span class="pl-c1">=</span><span class="pl-s">`...`</span>
    </pre>
  </div>
  <p> 3. Start the server. </p>
  <div class="highlight highlight-source-js notranslate position-relative overflow-auto" dir="auto">
    <pre><span> npm start </span></pre>
  </div>
  <p> 4. Look for success message. </p>
  <div class="highlight highlight-source-js notranslate position-relative overflow-auto" dir="auto">
    <pre>
      <span> Server is running on PORT ... </span>
      <span> Connected to MongoDB </span>
    </pre>
  </div>
</div>

