import { Component, OnInit } from '@angular/core';
import { ProjectProvider } from '../../services';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'sh-project-detail',
  templateUrl: './project-detail.route.html',
  styleUrls: ['./project-detail.route.scss']
})
export class ProjectDetailRoute implements OnInit {
  public project;
  public ready: boolean;
  public revealEmail: boolean = false;

  constructor(private _projectProvider: ProjectProvider,
              private _route: ActivatedRoute,
              private _router: Router) {
                this.project = {};
              }

  public ngOnInit(): void {
    this._route.params.subscribe((params) => {
      let id = params['id'];
      this._projectProvider.getProject(id)
      .subscribe((project) => {
        this.project = project;
        this.ready = true;
      });
    });
  }

  public showEmail(): void {
    this.revealEmail = true;
  }
}
