import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from "../../services/user.service";
import {User} from "../../interfaces";
import {SearchService} from "../../services/search.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent implements OnInit, OnDestroy {

  users: User[] = [];
  userSub!: Subscription;

  constructor(
    private userService: UserService,
    private searchService: SearchService,
  ) { }


  ngOnInit(): void {
    this.searchService.$users.subscribe(users => {
      this.users = users;
    })
    if (!this.users.length){
      this.userSub = this.searchService.$search.subscribe((name: string) => {
        if (name){
          this.userService.user().subscribe(userGit=> {
            this.userService.getUser(userGit['url']).subscribe(user => {
              this.users.push(user);
            });
          });
        }
        this.searchService.$users.next(this.users);
      })
    }
    // this.userService.getUsers('')
  }

  ngOnDestroy(): void {
    if (this.userSub)this.userSub.unsubscribe();
  }

}
