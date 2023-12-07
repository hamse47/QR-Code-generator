// Import necessary modules
import qr from "qr-image"; // Module for generating QR images
import inquirer from "inquirer"; // Module for interactive command line prompts
import fs from "fs"; // Node.js File System module for handling file operations

// Use inquirer to prompt user for input
inquirer
  .prompt([
    {
      name: "url", // Define the name of the input
      message: "Please enter a URL:", // Message displayed to the user
      type: "string", // Type of input
    },
  ])
  .then((answers) => {
    // Process the input after receiving the answer
    const url = answers.url; // Store the provided URL

    // Generate a QR code from the URL
    var qr_png = qr.image(url, { type: "png" }); // Create a QR code image from the URL
    qr_png.pipe(fs.createWriteStream("qr_code.png")); // Write the QR code image to a PNG file

    // Append the URL to a text file
    fs.writeFile("qr_codeURL.txt", url + "\n", { flag: "a" }, (err) => {
      // Handle file write operation
      if (err) {
        // Log any errors that occur during the file write operation
        console.log("Error occurred:", err);
        return;
      }
      // Log a success message if the file is saved successfully
      console.log("The file has been saved");
    });
  });
