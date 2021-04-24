import { PatientTreatment } from './patient-treatment';
import { PatientDocument } from './patient-document';
export interface Patient {
    id?: string;
    firstName: string;
    lastName: string;
    gender?: string;
    allergies?: string;
    height?: string;
    weight?: number;
    lastIncome?: string;
    lastSubject?: string;
    bloodGroup?: number;
    socialNumber?: string;
    notes?: string;
    documents?: PatientDocument;
    treatments?: PatientTreatment[];
}
