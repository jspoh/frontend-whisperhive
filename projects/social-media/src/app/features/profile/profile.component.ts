import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { map, takeUntil, Subject } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userData: any;

  unsubscribe$ = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.dataService
      .getUser(this.activatedRoute.snapshot.url[0].path)
      .pipe(
        map((response: any) => (this.userData = response)),
        takeUntil(this.unsubscribe$)
      )
      .subscribe({
        next(res) {},
        error(err) {},
        complete() {},
      });
  }
}
