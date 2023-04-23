const path = require("path");
const fs = require("fs/promises");
const { User } = require("../../models/user");
const Jimp = require("jimp");

const avatarDir = path.join(__dirname, "../../", "public", "avatars");
const updateAvatar = async (req, res, next) => {
  const { _id } = req.user;
  const { path: tmpUpload, originalname } = req.file;
  const filename = `${_id}-${originalname}`;
  Jimp.read(tmpUpload, (err, img) => {
    if (err) throw err;
    img
      .resize(250, 250) // resize
      .write(filename); // save
  });
  const resultUpload = path.join(avatarDir, filename);
  await fs.rename(tmpUpload, resultUpload);
  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });
  res.json({
    avatarURL,
  });
};

module.exports = updateAvatar;
