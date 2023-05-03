import { Component, ElementRef } from '@angular/core';

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.css'],
})
export class DragDropComponent {
  el = new ElementRef(document.getElementById("example-box"));
  dragPosition = {x: 0, y: 0};
  changePosition() {
    console.log("aaa");
    if (this.el.nativeElement != null){
      console.log("aaaaaaaa");
      this.el.nativeElement.style.transform = `translate(${this.dragPosition.x}px, ${this.dragPosition.y}px)`;
    }
    
  }
}
