import { Component, OnInit } from '@angular/core';
import {UserService} from "../../services/user.service";
import {ActivatedRoute} from "@angular/router";
import {User} from "../../interfaces";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  user!: User;

  constructor(
    private userService: UserService,
    private activatedRout: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRout.params.subscribe(login => {
      console.log(login['username']);
      this.userService.getUser(`https://api.github.com/users/${login['username']}`).subscribe(user=> {
        this.user = user;
      })
    })
  }

}
