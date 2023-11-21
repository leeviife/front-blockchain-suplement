import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { SupplementInfo } from '../home/home.component';
import { getSupplementTrackerContract } from '../shared/web3';
import { errors } from 'web3';

@Component({
  selector: 'app-modal-create',
  templateUrl: './modal-create.component.html',
  styleUrls: ['./modal-create.component.css'],
})
export class ModalCreateComponent {
  public formData: SupplementInfo = {
    name: '',
    manufacturer: '',
    proteins: 0,
    carbs: 0,
    fats: 0,
    expiryDate: '',
  };

  constructor(public dialogRef: MatDialogRef<ModalCreateComponent>) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  async onSave(): Promise<void> {
    const supplementTracker = getSupplementTrackerContract();
    if (!supplementTracker) return;

    try {
      await supplementTracker.addSupplement(
        this.formData.name,
        this.formData.manufacturer,
        this.formData.proteins,
        this.formData.carbs,
        this.formData.fats,
        this.formData.expiryDate.toString()
      );

      this.dialogRef.close();
    } catch (error) {
      console.log(error);
    }
  }
}
