import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SupplementInfo } from '../home/home.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { NgFor, NgIf } from '@angular/common';

interface Signature {
  signer: string;
  signature: string;
  messageHash: string;
}

@Component({
  selector: 'app-modal-details',
  templateUrl: './modal-details.component.html',
  styleUrls: ['./modal-details.component.css'],
})
export class ModalDetailsComponent {
  public supplement: SupplementInfo = {
    name: '',
    manufacturer: '',
    proteins: 0,
    carbs: 0,
    fats: 0,
    expiryDate: '',
  };
  signatures: MatTableDataSource<Signature>;

  constructor(
    public dialogRef: MatDialogRef<ModalDetailsComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { supplement: SupplementInfo; signatures: Signature[] }
  ) {
    this.supplement = data.supplement;
    this.signatures = new MatTableDataSource<Signature>(data.signatures);
  }

  async ngOnInit() {}

  onClose(): void {
    this.dialogRef.close();
  }
}
