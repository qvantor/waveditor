// import styled from 'styled-components';
// import { TextEditor } from "@waveditors/text-editor";
import { MailBuilder } from './mail-builder';

// const StyledEditor = styled(TextEditor)`
//   p {
//     margin: 0;
//     padding: 0;
//   }
//
//   outline: none;
//   border: 1px solid gray;
// `

export function App() {
  // const [content, setContent] = useState('<p>hi!</p>')
  return (
    /*<StyledEditor onChange={setContent} content={content}/>*/
    <MailBuilder />
  );
}

export default App;
