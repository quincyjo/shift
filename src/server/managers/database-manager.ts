import { ProjectSchema, CommentSchema, ValidationSchema } from './schemas';

import mongodb = require('mongodb');
import mongoose = require('mongoose');
let MongoClient = mongodb.MongoClient;
let Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

const url = 'mongodb://localhost:27017/myproject';

let Project,
    Validation,
    Comment;

export class DatabaseManager {
  private _mongoose;

  constructor() {
    mongoose.connect(url);
    Project = mongoose.model('Projects', ProjectSchema);
    Comment = mongoose.model('Comments', CommentSchema);
    Validation = mongoose.model('Validation', ValidationSchema);
  }

  public getProjects(query = { '_active' : true }): Promise<any> {
    if (!query._active) {
      query._active = true;
    }
    let promise = new Promise((resolve, reject) => {
      Project.find(query, (error, projects) => {
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
      Project.findById(id, (error, project) => {
        if (!error) {
          resolve(project);
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
          this._createValidationKey(projectInstance)
          .then((vid) => {
            console.log('Verification ID:');
            console.log(vid);
            resolve(projectInstance);
          })
          .catch((error) => {
            reject(error);
          })
        } else {
          reject(error);
        }
      });
    });
    return promise;
  }

  public verify(vid: string): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      Validation.findById(vid, (error, validation) => {
        if (!error) {
          this._validate(validation.project)
          .then((project) => {
            Validation.findByIdAndRemove(vid, (error) => {
              if (!error) {
                resolve(project);
              } else {
                reject(error);
              }
            });
          })
          .catch((error) => {
            reject(error);
          })
        } else {
          console.log('Failed to find validation entry: ', error);
          reject(error);
        }
      });
    });
    return promise;
  }

  private _validate(id: string): Promise<any> {
    let promise = new Promise((resolve, reject) => {
      this.getProject(id)
      .then((project) => {
        project._active = true;
        project.save((error) => {
          if (!error) {
            resolve(project);
          } else {
            reject(error);
          }
        })
      })
      .catch((error) => {
        console.log(error);
        reject(error);
      })
    });
    return promise;
  }

  private _createValidationKey(project: any): Promise<string> {
    let promise = new Promise((resolve, reject) => {
      let validationInstance = new Validation();
      validationInstance.email = project.email;
      validationInstance.project = project._id;
      validationInstance.save((error) => {
        if (!error) {
          resolve(validationInstance._id);
        } else {
          reject(error);
        }
      });
    });
    return promise;
  }
}
