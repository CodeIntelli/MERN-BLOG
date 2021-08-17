import React from "react";
import {
  Box,
  FormControl,
  InputBase,
  TextareaAutosize,
  Button,
  makeStyles,
  IconButton,
} from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";
import { createPost, uploadFile } from "../../services/api";
import { useHistory } from "react-router-dom";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "0 80px",
    [theme.breakpoints.down("md")]: {
      padding: "0 17px",
    },
  },
  image: {
    width: "100%",
    height: "60vh",
    objectFit: "cover",
    backgroundImage: "url('https://source.unsplash.com/user/erondu/1608x900')",
    minHeight: "500px",
    /* Create the parallax scrolling effect */
    backgroundAttachment: "fixed",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
  form: {
    display: "flex",
    flexDirection: "row",
    marginTop: "10px",
  },
  textfield: {
    flex: 1,
    margin: "0 30px",
    fontSize: 25,
  },
  textarea: {
    width: "100%",
    border: "none",
    marginTop: 50,
    fontSize: 18,
    "&:focus": {
      border: "none",
      outline: "none",
    },
  },
}));

const initialValue = {
  title: "",
  description: "",
  image: "",
  username: "codeintelli",
  categories: "All",
  createDate: new Date(),
};

const CreateView = () => {
  const classes = useStyles();
  const history = useHistory();
  const [post, setPost] = React.useState(initialValue);
  const [file, setFile] = React.useState("");
  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };
  const savePost = async () => {
    history.push("/");
    await createPost(post);
  };
  React.useEffect(() => {
    const getImages = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);
        await uploadFile(data);
      }
    };
    getImages();
  });

  return (
    <>
      <Box className={classes.image}></Box>
      <Box className={classes.container}>
        <FormControl className={classes.form}>
          <IconButton>
            <label htmlFor="fileInput">
              <AddCircle fontSize="large" color="primary" />
            </label>
            <input
              type="file"
              id="fileInput"
              style={{ display: "none" }}
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
          </IconButton>
          <InputBase
            placeholder="Enter your title here"
            className={classes.textfield}
            onChange={(e) => handleChange(e)}
            name="title"
          />
          <Button
            onClick={() => savePost()}
            variant="contained"
            color="primary"
          >
            Publish
          </Button>
        </FormControl>
        <TextareaAutosize
          minRows={5}
          placeholder="Tell Your Story"
          className={classes.textarea}
          onChange={(e) => handleChange(e)}
          name="description"
        ></TextareaAutosize>
        {/* <CKEditor
          editor={ClassicEditor}
          className={classes.textarea}
          onChange={(event, editor) => {
            const data = editor.getData();
            setPost({ description: data });
          }}
          name="description"
        /> */}
      </Box>
    </>
  );
};

export default CreateView;
