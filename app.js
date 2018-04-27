var express = require("express");
var bodyparser = require("body-parser");
var path = require("path");
var config = require("./app.js");
const url = 'mongodb://localhost:27017/info';
const MongoClient = require("mongodb").MongoClient;
const dbname = "info";

var app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static(__dirname, {index: "index.html"}));

app.post("/deleteall", function(req, res) {
  console.log("deleting all entries in collection testdata");
  MongoClient.connect(url, function(err, client) {
    if (err) throw err;
    var db = client.db(dbname);
    db.collection("testdata").deleteMany(function(err, res) {
      if (err) throw err;
      console.log("deleted all entries in collection testdata");
    });
    client.close();
  });
})
app.post("/insertmany", function(req, res) {
  console.log("inserting many data entries");
  MongoClient.connect(url, function(err, client) {
    if (err) {
      console.log("error in db connection");
      throw err;
    }
    console.log("connected to mongodb: inserting many entries");
    var db = client.db(dbname);

    db.collection("testdata").insertMany([
      { "name" : "one", "age" : 1, "gender" : "f", "Array ID": "001" },
      { "name" : "two", "age" : 2, "gender" : "m", "Array ID": "002" },
      { "name" : "three", "age" : 3, "gender" : "f", "Array ID": "003" },
      { "name" : "four", "age" : 4, "gender" : "m", "Array ID": "004" },
      { "name" : "five", "age" : 5, "gender" : "f", "Array ID": "005" },
      { "name" : "six", "age" : 6, "gender" : "m", "Array ID": "006" },
      { "name" : "seven", "age" : 7, "gender" : "f", "Array ID": "007" },
      { "name" : "eight", "age" : 8, "gender" : "m", "Array ID": "008" },
      { "name" : "nine", "age" : 9, "gender" : "f", "Array ID": "009" },
      { "name" : "ten", "age" : 10, "gender" : "m", "Array ID": "010" },
      { "name" : "eleven", "age" : 11, "gender" : "f", "Array ID": "011" },
      { "name" : "twelve", "age" : 12, "gender" : "m", "Array ID": "012" },
      { "name" : "eleven_two", "age" : 11, "gender" : "f", "Array ID": "011_2" },
      { "name" : "fourteen", "age" : 14, "gender" : "m", "Array ID": "014" },
      { "name" : "fifteen", "age" : 15, "gender" : "f", "Array ID": "015" },
      { "name" : "sixteen", "age" : 16, "gender" : "m", "Array ID": "016" },
      { "name" : "seventeen", "age" : 17, "gender" : "f", "Array ID": "017" },
      { "name" : "eighteen", "age" : 18, "gender" : "m", "Array ID": "018" },
      { "name" : "nineteen", "age" : 19, "gender" : "f", "Array ID": "019" },
      { "name" : "eighteen_two", "age" : 18, "gender" : "m", "Array ID": "018_2" }
    ] , function(err, res) {
      if (err) throw err;
      console.log("successfully inserted 20 test entries");
    });
    client.close();
  })
})

app.get("/point", function(req, res) {
  console.log("start finding data points");
  var xgene = req.query.x_gene;
  var ygene = req.query.y_gene;
  
  var target_name = req.query.name;
  var target_age = req.query.age;
  var target_gender = req.query.gender;
  console.log("querying:  name: " + target_name + ", age: " + target_age + ", gender: " + target_gender);
  MongoClient.connect(url, function(err, client) {
    if (err) throw err;
    console.log("connected to mongodb: querying");
    var db = client.db(dbname);

    // building query
    var q = {};
    q["$and"] = [];
    if (target_name != undefined) {
      q["$and"].push({name : target_name});
    }
    if (target_age != undefined) {
      q["$and"].push({age: Number(target_age)});
    }
    if(target_gender == -1) {
      q["$and"].push({gender: "f"});
    }
    else if (target_gender == 1) {
      q["$and"].push({gender: "m"});
    }
    console.log(q);
    var ids = {};
    ids["$or"] = [];

    db.collection("testdata").find(q).toArray(function(err, result) {
    //db.collection("sample_annotations").find(q).toArray(function(err, result) {
      if (err) throw err;
      res.write("<h3>query results</h3>");
      if (result.length > 0) {
        console.log("valid query: " + result.length);
        for (var n = 0; n < result.length; n++) {
          ids["$or"].push({"Probe ID": result[n]["Array ID"]});
          var key = Object.keys(result[n]);
          for (var i = 1; i < key.length; i++) {
            res.write("<p><b>" + key[i] + ":</b> " + result[n][key[i]] + "</p>");
          }
          res.write("<br>");
        }
        console.log("query successfully returned: ");
        console.log(result);
      }
      else {
        console.log("invalid");
        res.write("zero entries matched.");
      }
      res.write("</body></html>");
      //res.send(result[0][0]);
    });
    
    var points = {};
    db.collections("exprtable").find(ids).toArray(funtion(err, result) {
      for(var i = 0; i < result.length; i++) {
        
  )}

app.get("/userquery", function(req, res) {
  console.log("reading in queries: " + req.query);
  res.write("<!DOCTYPE html><html><body style='text-align:center'>");
  var target_name = req.query.name;
  var target_age = req.query.age;
  var target_gender = req.query.gender;
  console.log("querying:  name: " + target_name + ", age: " + target_age + ", gender: " + target_gender);
  MongoClient.connect(url, function(err, client) {
    if (err) throw err;
    console.log("connected to mongodb: querying");
    var db = client.db(dbname);

    // building query
    var q = {};
    q["$and"] = [];
    if (target_name != undefined) {
      q["$and"].push({name : target_name});
    }
    if (target_age != undefined) {
      q["$and"].push({age: Number(target_age)});
    }
    if(target_gender == -1) {
      q["$and"].push({gender: "f"});
    }
    else if (target_gender == 1) {
      q["$and"].push({gender: "m"});
    }
    console.log(q);
    var ids = {};
    ids["$or"] = [];

    db.collection("testdata").find(q).toArray(function(err, result) {
    //db.collection("sample_annotations").find(q).toArray(function(err, result) {
      if (err) throw err;
      res.write("<h3>query results</h3>");
      if (result.length > 0) {
        console.log("valid query: " + result.length);
        for (var n = 0; n < result.length; n++) {
          ids["$or"].push({"Probe ID": result[n]["Array ID"]});
          var key = Object.keys(result[n]);
          for (var i = 1; i < key.length; i++) {
            res.write("<p><b>" + key[i] + ":</b> " + result[n][key[i]] + "</p>");
          }
          res.write("<br>");
        }
        console.log("query successfully returned: ");
        console.log(result);
      }
      else {
        console.log("invalid");
        res.write("zero entries matched.");
      }
      res.write("</body></html>");
      //res.send(result[0][0]);
    });

    // using gsm ids to search other database
    db.collections("exprtable").find(ids).toArray(funtion(err, result) {
      if(err) throw err;
      console.log(result);
      var objlength = result.length;
      var keys = Object.keys(result[0]);
      var keylength = keys.length;
      
      var sdarr = [];
      for(var i = 0; i < keylength; i++) {
        var avg = 0;
        for(var j = 0; j < objlength; j++) {
          avg = avg + result[j][keys[i]];
        }
        avg = avg / objlength;
        var sumsq = 0;
        for(var k = 0; k < objlength; k++) {
          sumsq = sumsq + Math.pow(result[k][keys[i]] - avg, 2);
        }
        var sd = 1 / objlength * Math.sqrt(sumsq);
        sdarr.push([{Name: keys[i], SD: sd});
      }
      sdarr.sort(function(a, b) {
          return a.SD - b.SD;
      });
      console.log(sdarr);
      res.send(sdarr);
    });
    client.close();
  });
})

/*
app.get("/url", function(req, res) {
  console.log("reading in queries");
  var id = req.body.GSE_ID;
  var cancer_type = req.body.Cancer_Type;
  var gender = req.body.Gender;
  console.log("id: " + id + ", cancer type: " + cancer_type + ", gender: " + gender);
  MongoClient.connect(url, function(err, client) {
    if (err) throw err;
    console.log("connected to mongodb: querying");
    var db = client.db(dbname);
    // building query
    var q = {};
    q["$and"] = [];
    if (id.length > 0) {
      q["$and"].push({GSE_ID : id});
    }
    if (cancer_type == -1) {
      q["$and"].push({Cancer_Type: "Metastasis"});
    }
    else if (cancer_type == 1) {
      q["$and"].push({Cancer_Type: "Primary"});
    }
    if(gender == -1) {
      q["$and"].push({Gender: "Female"});
    }
    else if (gender == 1) {
      q["$and"].push({Gender: "Male"});
    }
    db.collection("collection name").find(q).toArray(function(err, resit) {
      if (err) throw err;
    });
  })
})
app.get("/filter", function(req, res) {
  var key = req.body.q_key;
  var val = req.body.q_value;
  console.log("key: " + key);
  console.log("value: " + val);
  MongoClient.connect(url, function(err, client) {
    if (err) {
      console.log("error in db connection");
      throw err;
    }
    console.log("connected to mongodb: getting data");
    var db = client.db(dbname);
    // build query string
    db.collection("testdata").find({"age": {$gt:10} }).toArray(function(err, result) {
      if (err) throw err;
      var str = "";
      if (result) {
        for (var n = 0; n < result.length; n++) {
          var key = Object.keys(result[n]);
          for (var i = 1; i < key.length; i++) {
            str += "<p><b>" + key[i] + ":</b> " + result[n][key[i]] + "</p>";
          }
          str += "<br>";
        }
      }
      else {
        str = "zero entries matched.";
      }
      // updating html page
      doc.getElementById('results').innerHTML = str;
      res.end();
    });
    client.close();
  });
});*/
/*
app.post("/submitinput", function(req, res) {
  console.log("storing form data in database");
  var u_name = req.body.u_name;
  var u_age = req.body.u_age;
  var data = { name: u_name, age: u_age };
  console.log("name: " + u_name);
  console.log("age: " + u_age);
  res.status(200).send("your name is " + u_name + " and your age is " + u_age)
  // database connection
  MongoClient.connect(url, function(err, client) {
    if (err) {
      console.log("error in db connection");
      throw err;
    }
    console.log("connected to mongodb: submit input");
    var db = client.db(dbname);
    // insert user ingo into users collection
    db.collection("users").insertOne(data, function(err, res) {
      if (err)
        throw err;
      console.log("info successfully inserted");
    });
    client.close();
  });
});
app.post("/submitfetch", function(req, res) {
  console.log("fetching age from database");
  var u_name = req.body.u_name;
  console.log("getting " + u_name + "'s age...");
  MongoClient.connect(url, function(err, client) {
    if (err) {
      console.log("error in db connection");
      throw err;
    }
    console.log("connected to mongodb: fetching age");
    var db = client.db(dbname);
    // find user, get age
    db.collection("users").findOne({name: u_name}).then(function (userAge) {
      if (userAge) {
        console.log(userAge);
        res.send(u_name + "'s age is " + userAge.age);
      } else {
        res.send("invalid");
      }
    })
  })
})
app.get("/invalid", function(req, res) {
  res.send("name not found, no matching age.");
})
*/
app.listen(8080, function() {
  console.log("opened port");
});
