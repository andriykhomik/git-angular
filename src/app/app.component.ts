import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from './services/user.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from './services/search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  name!: string;
  userSub!: Subscription;
  currentUrl!: string;

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      search: new FormControl(null, [Validators.required]),
    });

    this.userService.getSearchUsers('a').subscribe((data) => {
      console.log(data);
    });
  }

  submit() {
    this.name = this.form.controls['search'].value;

    if (this.name && this.name.trim()) {
      if (this.router.url === '/table') {
        this.router.navigate(['/table']);
      } else {
        this.router.navigate(['/blocks']);
      }
      this.searchService.addSearchName(this.name);
    }
    this.form.reset();
  }

  ngOnDestroy(): void {
    if (this.userSub) this.userSub.unsubscribe();
  }
}
