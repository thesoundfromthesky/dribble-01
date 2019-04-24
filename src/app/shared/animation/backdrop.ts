import {
  trigger,
  state,
  style,
  animate,
  transition,
  AnimationTriggerMetadata
} from "@angular/animations";

export type BackdropState = "on" | "off";
const backdropToggle = (fromState: string, toState: string): boolean => {
  console.log(fromState);
  console.log(toState);
  return true;
};
export const backdrop: AnimationTriggerMetadata = trigger("backdrop", [
  state(
    "on",
    style({
      opacity: 0.7,
      background: "#1d0a0ab0",
      filter: "blur(.1em)"
    })
  ),
  state(
    "off",
    style({
      filter: "none",
      opacity: 1,
      background: "transparent"
    })
  ),
  //   transition("on <=> off", [animate(".5s ease-in-out")])
  transition("on <=> off", [animate(".5s ease-in-out")])
]);
