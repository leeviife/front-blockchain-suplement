import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  Signature,
  SupplementInfo,
  SupplementInfoWithSignature,
} from '../home/home.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-modal-details',
  templateUrl: './modal-details.component.html',
  styleUrls: ['./modal-details.component.css'],
})
export class ModalDetailsComponent {
  public supplement: SupplementInfoWithSignature;
  dataSource: MatTableDataSource<Signature>;

  constructor(
    public dialogRef: MatDialogRef<ModalDetailsComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: SupplementInfoWithSignature
  ) {
    this.supplement = data;
    this.dataSource = new MatTableDataSource<Signature>(data.signatures);
  }

  async ngOnInit() {}

  onClose(): void {
    this.dialogRef.close();
  }
}
