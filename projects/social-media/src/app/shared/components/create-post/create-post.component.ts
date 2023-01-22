import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  @Input() userIsLoggedIn = false;

  // rich text editor config
  quillStyle = {
    background: 'rgb(241,245,249)',
    'border-width': '0px 0px 0px 0px',
    'font-size': '16px',
  };

  htmlText = '';
  stayAnon = true;

  quillConfig = {
    //toolbar: '.toolbar',
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['code-block'],
        ['link'],
      ],
    },
  };

  constructor() {}

  ngOnInit(): void {}

  onContextMenu(e: any) {
    e.preventDefault();
  }

  onPost() {}
}
