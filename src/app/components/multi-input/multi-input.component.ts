import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'sh-multi-input',
  templateUrl: './multi-input.component.html',
  styleUrls: ['./multi-input.component.scss']
})
export class MultiInputComponent {
  @Input() type: string = 'text';
  @Input() public ph: string = '';
  @Input() public items: Array<any> = [];
  public value: any;

  constructor() {
    this.items = [];
  }

  ngOnInit() {
    console.log(this.ph);
  }

  public addItem(): void {
    if (this._validate()) {
      this.items.push(this.value);
      this.value = '';
    }
  }

  public removeItem(index: number): void {
      this.items.splice(index, 1);
  }

  private _validate(): boolean {
    return (this.value
      && !this.items.includes(this.value.trim())
      && this.value.trim());
  }
}
