import {CUSTOM_ELEMENTS_SCHEMA, NgModule, Optional, SkipSelf} from '@angular/core';
import { CommonModule } from '@angular/common';

// declarations and exports should be the same (=what this modules export when it is imported in another module)
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [

  ],
  exports: [

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule {
  constructor(@Optional() @SkipSelf() parentModule: SharedModule) {
    if (parentModule) {
      throw new Error('SharedModule is already loaded. Import it in the AppModule only.');
    }
  }
}
