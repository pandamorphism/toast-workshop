// tslint:disable: interface-over-type-literal

import {InjectionToken, TemplateRef} from '@angular/core';
import {ToastRef} from './toast-ref';

export const TOAST_DATA = new InjectionToken<ToastData>('toast_data');
export const TOAST_REF = new InjectionToken<ToastRef>('toast_ref');
export const TOAST_CONFIG = new InjectionToken<ToastConfig>('toast_config');
export type ToastData = {
  text: string;
  type: ToastType;
  template?: TemplateRef<any>;
  templateContext?: any;
};
export type ToastType = 'warning' | 'info' | 'success';


export type ToastConfig = {
  position?: {
    top: number
    right: number
  },
  animation?: {
    fadeOut: number;
    fadeIn: number;
  }
};
