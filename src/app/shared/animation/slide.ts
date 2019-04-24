import {
  trigger,
  state,
  style,
  animate,
  transition,
  AnimationTriggerMetadata
} from "@angular/animations";

export type SlideState = "in" | "out" | "init";
export const slide: AnimationTriggerMetadata = trigger("animation", [
  state(
    "init",
    style({
      opacity: 0,
      visibility: "hidden",
      transform: "translateY(-5%)"
    })
  ),
  state(
    "in",
    style({
      opacity: 0,
      visibility: "hidden",
      transform: "translateY(-5%)"
    })
  ),
  state(
    "out",
    style({
      opacity: 1,
      visibility: "visible",
      transform: "translateY(0)"
    })
  ),
  transition("out => init", [animate("0s")]),
  transition("in <=> out", [animate(".5s ease-in-out")])
]);
