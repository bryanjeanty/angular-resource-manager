import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload';
import { first } from 'rxjs/operators';

import { ResourceService } from '../_services';
import { Record } from "../_models";
import { environment } from '../../environments/environment';

const uploadUrl = `${environment.apiUrl}/auth/uploads`;

@Component({
    templateUrl: './resource.component.html'
})
export class ResourceComponent implements OnInit {
    type = "resource";
    
    idsArray: Array<any> = [];
    keysArray: Array<any> = [];
    valuesArray: Array<any> = [];
    dataTypesArray: Array<any> = [];
    
    tableForm: FormGroup;
    
    loading: boolean = false;
    
    uploader: FileUploader = new FileUploader({
        url: uploadUrl,
        method: 'POST',
        itemAlias: 'file'
    })
    
    constructor(
                private resourceService: ResourceService,
                private record: Record,
                private formBuilder: FormBuilder,
                private router: Router
                ) {}
    
    ngOnInit() {
        this.uploader.onBeforeUploadItem = (item) => {
          item.withCredentials = false;
          this.uploader.authToken = localStorage.getItem('JWT');
        }
        this.uploader.onCompleteItem = (item, response, status, headers) => {
            console.log('Item', item);
            console.log("");
            console.log('Response', response);
            this.router.navigate(['/project']);
        }
        
        this.tableForm = this.formBuilder.group({});
        
        this.loading = true;
        
        this.resourceService
            .getAllResourceRecords()
            .pipe(first())
            .subscribe(
                data => {
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
                    
                    this.loading = false;
                },
                error => {
                    console.error("GET RESOURCES ERROR", error);
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
                            this.loading = false;
                            location.reload();
                        },
                        error => {
                            console.error("CREATE COLUMN ERROR", error);
                            this.loading = false
                        }
                    )
            }
        }
    }
    
    addNewRow() {
        let newRow = document.createElement('tr');
        
        let tableControlsObject = {};
        
        for (let i = 0; i < this.keysArray.length; i++) {
            
            tableControlsObject[`${this.keysArray[i]}`] = new FormControl();
            
            newRow.innerHTML += `<td style='border: 1px solid black'>
                                    <input id='${this.keysArray[i]}-control' formControlName='${this.keysArray[i]}' type='text' />
                                </td>`;
        }
        
        this.tableForm = this.formBuilder.group(tableControlsObject);
        
        newRow.innerHTML += `<button type='submit'>
                                Submit
                            </button>`;
        
        let tableBody = document.getElementById("rsc-tbl-body");
        let addRowBtn = document.getElementById("rsc-add-row-btn");
        
        addRowBtn.style.display = "none";
        tableBody.appendChild(newRow);
    }
    
    submitRecord() {
        let tableControlNames = Object.keys(this.tableForm.controls);
        let newValuesArray = [];
        let newDataTypesArray = [];
        
        for (let i = 0; i < tableControlNames.length; i++) {
            let formControl = document.getElementById(`${tableControlNames[i]}-control`);
            
            newValuesArray.push(formControl["value"]);
            
            if (isNaN(parseInt(formControl["value"])) || isNaN(parseFloat(formControl["value"]))) {
                
                newDataTypesArray.push("text");
                
            } else {
                
                newDataTypesArray.push("number");
            }
        }
        
        let keysString = this.keysArray.join(",");
        let valuesString = newValuesArray.join(",");
        let dataTypesString = newDataTypesArray.join(",");
        
        this.record.setType(this.type);
        this.record.setKeys(keysString);
        this.record.setKeyValues(valuesString);
        this.record.setDataTypes(dataTypesString);
        
        this.loading = true;
        
        this.resourceService
            .createResourceRecord(this.record)
            .pipe(first())
            .subscribe(
                data => {
                    this.loading = false;
                    location.reload();
                },
                error => {
                    console.error('CREATE RESOURCE ERROR', error);
                    this.loading = false;
                }
            )
    }
}