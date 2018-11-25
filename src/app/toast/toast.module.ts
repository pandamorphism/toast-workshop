import {OverlayModule} from '@angular/cdk/overlay';
import {PortalModule} from '@angular/cdk/portal';
import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {MatIconModule} from '@angular/material';
import {defaultToastConfig} from './model/defaults';
import {TOAST_CONFIG} from './model/toast-model';
import {ToastComponent} from './view/toast.component';


@NgModule({
  declarations: [ToastComponent],
  entryComponents: [ToastComponent],
  imports: [
    CommonModule,
    OverlayModule,
    MatIconModule,
    PortalModule
  ]
})
export class ToastModule {
  static forRoot(config = defaultToastConfig): ModuleWithProviders {
    return {
      ngModule: ToastModule,
      providers: [
        {
          provide: TOAST_CONFIG,
          useValue: {...defaultToastConfig, ...config}
        }
      ]
    };
  }
}
