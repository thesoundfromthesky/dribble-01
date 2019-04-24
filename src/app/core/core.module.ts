import {
  NgModule,
  Optional,
  SkipSelf,
  ModuleWithProviders
} from "@angular/core";
import { CommonModule } from "@angular/common";

import { CoreRoutingModule } from "./core-routing.module";
import { WINDOW_PROVIDERS } from "./window.service";

@NgModule({
  declarations: [],
  imports: [CommonModule, CoreRoutingModule]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        "CoreModule is already loaded. Import it in the AppModule only"
      );
    }
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [WINDOW_PROVIDERS]
    };
  }
}
