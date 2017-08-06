import { Pipe, PipeTransform } from '@angular/core';
import { Project } from '../services/project-provider/project-provider.service';

@Pipe({
  name: 'sortByText'
})
export class SortByTextPipe implements PipeTransform {
  public transform(projects: Array<Project>, text: string): Array<Project> {
    if (!text) {
      return projects;
    }
    let list = [];
    let lowercaseText: string = text.toLowerCase();
    let attrs = ['title', 'description', 'author', 'institution'];
    for (let project of projects) {
      for (let attr of attrs) {
        if (this.checkAttr(project[attr], lowercaseText)) {
          list.push(project);
          break;
        }
      }
    }
    return list;
  }

  public checkAttr(attribute: any, search: string): boolean {
    let terms = search.split(' ');
    if (typeof attribute === "string") {
      for (let term of terms) {
        return (attribute.toLowerCase().indexOf(term) !== -1);
      }
    } else if (Array.isArray(attribute)) {
      for (let elem of attribute) {
        for (let term of terms) {
          return (elem.toLowerCase().indexOf(term) !== -1);
        }
      }
    }
    return false;
  }
}
