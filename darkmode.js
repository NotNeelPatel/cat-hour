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

/* OG
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
*/

/* Halloween
    if(toggle.textContent == "🌙"){
        root.style.setProperty("--container-colour", "#210030e6");
        root.style.setProperty("--border-colour", "#7adb6d");
        root.style.setProperty("--text-colour", "#7adb6d");
        root.style.setProperty("--linkcolour", "#dfa3ee");
        root.style.setProperty("--background-url", "url('halloween_bg_dark.png')")
        toggle.textContent = "☀️";
    } else {
        root.style.setProperty("--container-colour", "#f2dabde6");
        root.style.setProperty("--border-colour", "#4e2d14");
        root.style.setProperty("--text-colour", "#302720");
        root.style.setProperty("--linkcolour", "#994a0e");
        root.style.setProperty("--background-url", "url('halloween_bg_light.png')")
        toggle.textContent = "🌙";
    }
*/

/* Christmas
    if(toggle.textContent == "🌙"){
        root.style.setProperty("--background-colour", "#000000");
        root.style.setProperty("--container-colour", "#222222e6");
        root.style.setProperty("--border-colour", "#8f8f8f");
        root.style.setProperty("--text-colour", "#ffffff");
        root.style.setProperty("--linkcolour", "#5fe4eb");
        root.style.setProperty("--background-url", "url('christmas_bg_dark.png')")

        toggle.textContent = "☀️";
    } else {
        root.style.setProperty("--background-colour", "#ffffff");
        root.style.setProperty("--container-colour", "#ffffffe6");
        root.style.setProperty("--border-colour", "#c45959");
        root.style.setProperty("--text-colour", "#000000");
        root.style.setProperty("--linkcolour", "#038d94");
        root.style.setProperty("--background-url", "url('christmas_bg_light.png')")
        toggle.textContent = "🌙";
    }
*/