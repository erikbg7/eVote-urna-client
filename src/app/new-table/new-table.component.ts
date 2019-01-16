import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import Table from '../../models/Table';
import PublicKey from 'src/models/publicKey';
import { RestService } from '../rest.service';
import {NewTableReq, ElectionsKey} from '../../models/NewTableReq';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-new-table',
  templateUrl: './new-table.component.html',
  styleUrls: ['./new-table.component.css']
})
export class NewTableComponent implements OnInit {

  @Input() tables: Table[];
  @Output() addedTable = new EventEmitter<void>();
  table: Table;

  constructor(private rest: RestService, private toastr: ToastrService) {
    this.table = new Table();
  }

  ngOnInit() {
  }

  setCandidate(candidate: string, i: number) {
    this.table.candidates[i] = candidate;
  }

  loadElectionKey(evt) {
    const files = <FileList>evt.target.files;
    if (files[0]) {
      const reader = new FileReader();
      reader.onload = function(event) {
        console.log(reader.result);
        const publicKey = JSON.parse(<string>reader.result) as PublicKey;
        this.table.publicKey = publicKey;
      }.bind(this);
      reader.readAsText(files[0]);
    }
  }

  sendTable() {
    const reqNewTable = new NewTableReq();
    reqNewTable.candidates = this.table.candidates;
    reqNewTable.electionsKey = new ElectionsKey();
    reqNewTable.electionsKey.keyNumber = this.table.publicKey.keyNumber;
    reqNewTable.electionsKey.mod = this.table.publicKey.mod;
    reqNewTable.tableId = this.table.tableId;
    this.rest.newTable(reqNewTable).subscribe((res) => {
      this.toastr.info('Added new table', 'Succes!');
      this.addedTable.next();
    }, (err) => {
      this.toastr.error('It have some problem', 'Ooops!');
    });
  }
}
