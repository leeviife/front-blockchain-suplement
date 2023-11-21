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
import {
  getAccountAddress,
  getSupplementTrackerContract,
} from '../shared/web3';
import { NgFor, NgIf } from '@angular/common';
import { ModalDetailsComponent } from '../modal-details/modal-details.component';
import { MatTooltipModule } from '@angular/material/tooltip';

export interface SupplementInfo {
  name: string;
  manufacturer: string;
  proteins: number;
  carbs: number;
  fats: number;
  expiryDate: string;
}

export interface Signature {
  signer: string;
  signature: string;
  messageHash: string;
  revoked: boolean;
}

export interface SupplementInfoWithSignature extends SupplementInfo {
  signatures: Signature[];
  authorizedSigners: string[];
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
    MatTooltipModule,
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
    'revokeSign',
    'details',
  ];

  dataSource: MatTableDataSource<SupplementInfoWithSignature>;
  supplementTracker: any;
  expandedRow: number | null = null;
  accountAddress: string | null = null;

  constructor(public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource<SupplementInfoWithSignature>([]);
    this.supplementTracker = getSupplementTrackerContract();
  }

  async fetchSupplements() {
    if (!this.supplementTracker) return;

    const supplements =
      (await this.supplementTracker.getSupplements()) as SupplementInfoWithSignature[];

    this.dataSource = new MatTableDataSource<SupplementInfoWithSignature>(
      supplements.map((supplement, index) => ({
        ...supplement,
        id: index,
      }))
    );
  }

  async ngOnInit() {
    this.fetchSupplements();
    this.accountAddress = await getAccountAddress();
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

  isAlreadySigned(rowId: number) {
    const supplement = this.dataSource.data[rowId];
    return supplement.signatures.some(
      (signature) =>
        signature.signer === this.accountAddress && !signature.revoked
    );
  }

  isSignAuthorized(rowId: number) {
    const supplement = this.dataSource.data[rowId];
    return supplement.authorizedSigners.some(
      (signer) => signer === this.accountAddress
    );
  }

  async openDetails(rowId: number) {
    const supplement = this.dataSource.data[rowId];

    this.dialog.open(ModalDetailsComponent, {
      data: supplement,
      minWidth: '43.5rem',
    });
  }

  async signSupplement(rowId: number) {
    const supplement = this.dataSource.data[rowId];
    await this.supplementTracker.signSupplement(rowId, supplement);
    this.fetchSupplements();
  }

  async revokeSign(rowId: number) {
    const supplement = this.dataSource.data[rowId];
    await this.supplementTracker.revokeSignature(rowId, supplement);
    this.fetchSupplements();
  }
}
