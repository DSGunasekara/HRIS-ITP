import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Vehicles } from 'models/vehicles.model';
import { VehiclesServices } from 'service/vehicle.service';

@Component({
  selector: 'app-add-vehicle',
  templateUrl: './add-vehicle.component.html',
  styleUrls: ['./add-vehicle.component.css']
})
export class AddVehicleComponent implements OnInit {
  @ViewChild('vehiForm', {static: false}) addVehicleForm: NgForm;
  nicInvalid: boolean = true;
  mode: string = "create";
  nic : string;
  vehicleID: string;
  vehicleDetails: Vehicles;
  vehicles: Vehicles = {
    id:'',
    vehicleNumber:'',
    vehicleType: '',
    vehicleChaseNumber: '',
    vehicleEngineNumber:'',
    manufactureDate: '',
    vehicleColor: '',
    vehiclePurchaseDate: '',
    vehicleOpenMileage: '',
    insuranceType: '',
    vehicleRegisteredDistrict: '',
    nextLicenseRenewalDate: '',
    vehiclePreviousOwner: '',
    NIC: '',
    contactNumber: '',
    address: ''
  }

  constructor(private router: Router, private vehicleService: VehiclesServices, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(((paramMap: ParamMap) => {
      if (paramMap.has("vehicleid")) {
        this.mode = "edit";
        this.vehicleID = paramMap.get("vehicleid");
        this.vehicleDetails = this.vehicleService.getVehicleID(this.vehicleID);
      } else {
        this.mode = "create";
        this.vehicleID = null;
      }

    }))
  }

  onSubmit(){
    this.vehicles.id = this.vehicleID;
    this.vehicles.vehicleNumber = this.addVehicleForm.value.vehicleNumber;
    this.vehicles.vehicleType = this.addVehicleForm.value.vehicleType;
    this.vehicles.vehicleChaseNumber = this.addVehicleForm.value.vehicleChaseNumber;
    this.vehicles.vehicleEngineNumber = this.addVehicleForm.value.vehicleEngineNumber;
    this.vehicles.manufactureDate = this.addVehicleForm.value.manufactureDate;
    this.vehicles.vehicleColor = this.addVehicleForm.value.vehicleColor;
    this.vehicles.vehiclePurchaseDate = this.addVehicleForm.value.vehiclePurchaseDate;
    this.vehicles.vehicleOpenMileage = this.addVehicleForm.value.vehicleOpenMileage;
    this.vehicles.insuranceType = this.addVehicleForm.value.insuranceType;
    this.vehicles.vehicleRegisteredDistrict = this.addVehicleForm.value.vehicleRegisteredDistrict;
    this.vehicles.nextLicenseRenewalDate = this.addVehicleForm.value.nextLicenseRenewalDate;
    this.vehicles.vehiclePreviousOwner = this.addVehicleForm.value.vehiclePreviousOwner;
    this.vehicles.NIC = this.addVehicleForm.value.NIC;
    this.vehicles.contactNumber = this.addVehicleForm.value.contactNumber;
    this.vehicles.address = this.addVehicleForm.value.address;

    if (this.mode === "create") {
      this.vehicleService.addVehicle(this.vehicles);
      this.router.navigate(['../view/all'], { relativeTo: this.route });
    } else {
      this.vehicleService.updateVehicle(this.vehicles);
      this.router.navigate(['../../view/all'], { relativeTo: this.route });
    }


  }

  //NIC validation method
  nicValidate(nic: string){
    if(nic.endsWith("V") && nic.length == 10){
      this.nicInvalid = false;
      console.log(this.nicInvalid);
    }else{
      this.nicInvalid = true;
    }

  }

}
