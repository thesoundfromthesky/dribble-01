import { Component } from "@angular/core";

import { backdrop, BackdropState } from "./shared/animation";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  animations: [backdrop]
})
export class AppComponent {
  backdropState: BackdropState = "off";
  isMobile: boolean;

  toggleBackdrop(isOn: boolean): void {
    if (isOn) this.backdropState = "on";
    else this.backdropState = "off";
  }

  calibrateAnim(isMobile: boolean): void {
    this.isMobile = isMobile;
    if(!isMobile){
      this.backdropState = "off";
    }
  }
}
