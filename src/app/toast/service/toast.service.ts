import {Overlay} from '@angular/cdk/overlay';
import {ComponentPortal, PortalInjector} from '@angular/cdk/portal';
import {Injectable, Injector} from '@angular/core';
import {TOAST_DATA, TOAST_REF, ToastData} from '../model/toast-model';
import {ToastRef} from '../model/toast-ref';
import {ToastComponent} from '../view/toast.component';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private lastToast: ToastRef;

  constructor(private overlay: Overlay, private parentInjector: Injector) {
  }

  static createInjector(data: Partial<ToastData>, toastRef: ToastRef, parentInjector: Injector) {
    const tokens = new WeakMap();
    tokens.set(TOAST_DATA, data);
    tokens.set(TOAST_REF, toastRef);
    return new PortalInjector(parentInjector, tokens);
  }

  show(toastData: Partial<ToastData>): ToastRef {
    let overlayRef;

    const positionStrategy = this.overlay
      .position()
      .global()
      .right()
      .top(this.getPosition());
    overlayRef = this.overlay.create({positionStrategy});

    const toastRef = new ToastRef(overlayRef);
    const injector = ToastService.createInjector(toastData, toastRef, this.parentInjector);
    const toastPortal = new ComponentPortal(ToastComponent, null, injector);
    overlayRef.attach(toastPortal);
    this.lastToast = toastRef;
    return toastRef;
  }

  private getPosition(): string {
    return `${this.lastToast && this.lastToast.isLive() && this.lastToast.getPosition().bottom || 0}px`;
  }

}
