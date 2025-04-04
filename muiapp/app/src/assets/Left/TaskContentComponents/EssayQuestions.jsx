import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Container,
} from "@mui/material";

const EssayQuestionnaire = ({ data, session, index, id }) => {
  const [answers, setAnswers] = useState({});
  const [tests, setTests] = useState([]);
  const [evalMode, setEvalMode] = useState(false);
  const [evalData, setEvalData] = useState({ questions: [] });
  const [evalTest, setEvalTest] = useState(null);
  const [quizOpen, setQuizOpen] = useState(false);
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8000/api/tasks/schedules/${id}/test/fetch/essay/${index}/`, {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTests(data);
      });
  }, [trigger]);

  useEffect(() => {
    if (data.length > 0 && !evalMode) {
      setQuizOpen(true);
      setAnswers({});
    }
  }, [data]);

  useEffect(() => {
    if (evalTest) {
      fetch(`http://localhost:8000/api/tasks/schedules/${id}/test/eval/${index}/essay/${evalTest}/`, {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setEvalData(data);
          setEvalMode(true);
        });
    }
  }, [evalTest]);

  const handleAnswerChange = (questionIndex, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: answer,
    }));
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("type", "essay");
    formData.append("answers", JSON.stringify(answers));
    formData.append("questions", JSON.stringify(data));
    formData.append("schedule", id);
    formData.append("sectionIndex", index);

    if (session && session.accessToken) {
      fetch("http://localhost:8000/api/tasks/schedules/test/save/", {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
        method: "post",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          setTests(data.tests);
          setEvalTest(data.active);
          setQuizOpen(false);
        });
    }
  };


  function deleteItem(pk){
    fetch(`http://localhost:8000/api/tasks/schedules/test/${pk}/`, {
      method : 'delete',
      headers: {
        "Authorization": `Bearer ${session.accessToken}`,
      },
    })
      .then((res) => {
        if(res.ok){
          setTrigger(trigger => !trigger)
          setEvalMode(false)
        }
      })

  }

  return (
    <Container>
      {tests.map((test) => (
        <Box key={test.id} sx={{ marginBottom: 3 }}>
          {test.text}
          <Button onClick={() => setEvalTest(test.id)}>View</Button>
        </Box>
      ))}

      <Dialog open={evalMode} onClose={() => setEvalMode(false)} fullWidth maxWidth="lg">
        <DialogTitle>Essay Evaluation</DialogTitle>
        <DialogContent>
          {evalData.questions.map((question, qIndex) => (
            <Box key={question.index} sx={{ marginBottom: 3 }}>
              <Typography variant="h6">{question.index}. {question.question}</Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                value={evalData.answers.given[qIndex + 1]}
                
                sx={{ marginTop: 2 }}
                error = {!evalData.answers.eval[qIndex].correct}
              />
              
              <Typography variant="body1">
                {evalData.answers.eval[qIndex].answer}
              </Typography>
            </Box>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => deleteItem(evalTest)} color="secondary" variant="outlined">
                         Delete
                        </Button>
          <Button onClick={() => {setEvalMode(false); setEvalTest(null)}} color="secondary" variant="outlined">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={quizOpen && !evalMode} onClose={() => setQuizOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>Essay Quiz</DialogTitle>
        <DialogContent>
          {data.map((question) => (
            <Box key={question.index} sx={{ marginBottom: 3 }}>
              <Typography variant="h6">{question.question}</Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                variant="outlined"
                value={answers[question.index] || ""}
                onChange={(e) => handleAnswerChange(question.index, e.target.value)}
                sx={{ marginTop: 2 }}
              />
            </Box>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setQuizOpen(false)} color="error">
            Close
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default EssayQuestionnaire;