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
import { getSupplementTrackerContract } from '../shared/web3';

export interface SupplementInfo {
  name: string;
  manufacturer: string;
  proteins: number;
  carbs: number;
  fats: number;
  expiryDate: string;
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

  dataSource: MatTableDataSource<SupplementInfo>;

  constructor(public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<SupplementInfo>([]);
  }

  async ngOnInit() {
    const supplementTracker = getSupplementTrackerContract();
    if (!supplementTracker) return;

    const supplement = (await supplementTracker.getSupplementInfo(
      0
    )) as SupplementInfo;

    this.dataSource = new MatTableDataSource<SupplementInfo>(
      [supplement].map((supplement) => ({
        name: supplement.name,
        manufacturer: supplement.manufacturer,
        proteins: supplement.proteins,
        carbs: supplement.carbs,
        fats: supplement.fats,
        expiryDate: supplement.expiryDate,
      }))
    );
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
