import { Component, OnInit, Input } from '@angular/core';
import Table from 'src/models/Table';
import { RestService } from '../rest.service';
import {saveAs} from 'file-saver';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor(private rest: RestService, private toastr: ToastrService) {
    this.parts = 2;
    this.threshold = 2;
    this.results = [];
   }

  @Input() table: Table;

  parts: number;
  threshold: number;
  part: string;
  results: number[];

  loadPart(evt) {
    const files = <FileList>evt.target.files;
    if (files[0]) {
      const reader = new FileReader();
      reader.onload = function(event) {
        console.log(reader.result);
        this.part = <string>reader.result;
      }.bind(this);
      reader.readAsText(files[0]);
    }
  }

  getResult() {
    this.rest.results(this.table.tableId).subscribe((resp) => {
      this.results = resp.results;
      this.toastr.success('The results are calculated', 'Succes!');
      this.updateTable();
    }, (err) => {
      this.toastr.error('It have some problem', 'Ooops');
    });
  }

  recoverKey() {
    this.rest.recoverKey(this.table.tableId).subscribe((resp) => {
      this.toastr.success('The key is recovered', 'Succes!');
      this.updateTable();
    }, (err) => {
      this.toastr.error('It have some problem', 'Ooops');
    });
  }

  pushPart() {
    this.rest.pushPart(this.table.tableId, this.part).subscribe((resp) => {
      this.toastr.success('Pushed a private key part', 'Succes!');
      this.updateTable();
    }, (err) => {
      this.toastr.error('It have some problem', 'Ooops');
    });
  }

  splitKey() {
    this.rest.splitKey(this.table.tableId, this.parts, this.threshold).subscribe((resp) => {
      this.toastr.success('Split the private table Key', 'Succes!');
      this.updateTable();
    }, (err) => {
      this.toastr.error('It have some problem', 'Ooops');
    });
  }

  getKeyPart() {
    this.rest.getPart(this.table.tableId).subscribe((resp) => {
      const blob = new Blob([resp.part], { type: 'plain/text', endings: 'transparent'});
      saveAs(blob, 'part.txt');
      this.toastr.success('Get a private key part', 'Succes!');
      this.updateTable();
    }, (err) => {
      this.toastr.error('It have some problem', 'Ooops');
    });
  }

  startVoting() {
    this.rest.startVoting(this.table.tableId).subscribe((resp) => {
      this.toastr.success('The voting is started', 'Succes!');
      this.updateTable();
    }, (err) => {
      this.toastr.error('It have some problem', 'Ooops');
    });
  }

  stopVoting() {
    this.rest.stopVoting(this.table.tableId).subscribe((resp) => {
      this.toastr.success('The voting is stop', 'Succes!');
      this.updateTable();
    }, (err) => {
      this.toastr.error('It have some problem', 'Ooops');
    });
  }

  updateTable() {
    this.rest.getTable(this.table.tableId).subscribe((resp) => {
      this.table.state = resp.state;
    });
  }

  stateToString(state: number): string {
    switch (state) {
      case 0:
      return 'init';

      case 1:
      return 'split key';

      case 2:
      return 'shareKey';

      case 3:
      return 'all parts populated';

      case 4:
      return 'voting';

      case 5:
      return 'recovering parts';

      case 6:
      return 'recovered needed parts';

      case 7:
      return 'recovered key';

      case 8:
      return 'calculated results';
    }
  }


  ngOnInit() {
  }

}
