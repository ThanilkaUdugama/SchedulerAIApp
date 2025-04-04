import React, { useEffect, useState } from 'react';
import { Box, Typography, Radio, Dialog,
    DialogTitle,
    DialogContent,
    DialogActions, RadioGroup, FormControl, FormGroup, Checkbox, FormControlLabel, FormLabel, Button, Container } from '@mui/material';



const MCQQuestionnaire = ({data, session, index, id}) => {
  const [answers, setAnswers] = useState({});
  const [tests, setTests] = useState([])
  const [evalMode, setEvalMode] = useState(false)
  const [evalData, setEvalData] = useState({questions : []})
  const [evalTest, setEvalTest] = useState(null)
  const [quizOpen, setQuizOpen] = useState(false)
  const [trigger, setTrigger] = useState(false)


  useEffect(() =>{
    fetch(`http://localhost:8000/api/tasks/schedules/${id}/test/fetch/mcq/${index}/`, {
      headers: {
        "Authorization": `Bearer ${session.accessToken}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTests(data)
      })
    
  },[trigger])

  const handleAnswerChange = (questionIndex, choiceIndex) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionIndex]: choiceIndex
    }));
  };

  useEffect(() => {
    if(data.length > 0 && !evalMode){
        setQuizOpen(true)
        setAnswers({})
    }
  },[data])

  useEffect(() =>{
    if(evalTest){
        fetch(`http://localhost:8000/api/tasks/schedules/${id}/test/eval/${index}/mcq/${evalTest}/`, {
            headers: {
              "Authorization": `Bearer ${session.accessToken}`,
            },
          })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
              setEvalData(data);
              setEvalMode(true)
            });
    }
  }, [evalTest])



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

  

  const handleSubmit = () => {
    const formData = new FormData();
      formData.append('type', 'mcq');
      formData.append('answers', JSON.stringify(answers));
      formData.append('questions', JSON.stringify(data));
      formData.append('schedule', id);
      formData.append('sectionIndex', index);


      if(session && session.accessToken){
        fetch('http://localhost:8000/api/tasks/schedules/test/save/', {
          headers : {
              "Authorization" : `Bearer ${session.accessToken}`,
          },
          method : 'post',
          body : formData
      }).then(res => res.json()).then(data => {
        setTests(data.tests)
        setEvalTest(data.active)
        setQuizOpen(false)
        // setSubmitted(true);
      })
      }
   
  };

  return (
    <Container>
        {tests.map(test =>  <Box key={test} sx={{ marginBottom: 3 }}>
            {test.text}
            <Button onClick={() => setEvalTest(test.id)}>Click</Button>
        </Box>)}

        
            <Dialog open={evalMode} onClose={()=> setEvalMode(false)} fullWidth maxWidth="md">
            <DialogTitle>Quiz</DialogTitle>
            <DialogContent>
              {evalData.questions.map((question, qIndex) => (
                <Box key={question.index} sx={{ marginBottom: 3 }}>
                <Typography variant="h6">{question.question}</Typography>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Choices</FormLabel>
                  <FormGroup>
                    {question.choices.map((choice, index) => (
                      <FormControlLabel
                        key={choice.index}
                        control={
                          <Checkbox
                            checked={(evalData.answers.eval[qIndex].answer == index + 1 || evalData.answers.given[qIndex + 1] == index + 1 )}
                            sx = {{
                                "&.Mui-checked": { color: evalData.answers.eval[qIndex].answer == index + 1 ? evalData.answers.given[qIndex + 1] == evalData.answers.eval[qIndex].answer ? "green" : 'orange' : evalData.answers.given[qIndex + 1] != evalData.answers.eval[qIndex].answer  ? 'red' : null },
                            }}
                            
                          />
                        }
                        label={choice.choice}
                      />
                    ))}
                    <p>{evalData.answers.eval[qIndex].info}</p>
                  </FormGroup>
                </FormControl>
              </Box>
              
              ))}
      
              
            </DialogContent>
            <DialogActions>

            <Button onClick={() => deleteItem(evalTest)} color="secondary" variant="outlined">
               Delete
              </Button>
              
              <Button onClick={() =>{setEvalMode(false); setEvalTest(null)}} color="secondary" variant="outlined">
                Close
              </Button>
            </DialogActions>
          </Dialog>




              
    

          <Dialog open={quizOpen && !evalMode} onClose={() => setQuizOpen(false)} fullWidth maxWidth="md">
      <DialogTitle>Quiz</DialogTitle>
      <DialogContent>
        {data.map((question) => (
          <Box key={question.index} sx={{ marginBottom: 3 }}>
            <Typography variant="h6">{question.question}</Typography>

            <FormControl component="fieldset">
              <FormLabel component="legend">Choices</FormLabel>
              <RadioGroup
                name={`question-${question.index}`}
                value={answers[question.index] || ""}
                onChange={(event) => handleAnswerChange(question.index, event.target.value)}
              >
                {question.choices.map((choice) => (
                  <FormControlLabel
                    key={choice.index}
                    value={choice.index}
                    control={<Radio />}
                    label={choice.choice}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>
        ))}
      </DialogContent>

      <DialogActions>
        <Button onClick={() => setQuizOpen(false)} color="error">
          Close
        </Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
        >
         Submit
        </Button>
      </DialogActions>

      
    </Dialog>
  
    </Container>
  );
};

export default MCQQuestionnaire;
