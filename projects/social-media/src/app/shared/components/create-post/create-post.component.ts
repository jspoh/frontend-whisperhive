import { Component, HostListener, Input, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { PostForm } from '../../../models/post-form';
import { DataService } from '../../../services/data.service';
import { Subject, take, BehaviorSubject } from 'rxjs';
import { User } from '../../../models/user';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  @Input() displayUser: string = '';
  @Input() updateData$: Subject<void> = new Subject<void>();

  // rich text editor config
  htmlText = '';
  stayAnon = true;

  quillStyle = {
    background: 'rgb(241,245,249)',
    'border-width': '0px 0px 0px 0px',
    'font-size': '16px',
  };

  quillFormats = [
    // 'background',
    'bold',
    // 'color',
    // 'font',
    'code',
    'italic',
    // 'link',
    // 'size',
    'strike',
    'script',
    'underline',
    // 'blockquote',
    // 'header',
    'indent',
    'list',
    'align',
    'direction',
    'code-block',
    'formula',
    // 'image',
    // 'video'
  ];

  quillConfig = {
    //toolbar: '.toolbar',
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['code-block'],
        // ['link'],
      ],
    },
  };

  constructor(
    public userService: UserService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {}

  onContextMenu(e: any) {
    // e.preventDefault();
  }

  // @HostListener('paste', ['$event'])
  onPaste(e: ClipboardEvent) {
    // console.log('paste', e);
  }

  // @HostListener('dragover', ['$event'])
  // @HostListener('dragleave', ['$event'])
  @HostListener('drop', ['$event'])
  onDragAndDrop(e: DragEvent) {
    e.preventDefault();
  }

  onPost() {
    const payload: PostForm = {
      anon: this.stayAnon,
      comment: false,
      comment_on: null,
      content: this.htmlText,
      from: this.userService.username$.getValue()
        ? this.userService.username$.getValue()
        : null,
      to: this.displayUser,
    };

    this.dataService
      .createPost(payload)
      .pipe(take(1))
      .subscribe({
        next: (res: any) =>
          // have to .next() an item of type User or frontend errors will be logged in console
          // no real effect on usage though
          this.updateData$.next(),
        // error: (err) => console.error(err),
      });
    this.htmlText = '';
  }

  onAnonToggle() {
    if (this.userService.userIsLoggedIn$.getValue()) return;

    alert('Please log in to disable anonymity');
  }
}
