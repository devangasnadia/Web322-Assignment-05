/********************************************************************************

* WEB322 – Assignment 05

* 

* I declare that this assignment is my own work in accordance with Seneca's

* Academic Integrity Policy:

* 

* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html

* 

* Name: Devang Asnadia Student ID: 161894217 Date: 26/11/23


* Published URL: 



*

********************************************************************************/
const express = require("express");
const legoData = require("./modules/legoSets");
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (_req, res) => {
  res.render("home", { page: '/' });
});

app.get('/about', (_req, res) => {
  res.render("about", { page: '/about' });
});

app.get("/lego/sets", (_req, res) => {
  legoData
    .getAllSets()
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

app.get("/lego/sets/num-demo/:id", (req, res) => {
  legoData
    .getSetByNum(req.params.id)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

app.get("/lego/sets/theme-demo/:name", (req, res) => {
  legoData
    .getSetsByTheme(req.params.name)
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

app.get("/lego/addSet", async (_req,res)=>{
  try{
    let themeData = await legoData.getAllThemes();
    res.render("addSet", {theme: themeData});
  }catch(err){
    res.render('404', {message: err});
  }
});

app.post("/lego/addSet", async (req,res)=>{
  try{
    legoData.addSet(req.body)
    .then(() => {
      console.log("Set Added");
      res.redirect("/lego/sets");
    })
    .catch((err) => {
      res.render('500', { message: `We have encountered the following error: ${err}` });
    });
  }catch(err){
    res.render('404', {message: err});
  }
});

app.get("/lego/editSet/:id", async (req,res)=>{
  try{
    let setData = await legoData.getSetByNum(req.params.id);
    let themes = await legoData.getAllThemes();
    res.render("editSet", {set: setData, themes: themes});
  }catch(err){
    res.render('404', {message: err});
  }
});

app.post("/lego/editSet", async (req,res)=>{
  try{
    legoData.editSet(req.body.set_num, req.body)
    .then(() => {
      console.log("Set Edited");
      res.redirect("/lego/sets");
    })
    .catch((err) => {
      res.render('500', { message: `We have encountered the following error: ${err}` });
    });
  }catch(err){
    res.render('404', {message: err});
  }
});

app.get("/lego/deleteSet/:num", async (req,res)=>{
  try{
    legoData.deleteSet(req.params.num)
    .then(() => {
      console.log("Set Deleted");
      res.redirect("/lego/sets");
    })
    .catch((err) => {
      res.render('500', { message: `We have encountered the following error: ${err}` });
    });
  }catch(err){
    res.render('404', {message: err});
  }
});


const startServer = async () => {
  try {
    await legoData.initialize();
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
  } catch (err) {
    console.log(`Failed to listen on port ${PORT}`);
  }
};
startServer();





