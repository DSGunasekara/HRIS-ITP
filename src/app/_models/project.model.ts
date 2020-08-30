export  interface IProject {
    _id:string;
    projectId:string;
    name: string;
    location: string;
    startDate:Date;
    duration:string;
    supervisor: any;
    consultant: any;
    employees: any;

    clientName: string;
    clientPhone: string;
    clientAddress: string;
}