import { Component, OnInit } from '@angular/core';
import Table from 'src/models/Table';
import { RestService } from '../rest.service';
import PublicKey from 'src/models/publicKey';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private rest: RestService) {
    this.tables = [];
  }

  tables: Table[];
  selectedTableIndex: number;

  updateTables() {
    this.rest.getTables().subscribe((tables) => {
      for (let x = 0; x < tables.length; x++) {
        if (tables[x].state === 4) {
          this.rest.getTable(tables[x].tableId).subscribe((table) => {
            tables[x].publicKey = new PublicKey();
            tables[x].publicKey.keyNumber = table.publicKey;
            tables[x].publicKey.mod = table.publicKeyMod;
            this.tables.push(tables[x]);
          });
        }
      }
      console.log(this.tables);
    });
  }

  selectTable(index: number) {
    this.selectedTableIndex = index;
  }

  ngOnInit() {
    this.updateTables();
  }

}
