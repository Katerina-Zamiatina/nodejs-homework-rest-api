const Jimp = require('jimp');

const editUserAvatar = async filePath => {
  const img = await Jimp.read(filePath);
  await img
    .autocrop()
    .cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER || Jimp.VERTICAL_ALIGN_MIDDLE)
    .quality(75)
    .writeAsync(filePath);
};

module.exports = editUserAvatar;
