export interface User {
    _id: string;
    fullname: string;
    email?: string;
    createdAt?: Date;
}

export interface Specialty {
    _id: string;
    specialty: string;
}

export interface Hour {
    start: Date;
    end: Date;
    occupied: boolean;
    _id: string;
}

export interface Disponibility {
    date: Date;
    hours: Hour[];
    _id: string;
}

export interface Data {
    _id: string;
    specialty: Specialty;
    user: User;
    disponibility: Disponibility[];
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}

export interface Consultation {
    _id: string;
    specialty: Specialty;
    timestamp: Date;
    pacient: any;
    medic: any;
    status: 'por realizar' | 'realizada' | 'falhada' | 'cancelada';
    urgency: "low" | "medium" | "high";
    description: string;
}