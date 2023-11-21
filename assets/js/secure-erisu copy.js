export class Indexs {
  constructor() {
    var changeElement = document.getElementById("change");

    if (!changeElement) {
      window.location.href = "https://omeansteam.github.io/";
    } else {
      var hrefValue = changeElement.getAttribute("href");
      if (hrefValue !== "https://omeansteam.github.io/") {
        window.location.href = "https://omeansteam.github.io/";
      }else if(hrefValue ==''){
        window.location.href = "https://omeansteam.github.io/";
      }
    }
  }
}