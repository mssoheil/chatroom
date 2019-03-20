// import Reactotron, {
//     trackGlobalErrors,
//     openInEditor,
//     asyncStorage
//   } from "reactotron-react-js";
import Reactotron from "reactotron-react-js";
  Reactotron.configure({
    name: "chatroom"
  });
  // Reactotron.use(trackGlobalErrors());
  // Reactotron.use(openInEditor());
  // Reactotron.use(asyncStorage());
  Reactotron.connect();
  