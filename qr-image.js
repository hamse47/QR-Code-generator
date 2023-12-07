import qr from "qr-image";
import inquirer from "inquirer";
import fs from "fs";

inquirer
  .prompt([
    {
      name: "url",
      message: "please enter a URL:",
      type: "string",
    },
  ])
  .then((answers) => {
    const url = answers.url;
    var qr_png = qr.image(url, { type: "png" });
    qr_png.pipe(fs.createWriteStream("qr_code.png"));
    // save the image
    fs.writeFile("qr_codeURL.txt", url + "\n", { flag: "a" }, (err) => {
      if (err) {
        console.log("Error occurred:", err);
        return;
      }
      console.log("the file has been saved");
    });
  });
