import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { Contract } from 'src/app/models/ContractModel';
import { Player } from 'src/app/models/PlayerModel';
import { Team } from 'src/app/models/TeamModel';
import { ContractService } from 'src/app/services/contract/contract.service';
import { PlayerService } from 'src/app/services/player/player.service';
import { TeamService } from 'src/app/services/team/team.service';
import { leaguesStatus } from 'src/app/utils/system-league';
import { environment } from 'src/environments/environment';
import { SnackbarService } from '../../service/snackbar/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-contract',
  templateUrl: './form-contract.component.html',
  styleUrls: ['./form-contract.component.scss']
})
export class FormContractComponent implements OnInit {

  @Input() public id_contract: string = '';
  @Input() public validationForm: Boolean = false;

  filteredNamesTeam!: Observable<any[]>;
  filteredNamesPlayer!: Observable<any[]>;

  formContract!: FormGroup;
  baseUrl = environment.storage_url;

  dtEndContractDB: string = '';
  dtStartContractDB: string = '';

  listTeams: Team[] = [];
  listPlayers: Player[] = [];

  league_status = leaguesStatus;
  junpInitial: boolean = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private snack: SnackbarService,
    private teamService: TeamService,
    private playerService: PlayerService,
    private contractService: ContractService,
  ) { }

  ngOnInit(): void {

    this.initForm();
    this.listAllTeams();
    this.listAllPlayers();

    if (this.validationForm) {
      this.contractById(+this.id_contract);
    }
  }

  initForm() {
    this.formContract = this.fb.group({
      team: ['', Validators.required],
      player: ['', Validators.required],
      dt_start: ['', Validators.required],
      dt_end: ['', Validators.required],
      status: !this.validationForm ? ['Ativo'] : ['']
    });

    this.filteredNamesPlayer = this.formContract.controls['player'].valueChanges.pipe(
      startWith(''),
      map(player => (player ? this._filterNamesPlayers(player) : this.listPlayers.slice()))
    );

    this.filteredNamesTeam = this.formContract.controls['team'].valueChanges.pipe(
      startWith(''),
      map(player => (player ? this._filterNamesTeams(player) : this.listTeams.slice()))
    );
  }

  private _filterNamesPlayers(value: string): any[] {
    const filterValue = value.toLowerCase();
    return this.listPlayers.filter((player: any) => player.name.toLowerCase().includes(filterValue));
  }

  private _filterNamesTeams(value: string): any[] {
    console.log('_filterNamesTeams:', value);
    const filterValue = value.toLowerCase();
    return this.listTeams.filter((team: any) => team.name.toLowerCase().includes(filterValue));
  }

  displayTeam(team: Team): string {
    return team && team.surname ? team.surname : '';
  }

  displayPlayer(player: Player): string {
    return player && player.name ? player.name : '';
  }

  contractById(id_contract: number) {
    this.contractService.contractById(id_contract).subscribe({
      next: (data) => {
        // console.log('CONTRACT BY ID:', data);
        this.dtEndContractDB = String(data.dt_end);
        this.dtStartContractDB = String(data.dt_start);
        this.updateInfosContractId(data);
      },
      error: (err) => {
        console.log('TEAM BY ID ERR:', err);
      }
    });
  }

  updateInfosContractId(values: Contract) {
    this.formContract.patchValue({
      team: values.teams,
      player: values.players,
      dt_start: values.dt_start,
      dt_end: values.dt_end,
      status: values.status
    });
  }

  listAllPlayers() {
    this.playerService.listAllPlayer().subscribe({
      next: (data) => {
        this.listPlayers = data;
        // console.log('PLAYERS ALL', data);
      },
      error: (err) => {
        console.log('PLAYERS ALL ERR', err);
      }
    });
  }

  listAllTeams() {
    this.teamService.listAllTeam().subscribe({
      next: (data) => {
        this.listTeams = data;
        // console.log('LIST ALL TEAMS DATA:', data);
      },
      error: (err) => {
        console.log('LIST ALL TEAMS ERR:', err);
      }
    });
  }

  createObjToAPI() {
    let id_player = +this.formContract.value.player.id;
    let id_team = this.formContract.value.team.id;
    let obj: any = {
      dt_end: this.formContract.value.dt_end,
      dt_start: this.formContract.value.dt_start,
      status: this.formContract.value.status,
      createdAt: new Date,
      updatedAt: new Date,
    };
    if (this.validationForm) {

      let changeDateEnd = this.compareDates(this.dtEndContractDB, obj.dt_end);
      let changeDateStart = this.compareDates(this.dtStartContractDB, obj.dt_start);

      if (changeDateStart) {
        obj.dt_start = this.formatDate(obj.dt_start);
      }
      if (changeDateEnd) {
        obj.dt_end = this.formatDate(obj.dt_end);
      }
    }
    this.validationForm ? this.updateContract(+this.id_contract, id_player, id_team, obj) : this.createContract(id_player, id_team, obj);
  }

  createContract(id_player: number, id_team: number, obj: Contract) {
    this.contractService.createContract(id_player, id_team, obj).subscribe({
      next: (data) => {
        this.snack.snack(`Contrato criado com sucesso!`, 'snack-success');
        this.router.navigate(['/contract']);
      },
      error: (err) => {
        console.log('CREATE CONTRACT ERR:', err);
        this.snack.snack(`Erro ao tentar criar contrato!`, 'snack-error');
      }
    });
  }

  updateContract(id_contract: number, id_player: number, id_team: number, obj: Contract) {
    this.contractService.updateContract(id_contract, id_player, id_team, obj).subscribe({
      next: (data) => {
        this.snack.snack(`Contrato atualizado com sucesso!`, 'snack-success');
        this.router.navigate(['/contract']);
      },
      error: (err) => {
        console.log('CREATE CONTRACT ERR:', err);
        this.snack.snack(`Erro ao tentar atualizar contrato!`, 'snack-error');
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
    console.log('Date', date);
    var formattedTimestamp = date.toISOString().slice(0, 16);
    return formattedTimestamp;
  }

}
