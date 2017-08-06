import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProjectProvider } from '../../services';
import { Project } from '../../services/project-provider/project-provider.service';

@Component({
  selector: 'sh-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent {
  @Input() public projects: Array<Project> = [];
  @Input() public interactable: boolean = true;
  @Output() public projectClicked: EventEmitter<Project>;

  constructor(private _projectProvider: ProjectProvider) {
    this.projectClicked = new EventEmitter();
  }

  public onProjectClicked(event: any): void {
    this.projectClicked.emit(event);
  }

}
