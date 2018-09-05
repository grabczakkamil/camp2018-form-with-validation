(function () {
    'use strict';
    const formEfi = document.getElementById("form-efi");

    formEfi.addEventListener("submit", (event) => {
        event.preventDefault();

        const invalidInputStyle = document.getElementsByClassName('is-invalid');
        const paragraphsWithFeedback = document.getElementsByClassName('invalid-feedback');
        const validData = document.forms[0].getElementsByTagName('input');
        const validDataLength = validData.length;


        while (paragraphsWithFeedback[0]) {
            paragraphsWithFeedback[0].remove();
        };

        while (invalidInputStyle[0]) {
            invalidInputStyle[0].classList.remove('is-invalid');
        };


        function feedbackMessage(alertText) {
            const newAlert = document.createElement("p");

            newAlert.innerHTML = alertText;
            newAlert.classList.add("invalid-feedback");
            return newAlert;
        };

        function textDependsOnInputType() {

            if (validData[i].type == "checkbox") {
                return "Musisz zaznaczyć tę zgodę"
            } else {
                return "Uzupełnij to pole"
            }
        };

        function addClassName(className) {
            validData[i].classList.add(className);
        };

        for (var i = 0; i < validDataLength; i++) {
            const inputParent = validData[i].parentNode;

            function validationWithRegularExpresion(regularExpresionValue, infoText) {
                const patternFormField = new RegExp(regularExpresionValue);

                if (patternFormField.test(validData[i].value) === false) {
                    addClassName("is-invalid");
                    inputParent.appendChild(feedbackMessage(infoText));

                } else {
                    addClassName("is-valid");
                };
            };

            if (validData[i].dataset.state === "required") {

                if (validData[i].type !== "checkbox" && validData[i].value === "") {

                    addClassName("is-invalid");
                    inputParent.appendChild(feedbackMessage(textDependsOnInputType()));

                } else if (validData[i].type === "checkbox") {

                    if (validData[i].checked === false) {
                        addClassName("is-invalid");
                        inputParent.appendChild(feedbackMessage(textDependsOnInputType()));

                    } else {
                        addClassName("is-valid");
                    }

                } else if (validData[i].name === "username") {
                    validationWithRegularExpresion("^[^ A-Z]+$", "Nazwa użytkownika może składać się z małych liter i nie może zawierać spacji");

                } else if (validData[i].name === "amount") {
                    validationWithRegularExpresion("^[1-9]{1}$|^[1-9]{1}[0-9]{1}$|^100$", "Kwota to liczba z przedziału 1-100");
                }

            } else if (validData[i].dataset.state !== "required" && validData[i].value !== '') {

                if (validData[i].name === "email") {

                    validationWithRegularExpresion("^[a-zA-Z\\d][\-\\w\.]+@([a-zA-Z\\d]+[\-a-zA-Z\\d]+\.)+[a-zA-Z]+$", "Nieprawidłowy adres e-mail");

                } else if (validData[i].name === "pin") {
                    validationWithRegularExpresion("^[0-9]{1,8}$", "Pin musi składać się maksymalnie z 8 cyfr");
                }
            }
        }
    });
    console.log(document.getElementsByClassName('validation'));
})();