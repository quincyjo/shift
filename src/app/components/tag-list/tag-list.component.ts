import { Component, Input } from '@angular/core';
import { ProjectProvider } from '../../services';

@Component({
  selector: 'sh-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss']
})
export class TagListComponent {
  @Input() tags: Array<string>;

  constructor(private _projectProvider: ProjectProvider) { }

  public getColor(tag: string): string {
    return this._projectProvider.getTagColor(tag);
  }
}
