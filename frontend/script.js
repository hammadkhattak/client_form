const slidePage = document.querySelector(".slide-page");
const nextBtnFirst = document.querySelector(".firstNext");
const prevBtnSec = document.querySelector(".prev-1");
const nextBtnSec = document.querySelector(".next-1");
const prevBtnThird = document.querySelector(".prev-2");
const nextBtnThird = document.querySelector(".next-2");
const prevBtnFourth = document.querySelector(".prev-3");
const nextBtnFourth = document.querySelector(".next-3");
const submitBtn = document.querySelector(".submit");
const progressText = document.querySelectorAll(".step p");
const progressCheck = document.querySelectorAll(".step .check");
const bullet = document.querySelectorAll(".step .bullet");
let current = 1;

var _email = '';

const validateEmail = (email) => {
	return String(email)
		.toLowerCase()
		.match(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
};

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






nextBtnThird.addEventListener("click", async function (event) {
	event.preventDefault();

	const email = $("#email").val();
	const phone = $("#phone").val();
	const name = $("#name").val();

	if (!validateEmail(email)) {
		alert("Please enter a valid email address");
		return;
	}

	_email = email;

	try {
		const response = await axios.post("http://localhost:3100/api/signup", { email, name, phone });

		alert(response.data.message);

		slidePage.style.marginLeft = "-75%";
		bullet[current - 1].classList.add("active");
		progressCheck[current - 1].classList.add("active");
		progressText[current - 1].classList.add("active");
		current += 1;
		return;

	} catch (error) {
		console.log({ error });
		console.log(error.response.data.message);
		alert(error.response.data.message);
		return;
	}

});






submitBtn.addEventListener("click", function () {
	location.reload();
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


nextBtnFourth.addEventListener("click", async function () {

	const otp = $("#txtOtp").val();
	if (!otp) {
		alert("Enter OTP");
		return;
	}

	try {
		await setTotalUsersCount();
		const response = await axios.post("http://localhost:3100/api/verify-otp", { email: _email, otp });

		alert(response.data.message);

		// slidePage.style.marginLeft = "-75%";
		// bullet[current - 1].classList.add("active");
		// progressCheck[current - 1].classList.add("active");
		// progressText[current - 1].classList.add("active");
		// current += 1;

		slidePage.style.marginLeft = "-100%";
		bullet[current - 1].classList.add("active");
		progressCheck[current - 1].classList.add("active");
		progressText[current - 1].classList.add("active");
		current += 1;
		// location.reload();
		return;

	} catch (error) {
		alert(error.response.data.message);
		return;
	}

});

const getAllUsersFromDB = async () => {
	try {
		const response = await axios.get("http://localhost:3100/api/total-users");
		return response.data.data;
	} catch (error) {
		alert(error.response.data.message);
		return;
	}
};

const setTotalUsersCount = async () => {
	const users = await getAllUsersFromDB();
	$('#totalUsers').html(users.length);
};

$(async () => {
	setTotalUsersCount();
});


