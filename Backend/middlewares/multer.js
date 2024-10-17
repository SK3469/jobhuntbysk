import multer from "multer";

const storage = multer.memoryStorage();
export const singleUpload = multer({ storage }).single("file");  // make sure this file name should matched with frontend and backend name ...
