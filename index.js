const express = require('express');
const app = express();
const router = express.Router();
const port = 3000;
const connection = require('./conf.js')

app.use(express.json());
app.use(express.urlencoded());



router.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to my motorcycles page.</h1>
    <h4>To see the motorcycles in the database, change the url to /motorcycles</h4> 
    `)
});

// DELETE - Delete all entities where boolean value is false
router.delete('/del_false', (req, res) => {

  connection.query('DELETE FROM Motorcycles WHERE want_it=0', (err, result) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.sendStatus(200);
    }
  });
});




// ✓ DELETE - Delete an entity
router.delete('/del/:id', (req, res) => {
  const idMoto = req.params.id;

  connection.query(`DELETE FROM Motorcycles WHERE id = ?`, [idMoto], (err) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.sendStatus(200);
    }
  });
});




// ✓ PUT - Toggle a Boolean value
router.put('/want_it/:id', (req, res) => {
  const id = req.params.id;

  connection.query(`UPDATE Motorcycles SET want_it = !want_it WHERE id=?`, id, (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json(results);
    }
  });
});




// ✓ POST - Insertion of a new entity
router.post('/new', (req, res) => {
  const formData = req.body;
  console.log(formData);

  connection.query(`INSERT INTO Motorcycles SET ?`, formData, (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json(results);
    }
  });
});

// ✓ PUT - Modification of an entity
router.put('/update/:id', (req, res) => {
  const id = req.params.id;
  const formData = req.body;

  connection.query(`UPDATE Motorcycles Set ? WHERE id=?`, [formData, id], (err, results) => {
    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json(results);
    }
  })
})




// ✓ GET - Ordered data recovery (i.e. ascending, descending) - The order should be passed as a route parameter
router.get('/motorcycles/order/:col', (req, res) => {
  const col = req.params.col;
  console.log(col);

  connection.query(`SELECT * FROM Motorcycles ORDER BY ${col} `, (err, result) => {

    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json(result);
    }
  });
});


// ✓ GET - Retrieve a data set with the following filters (use one route per filter type):
// ✓     - A filter for data that is greater than... (e.g. date greater than 18/10/2010)
// and
// ✓ GET - Retrieve all of the data from your table
router.get('/motorcycles', (req, res) => {
  const weightLimit = req.query.max_weight;

  if (weightLimit) {
    connection.query(`SELECT * FROM Motorcycles WHERE weight_kg <= ?`, weightLimit, (err, result) => {
      if (err) {
        res.status(500).json({ error: err });
      } else {
        res.json(result);
      }
    })
  } else {
    connection.query('SELECT * FROM motorcycles', (err, result) => {
      if (err) {
        res.status(500).json(err);
      } else {
        res.json(result);
      }
    });
  }
});



// ✓ GET - Retrieve specific fields (i.e. id, names, dates, etc.)
router.get('/motorcycles/production_date', (req, res) => {
  connection.query('SELECT name, production_date FROM Motorcycles', (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(result);
    }
  });
});


// ✓ GET - Retrieve specific fields (i.e. id, names, dates, etc.)
router.get('/motorcycles/weight', (req, res) => {
  connection.query('SELECT name, weight_kg FROM Motorcycles', (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(result);
    }
  });
});


// ✓ GET - Retrieve a data set with the following filters (use one route per filter type):
// ✓     - A filter for data that starts with... (e.g. name beginning with 'campus')
//      --> (Choose from Honda, Triumph, Kawasaki, Royal, BMW)
router.get('/motorcycles/starts_with/:make', (req, res) => {
  const make = req.params.make;
  connection.query(`SELECT * FROM Motorcycles WHERE name LIKE "${make}%"`, (err, result) => {
    if (err) {
      res.status(500).json(err);
    } else {
      res.json(result);
    }
  });
});


// ✓ GET - Retrieve a data set with the following filters (use one route per filter type):
// ✓     - A filter for data that contains... (e.g. name containing the string 'wcs')
router.get('/motorcycles/:column/:str', (req, res) => {
  const str = req.params.str;
  const column = req.params.column;

  connection.query(`SELECT * FROM Motorcycles WHERE ${column} LIKE "${str}%"`, (err, result) => {

    if (err) {
      res.status(500).json({ error: err });
    } else {
      res.json(result);
    }
  });
});













app.use('/', router);
app.listen(port, (err) => {
  if (err) {
    throw new Error('Something bad happened....');
  }
  console.log(`Server is listening on ${port}`);
})


// ----------------------------------------------------------------











// DELETE - Delete all entities where boolean value is false