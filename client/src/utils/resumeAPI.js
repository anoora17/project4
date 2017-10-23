import axios from "axios";
const pdftotext = require('pdftotextjs');



export default {
  extractText: function(path) {
  	console.log("in extract function");
    var pdf = new pdftotext('Darius-Rafei-Resume.pdf');


    var data = pdf.getTextSync();
    console.log(data);

    return;

      }
};