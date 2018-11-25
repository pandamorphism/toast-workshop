import {Component, TemplateRef, ViewChild} from '@angular/core';
import {ToastService} from './toast/service/toast.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('custom') tpl: TemplateRef<any>;
  @ViewChild('tooltip') tooltip: TemplateRef<any>;

  constructor(private toastService: ToastService) {

  }

  showToast() {
    this.toastService.show({text: 'This is Toast!!!', type: 'success'});
  }

  showCustomTemplateToast() {
    this.toastService.show({templateContext: {$implicit: 'heyhey'}, template: this.tpl});
  }
}
