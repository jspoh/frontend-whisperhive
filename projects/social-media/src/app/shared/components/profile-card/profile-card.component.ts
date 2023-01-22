import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../models/user';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
})
export class ProfileCardComponent implements OnInit {
  @Input() userData: User = {
    username: '',
    data: { followingList: [], followerList: [], posts: [] },
  };

  /**
   * This input only takes in 'lg', 'md', 'sm'
   */
  @Input() cardSize = 'lg';

  constructor() {}

  ngOnInit(): void {}
}
