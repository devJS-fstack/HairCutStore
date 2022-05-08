const inputs = document.querySelectorAll(".input-field");
const toggle_btn = document.querySelectorAll(".toggle");
const main = document.querySelector("main");
const bullets = document.querySelectorAll(".bullets span");
const images = document.querySelectorAll(".image");



// hide headers

navheader.style.display = 'none';

inputs.forEach((inp) => {
    inp.addEventListener("focus", () => {
        inp.classList.add("active");
    });
    inp.addEventListener("blur", () => {
        if (inp.value != "") return;
        inp.classList.remove("active");
    });
});

toggle_btn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        main.classList.toggle("sign-up-mode");
    });
});

function moveSlider() {
    let index = this.dataset.value;

    let currentImage = document.querySelector(`.img-${index}`);
    images.forEach((img) => img.classList.remove("show"));
    currentImage.classList.add("show");

    const textSlider = document.querySelector(".text-group");
    textSlider.style.transform = `translateY(${-(index - 1) * 2.8}rem)`;

    bullets.forEach((bull) => bull.classList.remove("active"));
    this.classList.add("active");
}

bullets.forEach((bullet) => {
    bullet.addEventListener("click", moveSlider);
});


// handle login button
const login_btn = document.querySelector('.login-btn');
const input_acc = document.querySelector('.input-acc');
const input_pass = document.querySelector('.input-pass');
login_btn.onclick = async (e) => {
    e.preventDefault();
    const { status } = await login_staff(input_acc.value, input_pass.value);
    if (status === "found") {
        window.location.href = '/staff/dashboard-manager';
    }
    else {
        console.log('cl');
    }
}



async function login_staff(acc, pass) {
    return (await instance.post('/staff/login', {
        username: acc,
        password: pass
    })).data;
}


