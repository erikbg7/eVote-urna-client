import { Component, OnInit } from '@angular/core';
import Table from '../../models/Table';
import { RestService } from '../rest.service';
import { restoreView } from '@angular/core/src/render3';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private rest: RestService) {
    this.tables = [];
    this.newTableCompBool = false;
    this.selectedTableIndex = -1;
  }
  newTableCompBool: boolean;
  tables: Table[];
  selectedTableIndex: number;

  showNewTableComp() {
    this.newTableCompBool = !this.newTableCompBool;
  }

  updateTables() {
    this.rest.getTables().subscribe((tables) => {
      this.tables = tables;
      console.log(this.tables);
    });
  }

  selectTable(index: number) {
    this.selectedTableIndex = index;
  }

  addedTable() {
    this.newTableCompBool = false;
    this.updateTables();
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
    this.updateTables();
  }

}
