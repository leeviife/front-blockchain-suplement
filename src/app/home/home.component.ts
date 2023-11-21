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
import { NgFor, NgIf } from '@angular/common';
import { ModalDetailsComponent } from '../modal-details/modal-details.component';

export interface SupplementInfo {
  name: string;
  manufacturer: string;
  proteins: number;
  carbs: number;
  fats: number;
  expiryDate: string;
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
    NgFor,
    NgIf,
  ],
})
export class HomeComponent {
  displayedColumns: string[] = [
    'id',
    'name',
    'manufacturer',
    'proteins',
    'carbs',
    'fats',
    'expiryDate',
    'signSupplement',
    'details',
  ];

  dataSource: MatTableDataSource<SupplementInfo>;
  supplementTracker: any;
  expandedRow: number | null = null;

  constructor(public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<SupplementInfo>([]);
    this.supplementTracker = getSupplementTrackerContract();
  }

  async fetchSupplements() {
    if (!this.supplementTracker) return;

    const supplements =
      (await this.supplementTracker.getSupplements()) as SupplementInfo[];

    this.dataSource = new MatTableDataSource<SupplementInfo>(
      supplements.map((supplement, index) => ({
        id: index,
        name: supplement.name,
        manufacturer: supplement.manufacturer,
        proteins: supplement.proteins,
        carbs: supplement.carbs,
        fats: supplement.fats,
        expiryDate: supplement.expiryDate,
      }))
    );
  }

  async ngOnInit() {
    this.fetchSupplements();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalCreateComponent);
    dialogRef.afterClosed().subscribe(() => this.fetchSupplements());
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  async openDetails(rowId: number) {
    const supplement = this.dataSource.data[rowId];
    const signatures = await this.supplementTracker.getSupplementSignatures(
      rowId
    );
    this.dialog.open(ModalDetailsComponent, {
      data: { supplement, signatures },
      minWidth: '43.5rem',
    });
  }

  async signSupplement(rowId: number) {
    const supplement = this.dataSource.data[rowId];
    await this.supplementTracker.signSupplement(rowId, supplement);
    this.fetchSupplements();
  }
}
