const slidePage = document.querySelector(".slide-page");
const nextBtnFirst = document.querySelector(".firstNext");
const prevBtnSec = document.querySelector(".prev-1");
const nextBtnSec = document.querySelector(".next-1");
const prevBtnThird = document.querySelector(".prev-2");
const nextBtnThird = document.querySelector(".next-2");
const prevBtnFourth = document.querySelector(".prev-3");
const submitBtn = document.querySelector(".submit");
const progressText = document.querySelectorAll(".step p");
const progressCheck = document.querySelectorAll(".step .check");
const bullet = document.querySelectorAll(".step .bullet");
let current = 1;

nextBtnFirst.addEventListener("click", function (event) {
	event.preventDefault();
	slidePage.style.marginLeft = "-25%";
	bullet[current - 1].classList.add("active");
	progressCheck[current - 1].classList.add("active");
	progressText[current - 1].classList.add("active");
	current += 1;
});
nextBtnSec.addEventListener("click", function (event) {
	event.preventDefault();
	slidePage.style.marginLeft = "-50%";
	bullet[current - 1].classList.add("active");
	progressCheck[current - 1].classList.add("active");
	progressText[current - 1].classList.add("active");
	current += 1;
});






nextBtnThird.addEventListener("click", function (event) {
	event.preventDefault();

	slidePage.style.marginLeft = "-75%";
	bullet[current - 1].classList.add("active");
	progressCheck[current - 1].classList.add("active");
	progressText[current - 1].classList.add("active");
	current += 1;

	const eEmail = $("#email");
	const ePhone = $("#phone");
	const eName = $("#name");


	fetch('http://example.com/movies.json')
		.then((response) => response.json())
		.then((data) => console.log(data));



});






submitBtn.addEventListener("click", function () {
	bullet[current - 1].classList.add("active");
	progressCheck[current - 1].classList.add("active");
	progressText[current - 1].classList.add("active");
	current += 1;
	setTimeout(function () {
		alert("Your Form Successfully Signed up");
		location.reload();
	}, 800);
});

prevBtnSec.addEventListener("click", function (event) {
	event.preventDefault();
	slidePage.style.marginLeft = "0%";
	bullet[current - 2].classList.remove("active");
	progressCheck[current - 2].classList.remove("active");
	progressText[current - 2].classList.remove("active");
	current -= 1;
});
prevBtnThird.addEventListener("click", function (event) {
	event.preventDefault();
	slidePage.style.marginLeft = "-25%";
	bullet[current - 2].classList.remove("active");
	progressCheck[current - 2].classList.remove("active");
	progressText[current - 2].classList.remove("active");
	current -= 1;
});
prevBtnFourth.addEventListener("click", function (event) {
	event.preventDefault();
	slidePage.style.marginLeft = "-50%";
	bullet[current - 2].classList.remove("active");
	progressCheck[current - 2].classList.remove("active");
	progressText[current - 2].classList.remove("active");
	current -= 1;
});

// it will get the random number
function getRandomValue() {
	var ranomd_no = Math.floor(Math.random() * 200);
	return ranomd_no;
}

// assigning the random value to the hidden text
document.getElementById("txtVerificationNo").value = getRandomValue();

function checkEmailVerification() {
	// e.preventDefault();
	var verification_no = document.getElementById("txtVerificationNo").value;
	var otp = document.getElementById("txtOtp").value;
	if (parseInt(verification_no) == parseInt(otp)) {
		alert("OTP SAME.....");
	} else {
		alert("Incorrect NO");
	}
}

function sendEmail() {
	var email = document.getElementById("email").value;
	var verification_no = document.getElementById("txtVerificationNo").value;
}

