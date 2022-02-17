import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from '../../interfaces';
import { SearchService } from '../../services/search.service';
import { finalize, Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';

export interface Users {
  incomplete_results: boolean;
  items: User[];
  total_count: number;
}
@Component({
  selector: 'app-users-block',
  templateUrl: './users-block.component.html',
  styleUrls: ['./users-block.component.scss'],
})
export class UsersBlockComponent implements OnInit, OnDestroy {
  private userSub!: Subscription;
  public users: User[] = [];

  constructor(
    private searchService: SearchService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService.getSearchUsers('username').subscribe((allData: Users) => {
      this.users = allData.items;
      console.log(this.users);
    });
    // this.userSub = this.searchService.$search.subscribe((name: string) => {
    //   if (name) {
    //     this.userService.user().subscribe((userGit) => {
    //       this.userService.getUser(userGit['url']).subscribe((user) => {
    //         this.users.push(user);
    //       });
    //     });
    //   }
    //   this.searchService.$users.next(this.users);
    // });
  }

  public submit() {
    // const value = this.form.control['controlname'].value
    this.userService.getSearchUsers('value').subscribe((data: Users) => {
      this.users = data.items;
    });
  }

  ngOnDestroy(): void {
    console.log('ngOnDestroy');
    if (this.userSub) this.userSub.unsubscribe();
  }
}
