import {
  Directive,
  HostListener,
  Inject,
  Output,
  EventEmitter,
  OnInit
} from "@angular/core";

import { DOCUMENT } from "@angular/common";

import { WINDOW } from "src/app/core";

@Directive({
  selector: "[appResize]"
})
export class ResizeDirective implements OnInit {
  // mapCssVar contains all the break points
  private _cssVars: Map<string, string> = new Map<string, string>();
  get cssVars(): Map<string, string> {
    return this._cssVars;
  }

  @Output() isMobile: EventEmitter<boolean> = new EventEmitter<boolean>();

  // console.log(
  //   e.currentTarget["getComputedStyle"](
  //     document.documentElement
  //   ).getPropertyValue("--breakpoint-desktop-4k")
  // );
  @HostListener("window:resize", ["$event"])
  onResize(e: Event): void {
    this.evalWindowSize(e.currentTarget as Window);
  }

  // https://stackoverflow.com/questions/37521298/how-to-inject-document-in-angular-2-service
  constructor(
    @Inject(DOCUMENT) private d: Document,
    @Inject(WINDOW) private w: Window
  ) {
    this.initMapCssVar();
  }

  ngOnInit(): void {
    this.initIsMobile();
  }

  initMapCssVar(): void {
    const cssRules: CSSRuleList = this.d.styleSheets[0]["cssRules"];
    const l: number = cssRules.length;
    for (let i: number = 0; i < l; ++i) {
      if (cssRules[i]["selectorText"] === ":root") {
        const cssVars: string[] = cssRules[i].cssText.split("; ");
        cssVars.forEach((cssVar: string) => {
          if (cssVar.includes("--breakpoint")) {
            const [key, value]: string[] = cssVar.split(": ");
            this.cssVars.set(key, value);
          }
        });
      }
    }
  }

  evalWindowSize(w: Window): void {
    if (
      Number.parseInt(this.cssVars.get("--breakpoint-laptop-L")) <= w.innerWidth
    )
      this.isMobile.emit(false);
    else this.isMobile.emit(true);
  }

  initIsMobile(): void {
    this.evalWindowSize(this.w);
  }

  // from https://davidwalsh.name/css-variables-javascript
  // cssVar(name: string, value: string): string {
  //   if (name[0] !== "-") name = `--${name}`;
  //   if (value) document.documentElement.style.setProperty(name, value);
  //   return getComputedStyle(document.documentElement).getPropertyValue(name);
  // }
}
