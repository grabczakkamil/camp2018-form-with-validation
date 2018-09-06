(function () {
    'use strict';
    const formEfi = document.getElementById("form-efi");

    const validationConfig = {
        username: {
            "RegExp": "^[^ A-Z]+$",
            "alert": "Nazwa użytkownika może składać się z małych liter i nie może zawierać spacji"
        },
        email: {
            "RegExp": "^[a-zA-Z\\d][\-\\w\.]+@([a-zA-Z\\d]+[\-a-zA-Z\\d]+\.)+[a-zA-Z]+$",
            "alert": "Nieprawidłowy adres e-mail"
        },
        pin: {
            "RegExp": "^[0-9]{1,8}$",
            "alert": "Pin musi składać się maksymalnie z 8 cyfr"
        },
        amount: {
            "RegExp": "^[1-9]{1}$|^[1-9]{1}[0-9]{1}$|^100$",
            "alert": "Kwota to liczba z przedziału 1-100"
        }
    }

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

        function validationWithRegularExpresion(regularExpresionValue) {
            let patternFormField = new RegExp(regularExpresionValue);

            if (patternFormField.test(validData[i].value) === false) {
                addClassName("is-invalid");     

            } else {
                addClassName("is-valid");
            };
        };

        for (var i = 0; i < validDataLength; i++) {
            const inputParent = validData[i].parentNode;

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
                    validationWithRegularExpresion(validationConfig.username.RegExp);
                    inputParent.appendChild(feedbackMessage(validationConfig.username.alert));

                } else if (validData[i].name === "amount") {
                    validationWithRegularExpresion(validationConfig.amount.RegExp);
                    inputParent.appendChild(feedbackMessage(validationConfig.amount.alert));
                }

            } else if (validData[i].dataset.state !== "required" && validData[i].value !== '') {

                if (validData[i].name === "email") {
                    validationWithRegularExpresion(validationConfig.email.RegExp);
                    inputParent.appendChild(feedbackMessage(validationConfig.email.alert));

                } else if (validData[i].name === "pin") {
                    validationWithRegularExpresion(validationConfig.pin.RegExp);  
                    inputParent.appendChild(feedbackMessage(validationConfig.pin.alert));
                }
            }
        }
    });
})();