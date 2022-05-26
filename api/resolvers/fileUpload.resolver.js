const { finished } = require('stream/promises');
const csv = require('csvtojson');
const fileUpload = async (parent, { file }) => {
 const { createReadStream, filename, mimetype, encoding } = await file;

 // Invoking the `createReadStream` will return a Readable Stream.
 // See https://nodejs.org/api/stream.html#stream_readable_streams
 const stream = createReadStream();

 // This is purely for demonstration purposes and will overwrite the
 // local-file-output.txt in the current working directory on EACH upload.
 const out = require('fs').createWriteStream(__dirname + '/uploads/local-file-output.txt');
 stream.pipe(out);
 await finished(out);

 const jsonArray = await csv().fromFile(__dirname + '/uploads/local-file-output.txt');
 require('fs').writeFile(__dirname + '/data.json', JSON.stringify(jsonArray), 'utf8', function (err) {
  if (err) {
   console.log('An error occured while writing JSON Object to File.');
   return console.log(err);
  }

  console.log('JSON file has been saved.');
 });

 return { filename, mimetype, encoding };
};

export default fileUpload;
