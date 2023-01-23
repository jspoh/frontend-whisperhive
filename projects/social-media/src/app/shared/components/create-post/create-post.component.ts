import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  @Input() userIsLoggedIn = false;

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

  constructor() {}

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
    const payload = {
      stayAnon: this.stayAnon,
      postContent: this.htmlText,
    };

    console.log(payload);
    this.htmlText = '';
  }
}
