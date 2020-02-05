import { Component, OnInit, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../user.service';
import { tap, take, debounce, debounceTime, delay } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { UserModel } from '../user.model';
import { ManagerComponent } from '../manager/manager.component';
import { UserModule } from '../user.module';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'nome', 'cpf', 'dataNascimento', 'senha', 'buttons'];
  dataSource = new MatTableDataSource();
  user: UserModel;

  constructor(
    private service: UserService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    // createUser(this.service);
    // editUsers(this.service);
    // getUser(this.service);
    this.getAll();
  }

  applyFilter = (filterValue: string) => this.dataSource.filter = filterValue.trim().toLowerCase();

  getAll() {
    this.service.getUsers().pipe(
      tap(users => { this.dataSource.data = users; }),
      take(1)
    ).subscribe();
  }

  remove(id: string): void {
    const dialogRef = this.dialog.open(DialogComponent);
    dialogRef.afterClosed().pipe(tap(result => {
      if (result) {
        this.service.delUser(id).pipe(
          tap(response => void this.getAll()),
          take(1),
        ).subscribe();
      }
    }),
      take(1)
    ).subscribe();
  }

  edit(user: UserModel) {
    this.dialog.open(ManagerComponent, {
      width: '30rem',
      data: user
    }).afterClosed().pipe(
      tap((response) => { this.getAll(); }),
    ).subscribe();
  }
}


function createUser(service: UserService) {
  let user: UserModel = new UserModel();
  user.nome = 'klakskasldfjlsdfjksdfj';
  user.senha = `Senha - 30de2c3d04487f4fb0f5e6fe806b8fb206b58580`;
  user.cpf = `321.217.860-40`;
  user.dataNascimento = new Date(`2020/01/01`);
  user.id = null;
  service.addUser(user).pipe(take(1)).subscribe();
}

function editUsers(service: UserService) {
  let user: UserModel = new UserModel();
  user.nome = 'Nitai Charan';
  user.id = 263;
  user.senha = `Senha - 30de2c3d04487f4fb0f5e6fe806b8fb206b58580`;
  user.cpf = `321.217.860-40`;
  user.dataNascimento = new Date(`2020/01/01`);
  service.setUser(user).pipe(take(1)).subscribe();
}

function getUser(service: UserService) {
  service.getUser('263').pipe(tap(console.log), take(1)).subscribe();
}
