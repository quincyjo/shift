import { ProjectSchema, CommentSchema } from './schemas';

import mongodb = require('mongodb');
import mongoose = require('mongoose');
let MongoClient = mongodb.MongoClient;
let Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const url = 'mongodb://localhost:27017/myproject';

let Project;
let Comment;

export class DatabaseManager {
  private _mongoose;

  constructor() {
    mongoose.connect(url);
    Project = mongoose.model('Projects', ProjectSchema);
    Comment = mongoose.model('Comments', CommentSchema);
  }

  public getProjects(): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      Project.find({'_active': true}, (error, projects) => {
        if (!error) {
          resolve(projects);
        } else {
          reject(error);
        }
      });
    });
    return promise;
  }

  public getProject(id: string): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      Project.findById(id, (error, bear) => {
        if (!error) {
          resolve(bear);
        } else {
          reject(error);
        }
      });
    });
    return promise;
  }

  public insertProject(project: any): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      let projectInstance = new Project(project);
      for (let key of Object.keys(projectInstance)) {
        if (project[key]) {
          projectInstance[key] = project[key];
        }
      }
      projectInstance.save((error) => {
        if (!error) {
          resolve(projectInstance);
        } else {
          reject(error);
        }
      });
    });
    return promise;
  }
}
