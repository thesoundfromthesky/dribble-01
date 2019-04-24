import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { SlideState, slide } from "src/app/shared/animation";
import { OuterSubscriber } from "rxjs/internal/OuterSubscriber";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.scss"],
  animations: [slide]
})
export class NavComponent implements OnInit {
  private _slideState: SlideState = "in";
  get slideState(): SlideState {
    return this._slideState;
  }
  set slideState(value: SlideState) {
    this._slideState = value;
  }

  private _isMobile: boolean;
  get isMobile() {
    return this._isMobile;
  }
  set isMobile(value: boolean) {
    this._isMobile = value;
    this.calibrateSlide();
  }
  constructor() {}

  ngOnInit() {}

  @Output() onActivate: EventEmitter<boolean> = new EventEmitter<boolean>();
  toggleSlide(): void {
    if (this.isMobile) {
      if (this.slideState === "in") {
        this.slideState = "out";
        this.onActivate.emit(true);
      } else {
        this.slideState = "in";
        this.onActivate.emit(false);
      }
    }
  }

  calibrateSlide(): void {
    if (!this.isMobile) this.slideState = "out";
    else this.slideState = "init";
  }

  animEnd(e): void {
    if (e.toState === "init" && this.isMobile) this.slideState = "in";
  }
}
