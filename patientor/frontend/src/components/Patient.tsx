import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Alert,
  Box,
  Card,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";

import patientService from "../services/patients";
import type { Patient } from "../types";
import EntryDetails from "./EntryDetails";

const PatientDetails = () => {
  const { id } = useParams<{ id: string }>();

  const [patient, setPatient] = useState<Patient | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    Promise.all([patientService.getPatient(id)])
      .then(([patientData]) => {
        setPatient(patientData);
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
    <Box>
      <Typography variant="h4" gutterBottom>
        {patient.name}
      </Typography>

      <Card>
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

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Entries
          </Typography>

          {patient.entries.map((entry) => (
            <EntryDetails key={entry.id} entry={entry} />
          ))}
        </CardContent>
      </Card>
    </Box>
  );
};

export default PatientDetails;
