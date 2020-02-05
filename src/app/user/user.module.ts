import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { RouterModule, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { UserService } from './user.service';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ManagerComponent } from './manager/manager.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogComponent } from './dialog/dialog.component';
import { TextMaskModule } from 'angular2-text-mask';
import { MatCardModule } from '@angular/material/card';




@NgModule({
  declarations: [
    ListComponent,
    ManagerComponent,
    DialogComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDatepickerModule,
    HttpClientModule,
    MatButtonModule,
    MatDialogModule,
    MatCardModule,
    MatNativeDateModule,
    TextMaskModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: ListComponent },
      { path: ':id', component: ManagerComponent },
      { path: 'new', component: ManagerComponent },
    ])
  ],
  entryComponents: [DialogComponent],
  providers: [
    UserService,
  ]
})
export class UserModule { }
