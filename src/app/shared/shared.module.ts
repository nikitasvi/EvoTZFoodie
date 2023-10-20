import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconGithubComponent } from './icons/github-icon.component';
import { IconBallComponent } from './icons/ball-icon.component';
import { ShareDialogComponent } from './dialogs/share-dialog/share-dialog.component';
import { DeleteDialogComponent } from './dialogs/delete-dialog/delete-dialog.component';
import { IconWarningComponent } from './icons/warning-icon.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    IconGithubComponent,
    IconBallComponent,
    ShareDialogComponent,
    DeleteDialogComponent,
    IconWarningComponent,
  ],
  providers: [],
  exports: [IconGithubComponent, IconBallComponent, IconWarningComponent],
})
export class SharedCommonModule {}
