import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from "../../interfaces";
import {SearchService} from "../../services/search.service";
import {Subscription} from "rxjs";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-users-block',
  templateUrl: './users-block.component.html',
  styleUrls: ['./users-block.component.scss']
})
export class UsersBlockComponent implements OnInit, OnDestroy {

  private userSub!: Subscription;
  public users: User[] = [];

  constructor(
    private searchService: SearchService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
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

  ngOnDestroy(): void {
    if (this.userSub)this.userSub.unsubscribe();
  }
}
