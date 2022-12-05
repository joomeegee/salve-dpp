import { useState } from "react";
import { getPatientsByClinicId, Patient } from "../../api";
import { Clinics } from "./Clinics";
import { Patients } from "./Patients";

const i18n = {
  title: "Patient Clinics",
};

export const Main = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [patientsError, setPatientsError] = useState(false);
  const [patientsLoading, setPatientsLoading] = useState(true);
  const [showPatients, setShowPatients] = useState(false);

  const handleGetPatients = async (id: number) => {
    if (!showPatients) {
      setShowPatients(true);
    }

    setPatientsLoading(true);

    try {
      const data = await getPatientsByClinicId(id);

      setPatients(data);
    } catch {
      setPatientsError(true);
    } finally {
      setPatientsLoading(false);
    }
  };

  return (
    <>
      <h1>{i18n.title}</h1>

      <Clinics handleGetPatients={handleGetPatients} />

      {showPatients ? (
        <Patients
          data={patients}
          error={patientsError}
          loading={patientsLoading}
        />
      ) : null}
    </>
  );
};
