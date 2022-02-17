import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Params } from '@angular/router';
import { User } from '../../interfaces';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  user$!: Observable<User>;

  constructor(
    private userService: UserService,
    private activatedRout: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  private getUser(): void {
    this.activatedRout.params.subscribe((login: Params) => {
      this.user$ = this.userService.getUser(login['username']);
    });
  }
}
