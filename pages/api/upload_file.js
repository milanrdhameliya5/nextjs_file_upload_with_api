import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
}; 

const post = async (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, async function (err, fields, files) {
    //Save File Logic
    const data = fs.readFileSync(files.profile_pic.filepath);
    fs.writeFileSync(`./public/Uploads/${files.profile_pic.originalFilename}`, data);
    await fs.unlinkSync(files.profile_pic.filepath);

    return res
      .status(201)
      .json({ msg: "File Uploaded Successfully", status_code: 1 });
  });
};

export default (req, res) => {
  req.method === "POST"
    ? post(req, res)
    : res
        .status(404)
        .json({
          msg: "This method is Not Supported For This Route",
          status_code: 0,
        });
};
