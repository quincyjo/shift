import { Component, OnInit, DoCheck } from '@angular/core';
import { ProjectProvider } from '../../services';
import { SortByTagsPipe, SortByTextPipe } from '../../pipes';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/add/operator/map';


@Component({
  selector: 'sh-projects',
  templateUrl: './projects.route.html',
  styleUrls: ['./projects.route.scss']
})
export class ProjectsRoute implements OnInit, DoCheck {
  public projects: Array<any>;
  public tags: Array<string>;
  public filterTags: Object;
  public searchText: string;
  public oldSearchText: string;
  public ready: boolean;

  constructor(private _projectProvider: ProjectProvider,
              private _router: Router,
              private _route: ActivatedRoute,
              private _location: Location) {
    this.projects = [];
    this.tags = [];
    this.filterTags = {};
  }

  public ngOnInit(): void {
    this._projectProvider.getProjects()
    .then((projects) => {
      this.projects = projects;
      this.tags = this._projectProvider.getTags();
      this.ready = true;
    });
    this._route.params.subscribe((params) => {
      if (params['search']) {
        this.searchText = params['search'];
      }
      if (params['tags']) {
        for (let tag of params['tags'].split(',')) {
          this.filterTags[tag] = true;
        }
      }
    });
  }

  public ngDoCheck(): void {
    if (this.searchText !== this.oldSearchText) {
      this.onChange();
      this.oldSearchText = this.searchText;
    }
  }

  public getColor(tag: string): string {
    return this._projectProvider.getTagColor(tag);
  }

  public onChange(): void {
    let route = '/projects';
    let search = this.searchText || '';
    if (search) {
      route += ';search=' + search;
    }
    let tags = this.getFilterTags();
    if (tags.length > 0) {
      route += ';tags=' + tags.join(',');
    }
    this._location.replaceState(route);
  }

  public getFilterTags(): Array<string> {
    let tags = [];
    for (let tag of this.tags) {
      if (this.filterTags[tag]) {
        tags.push(tag);
      }
    }
    return tags;
  }

  public navigateToProjectDetail(project): void {
    let path = '/projects/';
    path += project._id;
    this._router.navigate([path]);
  }
}
