import { Card, CardContent, Typography, Box } from "@mui/material";
import { HealthAndSafety, LocalHospital, Work } from "@mui/icons-material";
import type { Entry } from "../types";

interface Props {
  entry: Entry;
}

const getHealthCheckEmoji = (rating: number): string => {
  switch (rating) {
    case 0:
      return "😎 Healthy";
    case 1:
      return "🙂 Low risk";
    case 2:
      return "😟 High risk";
    case 3:
      return "🚨 Critical risk";
    default:
      return "❓ Unknown";
  }
};

const EntryDetails = ({ entry }: Props) => {
  switch (entry.type) {
    case "HealthCheck":
      return (
        <Card variant="outlined" sx={{ mb: 2 }}>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <HealthAndSafety />
              <Typography variant="h6">Health Check</Typography>
            </Box>
            <Typography>
              <strong>Date:</strong> {entry.date}
            </Typography>

            <Typography>
              <strong>Description:</strong> {entry.description}
            </Typography>

            <Typography>
              <strong>Specialist:</strong> {entry.specialist}
            </Typography>

            <Typography>
              <strong>Health check rating:</strong>{" "}
              {getHealthCheckEmoji(entry.healthCheckRating)}{" "}
              {entry.healthCheckRating}
            </Typography>
          </CardContent>
        </Card>
      );

    case "Hospital":
      return (
        <Card variant="outlined" sx={{ mb: 2 }}>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <LocalHospital />
              <Typography variant="h6">Hospital</Typography>
            </Box>
            <Typography>
              <strong>Date:</strong> {entry.date}
            </Typography>

            <Typography>
              <strong>Description:</strong> {entry.description}
            </Typography>

            <Typography>
              <strong>Specialist:</strong> {entry.specialist}
            </Typography>

            <Typography>
              <strong>Discharge date:</strong> {entry.discharge.date}
            </Typography>

            <Typography>
              <strong>Discharge criteria:</strong> {entry.discharge.criteria}
            </Typography>
          </CardContent>
        </Card>
      );

    case "OccupationalHealthcare":
      return (
        <Card variant="outlined" sx={{ mb: 2 }}>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Work />
              <Typography variant="h6">Occupational Healthcare</Typography>
            </Box>
            <Typography>
              <strong>Date:</strong> {entry.date}
            </Typography>

            <Typography>
              <strong>Description:</strong> {entry.description}
            </Typography>

            <Typography>
              <strong>Specialist:</strong> {entry.specialist}
            </Typography>

            <Typography>
              <strong>Employer:</strong> {entry.employerName}
            </Typography>

            {entry.sickLeave && (
              <>
                <Typography>
                  <strong>Sick leave:</strong>
                </Typography>

                <Typography>
                  {entry.sickLeave.startDate} → {entry.sickLeave.endDate}
                </Typography>
              </>
            )}
          </CardContent>
        </Card>
      );

    default:
      return assertNever(entry);
  }
};

const assertNever = (entry: never): never => {
  throw new Error(`Unhandled entry type: ${JSON.stringify(entry)}`);
};

export default EntryDetails;
