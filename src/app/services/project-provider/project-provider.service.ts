import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';

@Injectable()
export class ProjectProvider {
  public projects: Array<Project>;
  public tags: Object;
  public endpoint: string;
  public projectEndpoint: string;

  constructor(private _http: Http) {
    this.endpoint = "/api";
    this.projectEndpoint = '/projects';
    this.tags = {};
    this.getProjectsByTitle('Shift').subscribe((res) => console.log(res));
  }

  public getProjects(): Promise<Array<Project>> {
    let promise = new Promise((resolve, reject) => {
      if (!this.projects) {
        this._fetchProjects()
        .subscribe((projects) => {
          this.projects = projects;
          this._buildTags();
          resolve(this.projects);
        });
      } else {
        resolve(this.projects);
      }
    });
    return promise;
  }

  public getProjectsByTitle(title: string): Observable<Array<Project>> {
    let url = this._buildPath(this.endpoint, this.projectEndpoint);
    let params = {
      title: title
    };
    return this._http.get(url, { params: params })
    .map((res) => {
      return res.json();
    })
    .catch((error) => {
      return Observable.of(error);
    });
  }

  public getProject(id: any): Observable<Project> {
    let url = this._buildPath(this.endpoint, this.projectEndpoint, id);
    return this._http.get(url)
    .map((res) => {
      return res.json();
    })
    .catch((error) => {
      return Observable.of(error);
    });
  }

  public getTags(): Array<string> {
    return Object.keys(this.tags);
  }

  public getTagColor(tag: string): string {
    if (this.tags[tag]) {
      return this.tags[tag];
    } else {
      return 'hsl(194, 52%, 47%)';
    }
  }

  public pushProject(project: Project): Observable<any> {
    console.log("Pushing project to server");
    let url = this.endpoint + this.projectEndpoint;
    project.author = project['firstName'] + ' ' + project['lastName'];
    let body = JSON.stringify(project);
    let headers = new Headers({ 'content-type': 'application/json'});
    let options = new RequestOptions({ 'headers': headers });

    return this._http.post(url, body, options)
    .map((res) => {
      return res.json();
    })
    .catch((error) => {
      return Observable.of(error);
    });
  }

  private _buildPath(...args: any[]): string {
    return args.join('/');
  }

  private _pushTags(project: Project): void {
    for (let tag of project.tags) {
      this._insertTag(tag);
    }
  }

  private _insertTag(tag: string): boolean {
    if (!this.tags[tag]) {
      this.tags[tag] = this._getColor();
      return true;
    } else {
      return false;
    }
  }

  private _fetchProjects(): Observable<Array<Project>> {
    let url = this._buildPath(this.endpoint, this.projectEndpoint);
    return this._http.get(url)
    .map((res) => {
      return res.json();
    })
    .catch((error) => {
      return Observable.of(error);
    });
  }

  private _buildTags(): void {
    for (let project of this.projects) {
      this._pushTags(project);
    }
  }

  public colorHue = 0;
  private _getColor(): string {
    let hue = this.colorHue;
    this.colorHue = (this.colorHue + 47) % 359;
    let color = 'hsl(' + hue + ', 60%, 60%)';
    return color;
  }
}

export class Project {
  title = '';
  author = '';
  email = '';
  institution = '';
  shortDescription = '';
  description = '';
  date = new Date();
  tags = [];
  references = [];
  comments = [];
}

export type Comment = {
  name: string,
  date: Date
  buff: string
}
