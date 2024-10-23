import { initializeApp } from "firebase/app";
import environment from "../config/environment.config.js";

const initialize = initializeApp(environment.firebaseConfig);
export default initialize;