import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalLoaderComponent } from './global-loader/global-loader.component';
import { PercentagePipe } from './pipes/percentage.pipe';

@NgModule({
  declarations: [GlobalLoaderComponent, PercentagePipe],
  exports: [GlobalLoaderComponent, PercentagePipe],
  imports: [CommonModule],
  entryComponents: [],
  providers: [PercentagePipe],
})
export class SharedModule {}
