import React, { useEffect, useState } from 'react';
import { Box, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Button, Container } from '@mui/material';
import MonacoEditor from '@monaco-editor/react';

const codeQuestionnaire = ({ data, session, index, id }) => {
  const [answers, setAnswers] = useState({});
  const [tests, setTests] = useState([]);
  const [evalMode, setEvalMode] = useState(false);
  const [evalData, setEvalData] = useState({ questions: [] });
  const [evalTest, setEvalTest] = useState(null);
  const [quizOpen, setQuizOpen] = useState(false);
  const [trigger, setTrigger] = useState(false);

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

  useEffect(() => {
    fetch(`http://localhost:8000/api/tasks/schedules/${id}/test/fetch/code/${index}/`, {
      headers: {
        "Authorization": `Bearer ${session.accessToken}`,
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
      fetch(`http://localhost:8000/api/tasks/schedules/${id}/test/eval/${index}/code/${evalTest}/`, {
        headers: {
          "Authorization": `Bearer ${session.accessToken}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setEvalData(data);
          setEvalMode(true);
        });
    }
  }, [evalTest]);

  const handleAnswerChange = (questionIndex, value) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: value,
    }));
  };

  const handleSubmit = () => {
    const formData = new FormData();
    formData.append('type', 'code');
    formData.append('answers', JSON.stringify(answers));
    formData.append('questions', JSON.stringify(data));
    formData.append('schedule', id);
    formData.append('sectionIndex', index);

    if (session && session.accessToken) {
      fetch('http://localhost:8000/api/tasks/schedules/test/save/', {
        headers: {
          "Authorization": `Bearer ${session.accessToken}`,
        },
        method: 'post',
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

  return (
    <Container>
      {tests.map((test) => (
        <Box key={test.id} sx={{ marginBottom: 3 }}>
          {test.text}
          <Button onClick={() => setEvalTest(test.id)}>Click</Button>
        </Box>
      ))}

      <Dialog open={evalMode} onClose={() => setEvalMode(false)} fullWidth maxWidth="lg">
        <DialogTitle>Quiz Evaluation</DialogTitle>
        <DialogContent>
          {evalData.questions.map((question, qIndex) => (
            <Box key={question.index} sx={{ marginBottom: 3 }}>
              <Typography variant="h6">{question.index}. {question.question}</Typography>
              <MonacoEditor
                height="300px"
                language="python"
                theme="vs-dark"
                value={`${evalData.answers.eval[qIndex]["inline comment charactor stream"]} Your Code\n`+(evalData.answers.given[qIndex + 1] ?? '') + `\n\n${evalData.answers.eval[qIndex]["inline comment charactor stream"]} Correct Code\n` + evalData.answers.eval[qIndex].answer || ''}
                options={{ readOnly: true }}
              />

            
              <Typography variant="body2" color="red">{evalData.answers.eval[qIndex].note}</Typography>
       
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
        <DialogTitle>Code Quiz</DialogTitle>
        <DialogContent>
          {data.map((question) => (
            <Box key={question.index} sx={{ marginBottom: 3 }}>
              <Typography variant="h6">{question.index}. {question.question}</Typography>
              <MonacoEditor
                height="400px"
                language="python"
                theme="vs-dark"
                value={answers[question.index] || ''}
                onChange={(value) => handleAnswerChange(question.index, value)}
                options={{ minimap: { enabled: false }, wordWrap: 'on', scrollBeyondLastLine: false }}
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

export default codeQuestionnaire;