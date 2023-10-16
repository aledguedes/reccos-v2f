import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

@Component({
  selector: 'app-form-player',
  templateUrl: './form-player.component.html',
  styleUrls: ['./form-player.component.scss']
})
export class FormPlayerComponent implements OnInit {

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

  initForm() {
    this.playerForm = this.fb.group({
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
    this.playerForm.patchValue({
      name: player.name,
      email: player.email,
      rg: player.rg,
      cpf: player.cpf,
      surname: player.surname,
      position: player.position.toUpperCase(),
      status: player.status.toUpperCase(),
      birth_date: player.birth_date,
      suspended: player.suspended,
    });
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
    }
    if (this.validationForm) {
      let changeDate = this.compareDates(this.dateSaveBD, obj.birth_date);
      if (changeDate) {
        obj.birth_date = this.formatDate(obj.birth_date);
      }
    }
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


  formatDate(date: Date) {
    var formattedTimestamp = date.toISOString().slice(0, 16);
    return formattedTimestamp;
  }

  nextStep() {
    setTimeout(() => {
      this.stepper.next();
    }, 0);
  }
}
