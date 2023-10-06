import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { Group } from 'src/app/models/GroupTeam';
import { League } from 'src/app/models/LeagueModel';
import { Team } from 'src/app/models/TeamModel';
import { LeagueService } from 'src/app/services/league/league.service';
import { TeamService } from 'src/app/services/team/team.service';
import { DefaultModalComponent } from 'src/app/shared/components/default-modal/default-modal.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-league-detail',
  templateUrl: './league-detail.component.html',
  styleUrls: ['./league-detail.component.scss']
})
export class LeagueDetailComponent implements OnInit {

  league: League;
  teamsSelectedsLeague: any[] = [];
  teams: Team[] = [];

  formEditGroup!: FormGroup;

  urlLogo: string = '';
  id_league: string = '';
  id_federation: string = '1';

  editGrouEnable: boolean = false;
  teamForGroup: Team[] = [];

  baseUrl = environment.storage_url;

  matches: { group: string; homeTeam: string; awayTeam: string }[];

  rounds: any[] = [];

  groups: Group[] = []

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private teamService: TeamService,
    private actvRouter: ActivatedRoute,
    private leagueService: LeagueService,
  ) { }

  ngOnInit(): void {
    this.id_league = this.actvRouter.snapshot.params['id_league'];
    this.initForms();
    this.leagueById(+this.id_league);
    this.teamByFederation(+this.id_federation);
  }

  initForms() {
    this.formEditGroup = this.fb.group({
      group_name: ['']
    });
  }

  teamByFederation(id_federation: number) {
    this.teamService.teamByFederation(id_federation).subscribe({
      next: (data) => {
        data.forEach((item: Team) => {
          item.check = '0'; // 0 - false / 1 - true
        });
        this.teams = data;
        console.log('TEAM BY FEDERATION SUCESS', data);
      },
      error: (err) => {
        console.log('TEAM BY FEDERATION ERROR', err);
      }
    });
  }

  numberTeamsLeague(qdt_teams: number) {
    for (let i = 0; i < qdt_teams; i++) {
      this.teamsSelectedsLeague[i] = {
        id: 0,
        name: `Time ${i + 1}`,
        icon: 'add',
        picture_profile: 'sports_soccer',
        check: '0'
      }
    }
  }

  leagueById(id_league: number) {
    this.leagueService.leagueById(id_league).subscribe({
      next: (data) => {
        data["cod_status"] = this.plotStatus(data?.status.toLowerCase());
        this.urlLogo = this.baseUrl + data?.img_logo;
        this.league = data;
        data.groups.forEach((item: Group) => {
          item.check = false;
        });
        this.groups = data.groups;
        this.numberTeamsLeague(data.num_teams);
        console.log('LEAGUE BY ID', data);
      },
      error: (err) => {
        console.log('LEAGUE BY ID ERR', err);
      }
    });
  }

  plotStatus(value: string) {
    switch (value) {
      case 'ativo':
        return '1';
      case 'inativo':
        return '2';
      case 'suspenso':
        return '3';
      default:
        return '4';
    }
  }

  addTeamsLeague() {
    const dialogRef = this.dialog.open(DefaultModalComponent, {
      disableClose: true,
      width: '650px',
      data: {
        component: 'add_teams_league',
        id_federation: +this.id_federation,
        teams: this.teams
      }
    }).afterClosed().subscribe((data: any) => {
      let difference = 14 - data.length;
      if (difference > 0) {
        this.diffSelectedTeams(data);
        return;
      }
      this.teamsSelectedsLeague = data;
    });
  }

  diffSelectedTeams(seleteds: Team[]) {
    seleteds.forEach((item: any, idx: number) => {
      this.teamsSelectedsLeague[idx] = item;
    });
  }

  clearTeam() {
    this.teamsSelectedsLeague.forEach((item: any) => {
      item.check = '0';
      this.teamsSelectedsLeague = [];
      this.numberTeamsLeague(14);
    });
  }

  editGroup(idx: number) {
    this.groups[idx].check = true;
    // this.editGrouEnable = true;
  }

  chooseGroups() {
    if (this.groups.length == 1) {
      this.singleGroup(this.teamsSelectedsLeague);
      return;
    }
    this.multuplesGroups(this.teamsSelectedsLeague, this.groups.length);
  }

  singleGroup(teams: Team[]) {
    let arrTimes: any = [];
    teams.forEach((t: any) => {
      arrTimes.push({ id: t.id });
    });
    this.groups[0].teams = arrTimes;
  }

  multuplesGroups(teams: Team[], qtdGroups: number) {
    let aleatorio = this.shuffleArray(teams);

    const tamanhoGrupo = Math.ceil(teams.length / qtdGroups);

    this.groups.forEach((group: any, idx: number) => {
      const grupo = aleatorio.slice(idx * tamanhoGrupo, (idx + 1) * tamanhoGrupo);
      group.teams = grupo;
    });
    console.log('DADOS GRUPOS:', this.groups);

    // for (let i = 0; i < qtdGroups; i++) {
    //   const grupo = teams.slice(i * tamanhoGrupo, (i + 1) * tamanhoGrupo);
    //   this.groups[i].push(grupo);
    //   console.log('DADOS GRUPOS:', i * tamanhoGrupo, (i + 1) * tamanhoGrupo);
    // }
  }

  shuffleArray(array: Team[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  updateGroup(idx: number, value: string) {
    this.groups[idx].name = value;
    this.groups[idx].check = false;
    this.formEditGroup.patchValue({
      group_name: ['']
    });

    this.dataToSaveApi('name_group', this.groups[idx]);
  }

  dataToSaveApi(value: string, data: any) {
    let groupsInfos: any[] = [];

    if( value == 'name_group') {
      groupsInfos.push({
        name: String(data.id + '?' + data.name)
      });
      console.log('groupsInfos', groupsInfos);
    }

  }

  get r() {
    return this.formEditGroup.controls;
  }

  /*
  RODADAS
  */

  generateSchedule(): void {
    let time: any[] = [];
    let lengthArray: number = 0;
    this.groups.forEach((item: any, idx: number) => {
      time = item.teams;
      lengthArray = time.length;

      if (lengthArray % 2 == 0) {
        this.systemOne(time, lengthArray, item.id, idx);
      } else {
        this.systemTwo(time, lengthArray, item.id, idx);
      }
    });
  }

  systemOne(times: any, tamArrTimes: number, id_group: number, idx: number) {
    console.log('TURN_A');
    let homeTeam: any, awayTeam: any, newArr: any = [];

    let timeA, timeB;
    // let qtd_match = (tamArrTimes - 1) * turn;
    let qtd_match = (tamArrTimes - 1) * 2;
    let confrontos = tamArrTimes / 2;

    times.forEach((t: any) => {
      newArr = [...newArr, t.id];
    });

    let obj: any = [];
    let round: any = [];

    if (tamArrTimes % 2 == 0) {
      timeB = newArr.splice(tamArrTimes / 2, Number.MAX_VALUE);
      timeA = newArr;
    }

    let number_round = 0;

    for (let i = 0; i < qtd_match; i++) { //qtd_match
      let games: any = [];
      number_round++;
      console.log('number_round', number_round);
      for (let j = 0; j < confrontos; j++) {
        if (i % 2 == 0) {
          homeTeam = timeA[j];
          awayTeam = timeB[j];
        } else {
          homeTeam = timeB[j];
          awayTeam = timeA[j];
        }

        games.push({
          idd_match: number_round,
          match_date: null,
          homeTeam: { id: +homeTeam },
          status: true,
          awayTeam: { id: +awayTeam },
          head_referee: null,
          assistant_referee: null
        });
      }

      const back1 = timeA.splice((timeA.length - 1), 1);
      const back2 = timeB.splice(0, 1);

      timeA.splice(1, 0, back2[0]);
      timeB.splice(timeB.length, 0, back1[0]);

      obj = {
        // dt_start: this.convertDate(DateTime.now().toFormat('dd/MM/yyyy')),
        // dt_end: this.convertDate(DateTime.now().toFormat('dd/MM/yyyy')),
        group_idd: +id_group,
        num_round: number_round,
        dt_start: null,
        dt_end: null,
        status: true,
        matches: games
      };
      round.push(obj);
    }
    // this.groups[idx].round = round;
  }

  systemTwo(times: any, tamArrTimes: any, id_group: number, idx: number) {
    console.log('TURN_B');
    let turn = 2;
    let home: any, visiting: any, newArr: any = [], day_off;
    let timeA, timeB, timeF, bkpT: any = [];
    let qtd_match = tamArrTimes * turn;
    let confrontos = (tamArrTimes - 1) / 2;

    times.forEach((t: any) => {
      newArr = [...newArr, t.id];
    });

    let obj: any = [];
    let round: any = [];

    timeB = newArr.splice(confrontos, Number.MAX_VALUE);
    timeF = timeB.splice(0, 1);
    timeA = newArr;

    let number_round = 0;

    for (let i = 0; i < qtd_match; i++) { // qtd_match
      let games: any = [];
      number_round++;
      console.log('number_round', number_round);
      for (let j = 0; j < confrontos; j++) {
        if (i % 2 == 0) {
          home = timeA[j];
          visiting = timeB[j];
        } else {
          home = timeB[j];
          visiting = timeA[j];
        }

        games.push({
          idd_match: number_round,
          match_date: null,
          home: { id: +home },
          status: true,
          visiting: { id: +visiting },
          head_referee: null,
          assistant_referee: null
        });
      }
      bkpT = timeF;
      timeF = timeA.splice(timeA.length - 1, 1);
      timeB.splice(Number.MAX_VALUE, 0, bkpT[0]);
      bkpT = timeB.splice(0, 1);
      timeA.splice(0, 0, bkpT[0]);
      obj = {
        // dt_start: this.convertDate(DateTime.now().toFormat('dd/MM/yyyy')),
        // dt_end: this.convertDate(DateTime.now().toFormat('dd/MM/yyyy')),
        group_idd: +id_group,
        num_round: number_round,
        dt_start: null,
        dt_end: null,
        status: true,
        matches: games
      };
      round.push(obj);
      // this.createRounds(obj);
    }
    // this.groups[idx].round = round;
  }

  listGroups() {
    let myRounds: any[] = [];
    this.groups.forEach((g: any, vl: number) => {
      g.round.forEach((r: any, idx: number) => {
          myRounds.push(r);
      });
    });

    console.log('ROUNDS', myRounds);
  }

}
