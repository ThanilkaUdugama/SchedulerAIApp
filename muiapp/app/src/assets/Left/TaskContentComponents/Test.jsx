import { Box, Stack, Button, Typography, Tabs, Tab, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import MCQQuestionnaire from "./MCQQuestions";
import EssayQuestionnaire from "./EssayQuestions";
import ProgrammingQuestionnaire from "./ProgrammingQuestions";

export default function Test({ session, index, id }) {
  const [test, setTest] = useState(null);
  const [tabValue, setTabValue] = useState(0); // To manage the selected tab

  function generateTest(type) {
    if (session && session.accessToken) {
      fetch(`http://localhost:8000/api/tasks/schedules/${id}/test/${index}/${type}/`, {
        headers: {
          "Authorization": `Bearer ${session.accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setTest(data);
        });
    }
  }

 

  // Handle Tab Change
  const handleTabChange = (event, newValue) => {
    setTest(null)
    setTabValue(newValue);
  };

  return (
    <Stack spacing={3}>
      {/* Tabs to separate different question types */}
      <Box sx={{ width: "100%" }}>
        <Tabs value={tabValue} onChange={handleTabChange} aria-label="test tabs">
          <Tab label="MCQ" />
          <Tab label="Essay" />
          <Tab label="Programming" />
        </Tabs>

        {/* Tab Content */}
        <Box sx={{ paddingTop: 3 }}>
          {tabValue === 0 && (
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Stack spacing={2}>
                <Button variant="contained" onClick={() => generateTest(1)}>
                  Generate MCQ Test
                </Button>
                <MCQQuestionnaire session={session} index={index} id={id} data={test ? test.questions : []} />
              </Stack>
            </Paper>
          )}
          {tabValue === 1 && (
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Stack spacing={2}>
                <Button variant="contained" onClick={() => generateTest(2)}>
                  Generate Essay Test
                </Button>
                <EssayQuestionnaire session={session} index={index} id={id} data={test ? test.questions : []} />
              </Stack>
            </Paper>
          )}
          {tabValue === 2 && (
            <Paper elevation={3} sx={{ padding: 2 }}>
              <Stack spacing={2}>
                <Button variant="contained" onClick={() => generateTest(3)}>
                  Generate Programming Test
                </Button>
                <ProgrammingQuestionnaire session={session} index={index} id={id} data={test ? test.questions : []} />
              </Stack>
            </Paper>
          )}
        </Box>
      </Box>
    </Stack>
  );
}
