import { SyntheticEvent, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import type {
  NewEntry,
  EntryType,
  HealthCheckRating,
  Diagnosis,
} from "../types";
interface Props {
  onSubmit: (entry: NewEntry) => void;
  onCancel: () => void;
  diagnoses: Diagnosis[];
}

const AddEntryForm = ({ onSubmit, onCancel, diagnoses }: Props) => {
  const [type, setType] = useState<EntryType>("HealthCheck");

  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [specialist, setSpecialist] = useState("");
  const [diagnosisCodes, setDiagnosisCodes] = useState<string[]>([]);

  //health
  const [healthCheckRating, setHealthCheckRating] =
    useState<HealthCheckRating>(0);

  // occupation
  const [employerName, setEmployerName] = useState("");
  const [sickLeaveStartDate, setSickLeaveStartDate] = useState("");
  const [sickLeaveEndDate, setSickLeaveEndDate] = useState("");

  // hospital
  const [dischargeDate, setDischargeDate] = useState("");
  const [dischargeCriteria, setDischargeCriteria] = useState("");

  const handleTypeChange = (event: SelectChangeEvent<EntryType>) => {
    setType(event.target.value as EntryType);
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const baseEntry = {
      description,
      date,
      specialist,
      diagnosisCodes,
    };

    switch (type) {
      case "HealthCheck":
        onSubmit({
          ...baseEntry,
          type: "HealthCheck",
          healthCheckRating: Number(healthCheckRating) as HealthCheckRating,
        });
        break;

      case "OccupationalHealthcare":
        onSubmit({
          ...baseEntry,
          type: "OccupationalHealthcare",
          employerName,
          ...(sickLeaveStartDate && sickLeaveEndDate
            ? {
                sickLeave: {
                  startDate: sickLeaveStartDate,
                  endDate: sickLeaveEndDate,
                },
              }
            : {}),
        });
        break;

      case "Hospital":
        onSubmit({
          ...baseEntry,
          type: "Hospital",
          discharge: {
            date: dischargeDate,
            criteria: dischargeCriteria,
          },
        });
        break;
    }
  };

  return (
    <Card variant="outlined" sx={{ mb: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          New Entry
        </Typography>

        <Box component="form" onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <FormControl fullWidth size="small">
              <InputLabel id="entry-type-label">Entry Type</InputLabel>
              <Select
                labelId="entry-type-label"
                value={type}
                label="Entry Type"
                onChange={handleTypeChange}
              >
                <MenuItem value="HealthCheck">Health Check</MenuItem>
                <MenuItem value="OccupationalHealthcare">
                  Occupational Healthcare
                </MenuItem>
                <MenuItem value="Hospital">Hospital</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Description"
              fullWidth
              required
              size="small"
              value={description}
              onChange={({ target }) => setDescription(target.value)}
            />

            <TextField
              label="Date"
              type="date"
              fullWidth
              required
              size="small"
              value={date}
              onChange={({ target }) => setDate(target.value)}
            />

            <TextField
              label="Specialist"
              fullWidth
              required
              size="small"
              value={specialist}
              onChange={({ target }) => setSpecialist(target.value)}
            />

            <FormControl fullWidth size="small">
              <InputLabel id="diagnosis-codes-label">
                Diagnosis Codes
              </InputLabel>

              <Select
                labelId="diagnosis-codes-label"
                multiple
                value={diagnosisCodes}
                label="Diagnosis Codes"
                onChange={(event) => {
                  const value = event.target.value;

                  setDiagnosisCodes(
                    typeof value === "string" ? value.split(",") : value,
                  );
                }}
                renderValue={(selected) => selected.join(", ")}
              >
                {diagnoses.map((diagnosis) => (
                  <MenuItem key={diagnosis.code} value={diagnosis.code}>
                    {diagnosis.code} — {diagnosis.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {type === "HealthCheck" && (
              <FormControl fullWidth size="small">
                <InputLabel id="health-check-rating-label">
                  Health Check Rating
                </InputLabel>
                <Select
                  labelId="health-check-rating-label"
                  value={healthCheckRating}
                  label="Health Check Rating"
                  onChange={(e) =>
                    setHealthCheckRating(
                      Number(e.target.value) as HealthCheckRating,
                    )
                  }
                >
                  <MenuItem value={0}>0 - Healthy</MenuItem>
                  <MenuItem value={1}>1 - Low Risk</MenuItem>
                  <MenuItem value={2}>2 - High Risk</MenuItem>
                  <MenuItem value={3}>3 - Critical Risk</MenuItem>
                </Select>
              </FormControl>
            )}

            {type === "OccupationalHealthcare" && (
              <>
                <TextField
                  label="Employer Name"
                  fullWidth
                  required
                  size="small"
                  value={employerName}
                  onChange={({ target }) => setEmployerName(target.value)}
                />

                <Typography variant="subtitle2" sx={{ mt: 1 }}>
                  Sick Leave (Optional)
                </Typography>
                <Stack direction="row" spacing={2}>
                  <TextField
                    label="Start Date"
                    type="date"
                    fullWidth
                    size="small"
                    value={sickLeaveStartDate}
                    onChange={({ target }) =>
                      setSickLeaveStartDate(target.value)
                    }
                  />
                  <TextField
                    label="End Date"
                    type="date"
                    fullWidth
                    size="small"
                    value={sickLeaveEndDate}
                    onChange={({ target }) => setSickLeaveEndDate(target.value)}
                  />
                </Stack>
              </>
            )}

            {type === "Hospital" && (
              <>
                <Typography variant="subtitle2" sx={{ mt: 1 }}>
                  Discharge Details
                </Typography>
                <TextField
                  label="Discharge Date"
                  type="date"
                  fullWidth
                  required
                  size="small"
                  value={dischargeDate}
                  onChange={({ target }) => setDischargeDate(target.value)}
                />
                <TextField
                  label="Discharge Criteria"
                  fullWidth
                  required
                  size="small"
                  value={dischargeCriteria}
                  onChange={({ target }) => setDischargeCriteria(target.value)}
                />
              </>
            )}

            <Stack
              direction="row"
              spacing={2}
              justifyContent="space-between"
              sx={{ mt: 2 }}
            >
              <Button color="error" variant="outlined" onClick={onCancel}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Add Entry
              </Button>
            </Stack>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default AddEntryForm;
