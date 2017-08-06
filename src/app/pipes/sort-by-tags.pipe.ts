import { Pipe, PipeTransform } from '@angular/core';
import { Project } from '../services/project-provider/project-provider.service';

@Pipe({
  name: 'sortByTags'
})
export class SortByTagsPipe implements PipeTransform {
  public transform(projects: Array<Project>, tags: Array<string>): Array<Project> {
    if (tags.length === 0) {
      return projects;
    } else {
      let list = [];
      let valid: boolean;
      for (let project of  projects) {
        valid = true;
        for (let tag of tags) {
          if (!project.tags.includes(tag)) {
            valid = false;
            break;
          }
        }
        if (valid) {
          list.push(project);
        }
      }
      return list;
    }
  }
}
