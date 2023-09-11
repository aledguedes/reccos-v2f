import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { Team } from 'src/app/models/TeamModel';
import { TeamService } from 'src/app/services/team/team.service';
import { leaguesStatus } from 'src/app/utils/system-league';
import { environment } from 'src/environments/environment';
import { SnackbarService } from '../../service/snackbar/snackbar.service';
import { StadiumService } from 'src/app/services/stadium/stadium.service';
import { Stadium } from 'src/app/models/StadiumModel';
import { DataRxjsService } from 'src/app/services/data-rxjs.service';

@Component({
  selector: 'app-form-stadium',
  templateUrl: './form-stadium.component.html',
  styleUrls: ['./form-stadium.component.scss']
})
export class FormStadiumComponent implements OnInit {

  @Input() public id_stadium: String = '';
  @Input() public validationForm: Boolean = false;

  @ViewChild('stepper') stepper!: MatStepper;

  baseUrl = environment.storage_url;

  reccosFormStadium!: FormGroup;
  stadium_status = leaguesStatus;
  changePhoto: boolean = true;
  listTemas: boolean = false;

  teams_by_federation: Team[] = [];

  id_federation: string = '1';
  file_upload_name: string = 'stadium/default.jpg';

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private rxjs: DataRxjsService,
    private snack: SnackbarService,
    private stadiumService: StadiumService,
  ) { }

  ngOnInit(): void {
    this.initForm();

    this.rxjs.uploadFileName$.subscribe(fileName => {
      if (fileName) {
        this.file_upload_name = 'team/' + fileName;
        this.nextStep();
      }
    });

    if (this.validationForm) {
      this.stadiumById(+this.id_stadium);
      this.changePhoto = false;
    }
  }

  initForm() {
    this.reccosFormStadium = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      status: !this.validationForm ? ['Ativo'] : [''],
    });
  }

  get r() {
    return this.reccosFormStadium.controls;
  }

  nextStep() {
    this.stepper.next();
  }

  stadiumById(id_stadium: number) {
    this.stadiumService.stadiumById(id_stadium).subscribe({
      next: (data) => {
        console.log('STADIUM BY ID:', data);
        this.updateInfosStadium(data);
      },
      error: (err) => {
        console.log('STADIUM BY ID ERR:', err);
      }
    });
  }

  updateInfosStadium(values: Stadium) {
    this.reccosFormStadium.patchValue({
      name: values.name,
      status: values.status?.toUpperCase(),
      surname: values.surname,
    });
  }

  updateStadium() {
    let obj = { ...this.reccosFormStadium.value, picture_profile: this.file_upload_name };
    this.stadiumService.updateStadium(+this.id_stadium, obj).subscribe({
      next: (data) => {
        console.log('CREATE STADIUM:', data);
        this.router.navigate(['/stadium']);
        this.snack.snack(`Estádio/arena ${obj.name} atualizado com sucesso!`, 'snack-success');
      },
      error: (err) => {
        console.log('CREATE STADIUM ERR:', err);
        this.snack.snack(`Erro ao tentar atualizar o estádio/liga!`, 'snack-error');
      }
    });
  }

  createStadium() {

    let obj = {
      ...this.reccosFormStadium.value,
      picture_profile: this.file_upload_name,
      idd_fed: +this.id_federation
    };
    this.stadiumService.createStadium(obj).subscribe({
      next: (data) => {
        console.log('CREATE STADIUM:', data);
        this.router.navigate(['/stadium']);
        this.snack.snack(`Estádio/arena ${obj.name} criada com sucesso!`, 'snack-success');
      },
      error: (err) => {
        console.log('CREATE STADIUM ERR:', err);
        this.snack.snack(`Erro ao tentar criar o estádio/liga!`, 'snack-error');
      }
    });
  }
}
