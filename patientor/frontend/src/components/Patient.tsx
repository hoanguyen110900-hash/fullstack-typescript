import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Alert,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Typography,
  Button,
} from "@mui/material";

import patientService from "../services/patients";
import diagnosesService from "../services/diagnoses";
import type { Patient, NewEntry, Diagnosis } from "../types";
import EntryDetails from "./EntryDetails";
import AddEntryForm from "./AddEntry";

const PatientDetails = () => {
  const { id } = useParams<{ id: string }>();

  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  const addEntry = async (entry: NewEntry) => {
    if (!patient) return;

    try {
      const addedEntry = await patientService.addEntry(patient.id, entry);

      setPatient({
        ...patient,
        entries: patient.entries.concat(addedEntry),
      });
      setShowForm(false);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unknown error occurred while adding entry.");
      }
    }
  };

  useEffect(() => {
    if (!id) return;

    Promise.all([
      patientService.getPatient(id),
      diagnosesService.getDiagnoses(),
    ])
      .then(([patientData, diagnosisData]) => {
        setPatient(patientData);
        setDiagnoses(diagnosisData);
      })
      .catch(() => {
        setError("Failed to fetch patient information");
      });
  }, [id]);

  if (!id) {
    return <Alert severity="error">Patient ID is missing</Alert>;
  }

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (!patient) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h4" gutterBottom>
        {patient.name}
      </Typography>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="body1">
            <strong>Gender:</strong> {patient.gender}
          </Typography>

          <Typography variant="body1">
            <strong>Date of birth:</strong> {patient.dateOfBirth}
          </Typography>

          <Typography variant="body1">
            <strong>Occupation:</strong> {patient.occupation}
          </Typography>

          <Typography variant="body1">
            <strong>SSN:</strong> {patient.ssn}
          </Typography>
        </CardContent>
      </Card>
      {showForm ? (
        <AddEntryForm
          onSubmit={addEntry}
          onCancel={() => setShowForm(false)}
          diagnoses={diagnoses}
        />
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowForm(true)}
          sx={{ mb: 3 }}
        >
          Add New Entry
        </Button>
      )}

      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Entries
      </Typography>

      {patient.entries && patient.entries.length > 0 ? (
        patient.entries.map((entry) => (
          <EntryDetails key={entry.id} entry={entry} />
        ))
      ) : (
        <Typography variant="body2" color="textSecondary">
          No entries found.
        </Typography>
      )}
    </Box>
  );
};

export default PatientDetails;
