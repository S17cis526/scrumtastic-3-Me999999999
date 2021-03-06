"use strict";

/** @module project


*/
module.export = {
  list: list,
  create: create,
  read: read,
  update: update,
  destroy: destroy
}

/** @function list

*/
function list(req, res, db) {
  db.all("SELECT * FROM projects", [], function(err, projects){
    if(err)
    {
        console.error(err);
        res.statustCode = 500;
        res.end("Server Error");
        return;
    }
    res.setHeader("content-Type", "text/json");
    res.end(JSON.stringify(projects));
  });
}


/** @function create
*
*/
function create(req, res, db) {
  var body = "";

  req.on("error". function(err){
    console.error(err);
    res.statusCode = 500;
    res.end("Server Error");
  });

  req.on("data", function(data){
    body += data;
  });

  req.on("end", function(){
    var projects = JSON.parse(body);
    db.run("INSERT INTO projects (name, description, version, repository, license) VALUES (?,?,?,?,?)"
    [project.name, project.description, project.version, project.repository, project.license],
    function(err) {
      if(err){
        console.error(err);
        res.statusCode = 500;
        res.end("Could not insert project into database");
        return;
      }
    res.statusCode = 200;
    res.end();
    });
  });
}


function read(req, res, db) {
  var id = req.params.id;
  db.get("SELECT * FROM projects WHERE id=?", [id], function(err, project){
    if(err)
    {
      console.error(err);
      res.statusCode = 500;
      res.end("Server Error");
      return;
    }
    if(!project)
    {
      res.statusCode = 404;
      res.end("Project not found");
      return;
    }
    res.setHeader("Content-Type", "text/json");
    res.end(JSON.stringify(project));
  });
}

function create(req, res, db) {
  var body = "";

  req.on("error". function(err){
    console.error(err);
    res.statusCode = 500;
    res.end("Server Error");
  });

  req.on("data", function(data){
    body += data;
  });

  req.on("end", function(){
    var projects = JSON.parse(body);
    db.run("UPDATE projects (name, description, version, repository, license) VALUES (?,?,?,?,?)"
    [project.name, project.description, project.version, project.repository, project.license],
    function(err) {
      if(err){
        console.error(err);
        res.statusCode = 500;
        res.end("Could not update project into database");
        return;
      }
    res.statusCode = 200;
    res.end();
    });
  });
}

function destroy(req, res, db){
  var id = req.params.id;
  db.run("DELETE FROM projects WHERE id=?", [id], function(err){
    if(err)
    {
      console.error(err);
      res.statusCode = 500;
      res.end("Server Error");
    }
    res.statusCode = 200;
    res.end();
  });
}
