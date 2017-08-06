import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProjectProvider } from '../../services';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'tag-input-component',
  templateUrl: './tag-input.component.html',
  styleUrls: ['./tag-input.component.scss']
})
export class TagInputComponent implements OnInit {
  @Input() public tags: Array<string>;
  @Output() public tagAdded: EventEmitter<string> = new EventEmitter();
  public control;
  public filteredOptions: Observable<string[]>;
  public model;
  public options: Array<string>;

  constructor(private _projectProvider: ProjectProvider) {
    this.control = new FormControl();
    this.model = { input: ''};
    this.tags = [];
  }

  public ngOnInit(): void {
    this.options = this._projectProvider.getTags()
  }

  public filter(val: string): string[] {
    return this.options.filter(option => new RegExp(`^${val}`, 'gi').test(option));
  }

  public getFilteredOptions(): Array<string> {
    let options = [];
    for (let option of this.options) {
      if (this.model.input && option.toLowerCase().indexOf(this.model.input) !== -1) {
        options.push(option);
      }
    }
    return options;
  }

  public addTag(tag: string): void {
    this.tags.push(tag);
  }

  public removeTag(index: number): void {
    this.tags.splice(index, 1);
  }

  public log(e) {
    console.log(e);
  }

  public onEnter(): void {
    if (this.model.input.trim()) {
      this.addTag(this.model.input.slice(0,-1).trim());
      this.model.input = "";
    }
  }

  public onBackspace(): void {
    if (!this.model.input) {
      this.tags.pop();
    }
  }
}
