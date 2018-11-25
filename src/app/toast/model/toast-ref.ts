import {OverlayRef} from '@angular/cdk/overlay';

export class ToastRef {
  private isDead = false;

  constructor(private readonly overlay: OverlayRef) {
  }

  close() {
    this.overlay.dispose();
    this.isDead = true;
  }

  isLive(): boolean {
    return !this.isDead;
  }

  getPosition(): ClientRect | DOMRect {
    return this.overlay.overlayElement.getBoundingClientRect();
  }
}
