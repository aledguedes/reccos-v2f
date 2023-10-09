import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FederationService } from 'src/app/services/federation/federation.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.scss']
})
export class LoginUserComponent {

  constructor(
    private router: Router,
    private federationService: FederationService
  ) { }

  loginUser() {
    this.federationService.federationById(1).subscribe({
      next: (data) => {
        console.log('FEDERATION BY ID', data);
        localStorage.setItem('reccos-federation', JSON.stringify(data));

        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.log('USER BY ID ERR', err);
      }
    });
  }

}
