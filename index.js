const express = require("express");
const app = require("./src/app");

app(express()).listen(8000, ()=>{
    console.log('App is running on port 8000 you can access in http://lecalhost:8000')
});
