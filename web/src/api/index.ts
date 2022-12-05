const apiUrl = process.env.REACT_APP_API_URL || "";

export interface Clinic {
  id: number;
  name: string;
}

export interface Patient {
  id: number;
  clinicId: number;
  dateOfBirth: string;
  firstName: string;
  lastName: string;
}

const apiFetch = async (endpoint: string) => {
  const response = await fetch(`${apiUrl}/${endpoint}`);

  if (!response.ok) {
    throw Error();
  }

  return response.json();
};

export const getClinics = async (): Promise<Clinic[]> => {
  return apiFetch("clinics");
};

export const getPatientsByClinicId = async (id: number): Promise<Patient[]> => {
  return apiFetch(`patients/${id}`);
};
