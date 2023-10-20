import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Player } from 'src/app/models/PlayerModel';
import { DataRxjsService } from 'src/app/services/data-rxjs.service';
import { PlayerService } from 'src/app/services/player/player.service';
import { generalStatus } from 'src/app/utils/system-league';
import { SnackbarService } from '../../service/snackbar/snackbar.service';
import { Router } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';
import { positions } from 'src/app/utils/playerPositions';
import { environment } from 'src/environments/environment';
import { DefaultModalComponent } from '../../components/default-modal/default-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { Federation } from 'src/app/models/FederationModel';

@Component({
  selector: 'app-form-player',
  templateUrl: './form-player.component.html',
  styleUrls: ['./form-player.component.scss']
})
export class FormPlayerComponent implements OnInit, AfterViewInit {

  federation: Federation = JSON.parse(`${localStorage.getItem('reccos-federation') || []}`);

  @Input() id_player: string = '';
  @Input() validationForm: boolean = false;

  @ViewChild('stepper') stepper!: MatStepper;

  player_email: string = '';

  baseUrl = environment.storage_url;

  playerForm!: FormGroup;
  dateSaveBD: string = '';
  file_upload_name: string = 'player/default.png';

  league_status = generalStatus;
  player_positions = positions;

  changePhoto: boolean = true;
  dateInTheFuture: boolean = true;

  today: Date;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private rxjs: DataRxjsService,
    private snack: SnackbarService,
    private playerService: PlayerService,
  ) { }

  ngOnInit(): void {
    this.initForm();

    this.rxjs.uploadFileName$.subscribe(fileName => {
      if (fileName) {
        this.file_upload_name = 'player/' + fileName;
        this.nextStep();
      }
    });

    if (this.validationForm) {
      this.playerById(+this.id_player);
      this.changePhoto = false;
    }
  }

  ngAfterViewInit(): void {
    this.today = new Date();
  }

  initForm() {
    this.playerForm = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      rg: ['', Validators.required],
      cpf: ['', Validators.required],
      birth_date: ['', [Validators.required, this.valueValidator]],
      status: !this.validationForm ? ['ATIVO'] : [''],
      suspended: !this.validationForm ? [false] : [''],
      position: ['', Validators.required],
    });
  }

  get r() {
    return this.playerForm.controls;
  }

  playerById(id_player: number) {
    this.playerService.playerById(id_player).subscribe({
      next: (data) => {
        this.player_email = data.email
        this.dateSaveBD = String(data.birth_date);
        this.updateInfosPlayerId(data);
      },
      error: (err) => {
        console.log('TEAM BY ID ERR:', err);
      }
    });
  }

  updateInfosPlayerId(player: Player) {
    console.log('UPDATE PLAYER', player);
    this.playerForm.patchValue({
      name: player.name,
      email: player.email,
      rg: '000.000.000-00',
      cpf: '00.000.000-0',
      surname: player.surname,
      position: player.position.toUpperCase(),
      status: player.status.toUpperCase(),
      birth_date: player.birth_date,
      suspended: player.suspended,
    });

    console.log('UPDATE PLAYER', this.playerForm.value);

    if (this.validationForm) {
      this.playerForm.controls['rg'].setValidators([Validators.nullValidator]);
      this.playerForm.controls['cpf'].setValidators([Validators.nullValidator]);
    }
    this.playerForm.controls['rg'].updateValueAndValidity();
    this.playerForm.controls['cpf'].updateValueAndValidity();
  }

  createObjToAPI() {
    let obj = {
      ...this.playerForm.value,
      picture_profile: this.file_upload_name,
      idd_fed: +this.federation.id
    }
    if (this.validationForm) {
      let changeDate = this.compareDates(this.dateSaveBD, obj.birth_date);
      if (changeDate) {
        obj.birth_date = this.formatDate(obj.birth_date);
      }
    } else {
      obj.birth_date = this.formatDate(obj.birth_date);
    }
    console.log('CREATE OBJ TO API', obj);
    return;
    this.validationForm ? this.upldatePlayer(obj) : this.createPlayer(obj);
  }

  createPlayer(obj: Player) {
    this.playerService.createPlayer(obj).subscribe({
      next: (data) => {
        this.snack.snack(`Jogador ${obj.surname} criado com sucesso!`, 'snack-success');
        this.router.navigate(['/player']);
      },
      error: (err) => {
        console.log('CREATE PLAYER ERR:', err);
        this.snack.snack(`Erro ao tentar cadastrar jogador!`, 'snack-error');
      }
    });
  }

  upldatePlayer(obj: Player) {
    this.playerService.updatePlayer(+this.id_player, obj).subscribe({
      next: (data) => {
        this.snack.snack(`Jogador ${obj.surname} atualizada com sucesso!`, 'snack-success');
        this.router.navigate(['/player']);
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


  formatDate(date: string) {

    let d = !this.validationForm ? this.ajustDate(date).split("/") : date;

    var formattedTimestamp = new Date(d[2] + '/' + d[1] + '/' + d[0]);

    console.log('CONVERT DATE:', formattedTimestamp, date);
    var data = !this.validationForm ? new Date(formattedTimestamp).toISOString().slice(0, 16) : new Date(formattedTimestamp);
    return data;
  }

  ajustDate(dataString: string) {
    const dia = dataString.substring(0, 2);
    const mes = dataString.substring(2, 4);
    const ano = dataString.substring(4, 8);
    return `${dia}/${mes}/${ano}`;
  }

  valueValidator(control: AbstractControl): ValidationErrors | null {
    const valor = new Date(control.value);
    return valor > new Date() ? { futureDate: true } : null;
  }

  nextStep() {
    setTimeout(() => {
      this.stepper.next();
    }, 0);
  }
}
