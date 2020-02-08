import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve } from 'path';

/**
 * This is responsible  for handling multipart/form-data, which is used for uploading files.
 *  storage -  where to store the file
 * destination	- The folder to which the file will be saved
 * filename	- The name of the file within the destination
 */
export default {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'tmp', 'uploads'),
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, res) => {
        if (err) return cb(err);

        return cb(null, res.toString('hex') + extname(file.originalname));
      });
    },
  }),
};
