/* Copyright VMware, Inc. All rights reserved. VMware Confidential */
import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { NgxDragDropService } from './dragDrop.service';

@Directive({
             selector: '[ngxDraggable]'
           })
export class NgxDraggableDirective {
  public _isDraggable = false;

  constructor(private el: ElementRef, private dragDropService: NgxDragDropService) {
  }

  @Input()
  set ngxDraggable(dragEnabled) {
    const draggable = !!dragEnabled;
    this.el.nativeElement.setAttribute('draggable', draggable);
    this._isDraggable = draggable;
  }

  @Input()
  public ngxDragTag: string;

  @Input()
  public ngxDraggedClass: string;

  @Input()
  public ngxDragData: any;

  @HostListener('dragstart', ['$event'])
  onDragStart(event) {
    if (this.el.nativeElement === event.target) {
      event.target.classList.add(this.ngxDraggedClass);
      event.dataTransfer.setData('data', JSON.stringify({dd: this.ngxDragData}));
      if (this.ngxDragTag) {
        this.dragDropService.instanceName = this.ngxDragTag;
      } else {
        this.dragDropService.setDefaultInstance();
      }
    }
  }

  @HostListener('dragend', ['$event'])
  onDragEnd(event) {
    if (this.el.nativeElement === event.target) {
      event.target.classList.remove(this.ngxDraggedClass);
    }
  }
}