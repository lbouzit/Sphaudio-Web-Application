var check = 0;
var themeNum = 0;
var theme = 0;
function ThemeClick(theme) {
	if (theme === 1){
		document.getElementById("ThemeSample").src = "default.png";
		//document.getElementById("Theme1").class = "btn btn-info active";
    console.log("selected theme 1");
    check = 1;
	}
	else if (theme === 2){
		document.getElementById("ThemeSample").src = "warm.png";
    check = 2;
	}
	else if (theme === 3){
		document.getElementById("ThemeSample").src = "cool.png";
    check = 3;
  }    
}
function ThemeSave() {
  if (check === 1){
    //document.getElementById("CustomizeStyle").href = "Theme1.css"
    themeNum = 1;
    console.log(themeNum);
  }
  else if (check === 2){
    //document.getElementById("CustomizeStyle").href = "Theme2.css"
    themeNum = 2;
    console.log(themeNum);
  }
  else if (check === 3){
    //document.getElementById("CustomizeStyle").href = "Theme3.css"
    themeNum = 3;
    console.log(themeNum);
  }
}