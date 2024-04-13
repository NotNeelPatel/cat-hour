const root = document.querySelector(":root");
function toggleDarkMode(){
    const toggle = document.getElementById("darkModeToggle")
    if(toggle.textContent == "🌙"){
        root.style.setProperty("--background-colour", "#504945");
        root.style.setProperty("--container-colour", "#7c6f64e6");
        root.style.setProperty("--border-colour", "#b19d87");
        root.style.setProperty("--text-colour", "#f2dabd");
        root.style.setProperty("--linkcolour", "#5fe4eb");
        toggle.textContent = "☀️";
    } else {
        root.style.setProperty("--background-colour", "#fffaf0");
        root.style.setProperty("--container-colour", "#f2dabde6");
        root.style.setProperty("--border-colour", "#7c6f64");
        root.style.setProperty("--text-colour", "#504945");
        root.style.setProperty("--linkcolour", "#1f868b");
        toggle.textContent = "🌙";
    }
}