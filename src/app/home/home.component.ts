import { Component } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalCreateComponent } from '../modal-create/modal-create.component';

export interface UserData {
  id: string;
  name: string;
  manufacturer: string;
  proteins: string;
  carbs: string;
  fats: string;
  expiry_date: string;
}
export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatToolbarModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
})
export class HomeComponent {
  animal: string | undefined;
  name: string | undefined;
  displayedColumns: string[] = [
    'id',
    'name',
    'manufacturer',
    'proteins',
    'carbs',
    'fats',
    'expiry_date',
  ];
  dataSource: MatTableDataSource<UserData>;

  constructor(public dialog: MatDialog) {
    // Create 100 users
    const users: UserData[] = [
      {
        id: 'string',
        name: 'string',
        manufacturer: 'string',
        proteins: 'string',
        carbs: 'string',
        fats: 'string',
        expiry_date: 'string',
      },
    ];

    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(users);
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(ModalCreateComponent, {
      data: { name: this.name, animal: this.animal },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
