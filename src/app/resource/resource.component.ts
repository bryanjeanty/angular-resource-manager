import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { ResourceService } from '../_services';
import { Record } from "../_models";

@Component({
    templateUrl: './resource.component.html'
})
export class ResourceComponent implements OnInit {
    type = "resource";
    idsArray: Array<any> = [];
    keysArray: Array<any> = [];
    valuesArray: Array<any> = [];
    dataTypesArray: Array<any> = [];
    loading: boolean = false;
    
    constructor(
                private resourceService: ResourceService,
                private record: Record
                ) {}
    
    ngOnInit() {
        this.loading = true;
        this.resourceService
            .getAllResourceRecords()
            .pipe(first())
            .subscribe(
                data => {
                    console.log(data);
                    console.log("");
                    data.body.map(record => {
                        let keys = Object.keys(record);
                        let dataValues =  Object.values(record);
                        let keysFilter: Array<any> = [];
                        let valuesFilter: Array<any> = [];
                        let dataTypeFilter: Array<any> = [];
                        
                        for (let i = 0; i < dataValues.length; i++) {
                            if (typeof dataValues[i] === "number") {
                                this.idsArray.push(dataValues[i]);
                            }
                            if (typeof dataValues[i] === "object") {
                                keysFilter.push(keys[i]);
                                valuesFilter.push(dataValues[i]["value"]);
                                dataTypeFilter.push(dataValues[i]["dataType"]);
                            }
                        }
                        
                        this.keysArray.push(keysFilter);
                        this.valuesArray.push(valuesFilter);
                        this.dataTypesArray.push(dataTypeFilter);
                    });
                    
                    this.keysArray = this.keysArray[0];
                    
                    console.log(this.keysArray);
                    console.log("");
                    console.log(this.valuesArray);
                    console.log("");
                    console.log(this.dataTypesArray);
                    
                    this.loading = false;
                },
                error => {
                    console.error(error);
                    this.loading = false;
                }
            );
    }
    
    addNewColumn() {
        let newCol = prompt("Please enter name of new column!");
        
        if (newCol === null || newCol === "") {
            
            return;
            
        } else {        
            
            for (let i = 0; i < this.valuesArray.length; i++) {
                let keysString = this.keysArray.join(",") + "," + newCol;
                let valuesString = this.valuesArray[i].join(",") + "," + " ";
                let dataTypesString = this.dataTypesArray[i].join(",") + "," + " ";

                this.record.setType(this.type);
                this.record.setKeys(keysString);
                this.record.setKeyValues(valuesString);
                this.record.setDataTypes(dataTypesString);

                this.loading = true;

                this.resourceService
                    .updateResourceRecord(this.idsArray[i], this.record)
                    .pipe(first())
                    .subscribe(
                        data => {
                            console.log(this.record);
                            console.log(data);
                            this.loading = false;
                            location.reload();
                        },
                        error => {
                            console.error(error);
                            this.loading = false
                        }
                    )
            }
        }
    }
}