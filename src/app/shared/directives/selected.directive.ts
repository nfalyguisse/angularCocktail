import { Directive, HostBinding, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appSelected]'
})
export class SelectedDirective implements OnChanges{
  @Input() public appSelected?: boolean;
  @HostBinding ('style.backgrounColor') private bgColor: string;
  @HostBinding ('style.fontWeight') private fontWeight: string;
  @HostBinding ('style.color') private color: string;


  
  ngOnChanges(changes: SimpleChanges): void {
    if(this.appSelected){
      this.bgColor = 'var(--primary)';
      this.fontWeight = 'bold';
      this.color = 'white'
    }else{
      this.bgColor = 'white';
      this.fontWeight = '400';
      this.color = 'var(--text-regular)';
    }
  }

  constructor() {
    this.appSelected = false;
    this.bgColor = 'white';
    this.fontWeight = '400';
    this.color = 'var(--text-regular)';
   }

}
