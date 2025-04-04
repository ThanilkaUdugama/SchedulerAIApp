import {
  Box,
  Stack,
  Button,
  Typography,
  TextField,
  IconButton,
  Tabs,
  Tab,
} from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import Avatar from "@mui/material/Avatar";
import Article from "./Article";
import Video from "./Video";
import Test from "./Test";
import SendIcon from "@mui/icons-material/Send";
import Chat from "./Chat";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';

function generateElement(element) {
  switch (element.element) {
    case "p":
      return <p>{element.content}</p>;
    case "ol":
      return <ol>{element.children.map((item) => generateElement(item))}</ol>;

    case "li":
      return <li>{element.content}</li>;
  }
}

export default function Section({ id, heading, section, index, session }) {
  const [tabIndex, setTabIndex] = useState(0);
  const [open, setOpen] = useState(false)

  const handleChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <>
      <Stack>
        <Stack
          direction={"row"}
          sx={{
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "1rem",
            borderBottom : "solid 1px #1f1f1f",
            padding : "10px 0"
          }}
        >
          <h3 style={{ margin: 0, fontWeight : 600, fontSize : '24px' }}>
            <span style={{ marginRight: "8px", color: "var(--theme-primary)" }}>
              {index + 1}.
            </span>
            {section.section}
          </h3>
          <IconButton
          color="white"
          onClick={() => setOpen(open => !open)}
          sx={{           
            backgroundColor : "var(--theme-primary)"
          }}
        >
          <AddIcon />
        </IconButton>
        </Stack>
        <Stack sx={{display : open ? 'flex' : 'none'}}>
          <Stack>
            <div dangerouslySetInnerHTML={{ __html: section.html }} />
          </Stack>

          <Stack>
            {section.articles.map((article) => (
              <Article article={article} />
            ))}
          </Stack>

          <Stack>
            {section.videos.map((video) => (
              <Video video={video} />
            ))}
          </Stack>

          <Box sx={{ width: "100%" }}>
            <Tabs value={tabIndex} onChange={handleChange} centered>
              <Tab label="Test" />
              <Tab label="Chat" />
            </Tabs>

            <Box sx={{ p: 2 }}>
              {tabIndex === 0 && (
                <Test session={session} index={index} id={id} />
              )}
              {tabIndex === 1 && <Chat session={session} index={index} />}
            </Box>
          </Box>
        </Stack>
      </Stack>
    </>
  );
}
