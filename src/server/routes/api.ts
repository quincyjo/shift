import express = require('express');
import { ProjectSchema, CommentSchema } from '../managers/schemas';
let router = express.Router();

/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api works');
});

router.get('/projects', (req, res) => {
  console.log("GET to /api/projects");
  let manager = req.app.locals.databaseManager;
  let query = req.query;
  console.log(query);
  manager.getProjects()
  .then((projects) => {
    res.send(projects);
  })
  .catch((error) => {
    res.send(error);
  });
});

router.post('/projects', (req, res) => {
  console.log("POST to /api/projects");
  let manager = req.app.locals.databaseManager;
  console.log(req.body);
  manager.insertProject(req.body)
  .then((project) => {
    res.send(project);
  })
  .catch((error) => {
    res.send(error);
  });
});

router.get('/projects/:id', (req, res) => {
  console.log("GET to /api/projects/:id");
  let manager = req.app.locals.databaseManager;
  let id = req.params.id;
  manager.getProject(id)
  .then((project) => {
    res.send(project);
  })
  .catch((error) => {
    res.send(error);
  });
});

module.exports = router;
