import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contract } from 'src/app/models/ContractModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContractService {

  private url = environment.api_url
  private flag = 'contract'

  constructor(
    private http: HttpClient
  ) { }

  listAllContract() {
    return this.http.get<Contract[]>(`${this.url}/${this.flag}`);
  }

  contractById(contract_id: number) {
    return this.http.get<Contract>(`${this.url}/${this.flag}/${contract_id}`);
  }

  createContract(contract: Contract, id_player: number, id_team: number) {
    return this.http.post<Contract>(`${this.url}/${this.flag}/created/${id_player}/${id_team}`, contract);
  }

  updateContract(id_contract: number, id_player: number, id_team: number, contract: Contract) {
    return this.http.put<Contract>(`${this.url}/${this.flag}/updated/${id_contract}/${id_player}/${id_team}`, contract);
  }

  removeContract(id_contract: number) {
    return this.http.delete<Contract>(`${this.url}/${this.flag}/${id_contract}`);
  }
}
