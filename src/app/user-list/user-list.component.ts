import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ExportService } from '../export.service';
import { HttpService } from '../http.service';
import { Post } from '../post.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  path: string = 'posts';
  posts: Post[] = [];
  fileName: string = ' Post Lists';
  customCols: any[];

  constructor(
    private httpService: HttpService,
    private exportService: ExportService,
    private translate: TranslateService,
  ) { }

  ngOnInit(): void {
    this.initCustomExportCols();
    this.getPost(this.path);
  }

  initCustomExportCols() {
    this.customCols = [
      { key: 'id', header: 'ID' },
      { key: 'title', header: 'TITLE' },
      { key: 'body', header: 'BODY' },
    ];
  }


  getPost(path: string) {
    this.httpService.get(path).subscribe(res => {
      this.posts = res;
    });
  }

  downloadExcel() {
    this.exportService.exportAsExcelFile(this.posts, this.fileName, this.customCols);
  }

}
