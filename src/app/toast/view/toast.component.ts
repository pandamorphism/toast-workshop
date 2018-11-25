import {AnimationEvent} from '@angular/animations';
import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {TOAST_CONFIG, TOAST_DATA, TOAST_REF, ToastConfig, ToastData} from '../model/toast-model';
import {ToastRef} from '../model/toast-ref';
import {toastAnimations, ToastAnimationState} from './animations';


@Component({
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  animations: [toastAnimations.fadeToast]
})
export class ToastComponent implements OnInit, OnDestroy {
  animationState: ToastAnimationState = 'default';
  private iconType: string;
  private _intervalId: number;

  constructor(@Inject(TOAST_DATA) readonly data: ToastData,
              @Inject(TOAST_REF) readonly toastRef: ToastRef,
              @Inject(TOAST_CONFIG) readonly toastConfig: ToastConfig) {
  }

  ngOnInit() {
    this.iconType = this.data.type === 'success' ? 'done' : this.data.type;
    this._intervalId = setTimeout(() => this.animationState = 'closing', 5000);
  }

  close() {
    this.toastRef.close();
  }

  ngOnDestroy(): void {
    clearTimeout(this._intervalId);
  }

  onFadeFinished($event: AnimationEvent) {
    console.dir($event);
    const {toState} = $event;
    const isFadeOut = (toState as ToastAnimationState) === 'closing';
    const isFinished = this.animationState === 'closing';
    console.log('isFadeOut: %O and isFinished: %O', isFadeOut, isFinished);
    if (isFadeOut && isFinished) {
      this.close();
    }
  }

  onMouseEnter() {
    clearTimeout(this._intervalId);
  }

  onMouseLeave() {
    this._intervalId = setTimeout(() => this.animationState = 'closing', 1000);
  }
}
