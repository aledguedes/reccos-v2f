import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { DataRxjsService } from 'src/app/services/data-rxjs.service';
import { generalStatus } from 'src/app/utils/system-league';
import { SnackbarService } from '../../service/snackbar/snackbar.service';
import { RefreeService } from 'src/app/services/refree/refree.service';
import { Refree } from 'src/app/models/RefreeModel';
import { environment } from 'src/environments/environment';
import { DefaultModalComponent } from '../../components/default-modal/default-modal.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-form-refree',
  templateUrl: './form-refree.component.html',
  styleUrls: ['./form-refree.component.scss']
})
export class FormRefreeComponent implements OnInit {

  @Input() id_refree: string = '';
  @Input() validationForm: boolean = false;

  @ViewChild('stepper') stepper!: MatStepper;

  baseUrl = environment.storage_url;

  refreeForm!: FormGroup;
  dateSaveBD: string = '';

  limitDate: Date;

  file_upload_name: string = 'refree/default.png';

  league_status = generalStatus;

  changePhoto: boolean = true;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private rxjs: DataRxjsService,
    private snack: SnackbarService,
    private refreeService: RefreeService,
  ) { }

  ngOnInit(): void {
    this.initForm();

    this.rxjs.uploadFileName$.subscribe(fileName => {
      if (fileName) {
        this.file_upload_name = 'refree/' + fileName;
        this.nextStep();
      }
    });

    if (this.validationForm) {
      this.refreeById(+this.id_refree);
      this.changePhoto = false;
    }
  }

  ngAfterViewInit(): void {
    this.limitDate = this.limitDatePicker(new Date());
  }

  limitDatePicker(receivedDate: any, valueCount: number = 0) {
    const tomorrow = new Date(receivedDate);
    tomorrow.setDate(receivedDate.getDate() + valueCount);
    return tomorrow;
  }

  initForm() {
    this.refreeForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      rg: ['', Validators.required],
      cpf: ['', Validators.required],
      birth_date: ['', Validators.required],
      status: !this.validationForm ? ['Ativo'] : [''],
      suspended: !this.validationForm ? [false] : [''],
      position: ['', Validators.required],
    });
  }

  get r() {
    return this.refreeForm.controls;
  }

  refreeById(id_refree: number) {
    this.refreeService.refreeById(id_refree).subscribe({
      next: (data) => {
        console.log('REFREE BY ID:', data);
        this.dateSaveBD = String(data.birth_date);
        this.updateInfosRefreeId(data);
      },
      error: (err) => {
        console.log('REFREE BY ID ERR:', err);
      }
    });
  }

  updateInfosRefreeId(refree: Refree) {
    this.refreeForm.patchValue({
      name: refree.name,
      email: refree.email,
      rg: refree.rg,
      cpf: refree.cpf,
      surname: refree.surname,
      status: refree.status.toUpperCase(),
      birth_date: refree.birth_date,
    });
    if (this.validationForm) {
      this.refreeForm.controls['rg'].setValidators([Validators.nullValidator]);
      this.refreeForm.controls['cpf'].setValidators([Validators.nullValidator]);
    }
    this.refreeForm.controls['rg'].updateValueAndValidity();
    this.refreeForm.controls['cpf'].updateValueAndValidity();
  }

  createObjToAPI() {
    let obj = {
      ...this.refreeForm.value,
      picture_profile: this.file_upload_name,
    }
    if (this.validationForm) {
      let changeDate = this.compareDates(this.dateSaveBD, obj.birth_date);
      if (changeDate) {
        obj.birth_date = this.formatDate(obj.birth_date);
      }
    }
    this.validationForm ? this.upldateRefree(obj) : this.createRefree(obj);
  }

  createRefree(obj: Refree) {
    this.refreeService.createRefree(obj).subscribe({
      next: (data) => {
        this.snack.snack(`Jogador ${obj.surname} criado com sucesso!`, 'snack-success');
        this.router.navigate(['/refree']);
      },
      error: (err) => {
        console.log('CREATE PLAYER ERR:', err);
        this.snack.snack(`Erro ao tentar cadastrar jogador!`, 'snack-error');
      }
    });
  }

  upldateRefree(obj: Refree) {
    this.refreeService.updateRefree(+this.id_refree, obj).subscribe({
      next: (data) => {
        this.snack.snack(`Jogador ${obj.surname} atualizada com sucesso!`, 'snack-success');
        this.router.navigate(['/refree']);
      },
      error: (err) => {
        console.log('UPDATE PLAYER ERR:', err);
        this.snack.snack(`Erro ao tentar atualizar o jogador!`, 'snack-error');
      }
    });
  }

  compareDates(datestring1: string, datestring2: string) {
    const date1 = new Date(datestring1);
    const date2 = new Date(datestring2);

    if (date1.getTime() === date2.getTime()) {
      return false;
    }
    return true;
  }

  formatDate(date: Date) {
    var formattedTimestamp = date.toISOString().slice(0, 16);
    return formattedTimestamp;
  }

  nextStep() {
    setTimeout(() => {
      this.stepper.next();
    }, 0);
  }

  openUpload() {
    this.dialog.open(DefaultModalComponent, {
      disableClose: true,
      width: '500px',
      data: {
        component: 2
      }
    }).afterClosed().subscribe((data: any) => {
      console.log('USER FORMS', data);
      this.file_upload_name = data.result;
    });
  }

}
