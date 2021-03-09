import { Component, OnInit } from '@angular/core';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';

@Component({
  selector: 'app-pdf-viewer-screen',
  templateUrl: './pdf-viewer-screen.component.html',
  styleUrls: ['./pdf-viewer-screen.component.scss'],
})
export class PdfViewerScreenComponent implements OnInit {

  constructor(
    private document:DocumentViewer,
    private filechooser:FileChooser,
    private filePath:FilePath
  ) { }

  ngOnInit() {}

  openAndViewDocuments() {
    this.filechooser.open({
      mime:'application/pdf'
    }).then(data=>{
      const path = this.filePath.resolveNativePath(data)
      .then(newPath=>{
        console.log(newPath);
        const options: DocumentViewerOptions = {
          title: 'My PDF'
        }
        this.document.viewDocument(newPath, 'application/pdf', options)
      })
    })
  }

}
