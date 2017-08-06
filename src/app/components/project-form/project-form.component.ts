import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectProvider } from '../../services';
import { TagInputComponent } from '../../components';
import { Project } from '../../services/project-provider/project-provider.service';

@Component({
  selector: 'sh-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {
  public submitted: boolean = false;
  public complete: boolean = false;
  public model: Object;
  public preview: boolean = false;
  public projectForm: FormGroup;
  public project: Project;

  constructor(private _projectsService: ProjectProvider,
              private _router: Router) {
    this.model = {};
    this.model['tags'] = [];
    this.model['references'] = [];
    this.project = new Project();
  }

  public ngOnInit(): void {
    // this.projectForm = new FormGroup({
    //   'title': new FormControl(
    //     this.project.title,
    //     [Validators.required]),
    //   'author': new FormControl(
    //     this.project.author,
    //     [Validators.required]),
    //   'email': new FormControl(
    //     this.project.email,
    //     // TODO: Add email validator
    //     [Validators.required]),
    //   'institution': new FormControl(
    //     this.project.institution),
    //   'shortDescription': new FormControl(
    //     this.project.shortDescription),
    //   'description': new FormControl(
    //     this.project.description),
    //   'tags': new FormControl(
    //     this.project.tags),
    //   'references': new FormControl(
    //     this.project.references),
    // });
  }

  // Form Getters
  // get title() { return this.projectForm.get('title') }
  // get author() { return this.projectForm.get('author') }
  // get email() { return this.projectForm.get('email') }
  // get institution() { return this.projectForm.get('institution') }
  // get shortDescription() { return this.projectForm.get('shortDescription') }
  // get description() { return this.projectForm.get('description') }
  // get tags() { return this.projectForm.get('tags') }
  // get references() { return this.projectForm.get('references') }

  public togglePreview(): boolean {
    this.preview = !this.preview;
    return this.preview;
  }

  public onSubmit(): void {
    this.submitted = true;
    let project = this.model;
    console.log(project);
    this._projectsService.pushProject(project as Project)
    .subscribe((res) => {
      this.complete = true;
      let path = '/projects/';
      path += res._id;
      this._router.navigate([path]);
    });
  }
}
