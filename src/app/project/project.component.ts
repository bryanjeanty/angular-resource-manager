import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';

import { ProjectService, ResourceService } from '../_services';
import { Record } from "../_models";

@Component({
    templateUrl: './project.component.html'
})
export class ProjectComponent implements OnInit {
    type: string = "";
    
    resourceIds: Array<any> = [];
    resourceKeys: Array<any> = [];
    resourceKeyValues: Array<any> = [];
    resourceDataTypes: Array<any> = [];
    
    projectIds: Array<any> = [];
    projectKeys: Array<any> = [];
    projectKeyValues: Array<any> = [];
    projectDataTypes: Array<any> = [];
    
    resourceTableForm: FormGroup;
    
    loading: boolean = false;
    
    constructor(
        private projectService: ProjectService,
        private resourceService: ResourceService,
        private record: Record,
        private formBuilder: FormBuilder
    ) {}
    
    ngOnInit() {
        this.resourceTableForm = this.formBuilder.group({});
        
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
                                this.resourceIds.push(dataValues[i]);
                            }
                            if (typeof dataValues[i] === "object") {
                                keysFilter.push(keys[i]);
                                valuesFilter.push(dataValues[i]["value"]);
                                dataTypeFilter.push(dataValues[i]["dataType"]);
                            }
                        }
                        
                        this.resourceKeys.push(keysFilter);
                        this.resourceKeyValues.push(valuesFilter);
                        this.resourceDataTypes.push(dataTypeFilter);
                    });
                    
                    this.resourceKeys = this.resourceKeys[0];
                    
                    let resourceFormControls: object = {};
                    
                    for (let i = 0; i < this.resourceKeyValues.length; i++) {
                        resourceFormControls[`${i}`] = new FormControl();
                    }
                    
                    this.resourceTableForm = this.formBuilder.group(resourceFormControls);
                    
                    this.loading = false;
                },
                error => {
                    console.error("GET RESOURCES ERROR", error);
                    this.loading = false;
                }
            );
        
        this.projectService
            .getAllProjectRecords()
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
                                this.projectIds.push(dataValues[i]);
                            }
                            if (typeof dataValues[i] === "object") {
                                keysFilter.push(keys[i]);
                                valuesFilter.push(dataValues[i]["value"]);
                                dataTypeFilter.push(dataValues[i]["dataType"]);
                            }
                        }
                        
                        this.projectKeys.push(keysFilter);
                        this.projectKeyValues.push(valuesFilter);
                        this.projectDataTypes.push(dataTypeFilter);
                    });
                    
                    this.projectKeys = this.projectKeys[0];
                    
                    this.loading = false;
                },
                error => {
                    console.error('GET PROJECTS ERROR', error);
                    this.loading = false;
                }
            );
    }
    
    transferRecords() {
        let resourceCheckBoxes = document.querySelectorAll(".rsc-check-box");
//        let newKeysArray = this.projectKeys;
//        let newValuesArray = [];
//        let newDataTypesArray = [];
//        
//        for (let i = 0; i < this.resourceKeys.length; i++) {
//            if (newKeysArray.includes(this.resourceKeys[i])) {                        
//                continue;
//            } else {
//                newKeysArray.push(this.resourceKeys[i]);
//            }
//        }
//        
//        for (let i = 0; i < this.projectKeyValues.length; i++) {
//            let newValuesArrayFilter = [];
//            let newDataTypesArrayFilter = [];
//            for (let j = 0; j < newKeysArray.length; j++) {
//                if (this.projectKeys.includes(newKeysArray[j])) {
//                    let colIndex = this.projectKeys.indexOf(newKeysArray[j]);
//                    newValuesArrayFilter.push(this.projectKeyValues[i][colIndex]);
//                    newDataTypesArrayFilter.push(this.projectDataTypes[i][colIndex]);
//                } else {
//                    newValuesArrayFilter.push(" ");
//                    newDataTypesArrayFilter.push(" ");
//                }
//            }
//            newValuesArray.push(newValuesArrayFilter);
//            newDataTypesArray.push(newDataTypesArrayFilter);
//        }

        for (let i = 0; i < resourceCheckBoxes.length; i++) {
            if (resourceCheckBoxes[i]["checked"]) {
                console.log(resourceCheckBoxes[i]["value"])
//                let rowIndex = resourceCheckBoxes[i]["value"];
//                let newValuesArrayFilter = [];
//                let newDataTypesArrayFilter = [];
//                for (let j = 0; j < newKeysArray.length; i++) {
//                    if (this.resourceKeys.includes(newKeysArray[j])) {
//                        let colIndex = this.resourceKeys.indexOf(newKeysArray[j]);
//                        newValuesArrayFilter.push(this.resourceKeyValues[rowIndex][colIndex]);
//                        newDataTypesArrayFilter.push(this.resourceDataTypes[rowIndex][colIndex]);
//                    } else {
//                        newValuesArrayFilter.push(" ");
//                        newDataTypesArrayFilter.push(" ");
//                    }
//                }
//                newValuesArray.push(newValuesArrayFilter);
//                newDataTypesArray.push(newDataTypesArrayFilter);
            }
        }
        
//        console.log(newKeysArray);
//        console.log("");
//        console.log(newValuesArray);
//        console.log("");
//        console.log(newDataTypesArray);
    }
}









