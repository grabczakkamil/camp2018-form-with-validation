(function () {
    'use strict';

    const validationConfig = {

        username: {
            "RegExpValue": "^[a-z]+$",
            "alert": "Nazwa użytkownika może składać się z małych liter i nie może zawierać spacji",
            "submitState": "false"
        },
        email: {
            "RegExpValue": "^[a-zA-Z\\d][\-\\w\.]+@([a-zA-Z\\d]+[\-a-zA-Z\\d]+\.)+[a-zA-Z]+$",
            "alert": "Nieprawidłowy adres e-mail",
            "submitState": "false"
        },
        pin: {
            "RegExpValue": "^[0-9]{1,8}$",
            "alert": "Pin musi składać się maksymalnie z 8 cyfr",
            "submitState": "false"
        },
        amount: {
            "minValue": "1",
            "maxValue": "100",
            "alert": "Kwota to liczba z przedziału 1-100",
            "submitState": "false"
        },
        checkbox: {
            "alert": "Musisz zaznaczyć tę zgodę",
            "submitState": "false"
        },
        otherFields: {
            "alert": "Uzupełnij to pole"
        },
        unlockSubmit: function () {
            if (this.username.submitState === "true" && this.pin.submitState === "true") {
                console.log("Submit");
            } else {
                console.log("nie zadziałam")
            }
        }
    };

    const formEfi = document.getElementById("form-efi");
    const validData = formEfi.querySelectorAll('input');
    const validDataLength = validData.length;

    function invalidInputStyle(invalidInputValue, invalidConfigValue) {

        invalidInputValue.classList.add("is-invalid");
        invalidInputValue.parentNode.lastChild.innerHTML = invalidConfigValue.alert;
        invalidInputValue.parentNode.lastChild.classList.add('invalid-feedback');
    };

    function validationWithRegularExpresion(validationInputValue, configValue) {
        let patternFormField = new RegExp(configValue.RegExpValue);

        if (patternFormField.test(validationInputValue.value) === false) {
            invalidInputStyle(validationInputValue, configValue);
            configValue.submitState = "false"

        } else {
            validationInputValue.classList.add("is-valid");
            //            configValue.submitState = "true"
        };
        //        validationConfig.unlockSubmit();
    };

    
    for (let i = 0; i < validDataLength; i++) {
        const newAlert = document.createElement("p.alert-field");
        validData[i].parentNode.appendChild(newAlert);

        validData[i].addEventListener('blur', function () {

            validData[i].classList.remove('is-invalid');

            if (validData[i].dataset.state === "required") {

                if (validData[i].type !== "checkbox" && validData[i].value === "") {
                    invalidInputStyle(validData[i], validationConfig.otherFields);
                }
                
                else if (validData[i].value !== "") {

                if (validData[i].name === "username") {

                    validationWithRegularExpresion(validData[i], validationConfig.username);

                } else if (validData[i].name === "amount") {

                    var amountValue = parseInt(validData[i].value);

                    if (amountValue >= validationConfig.amount.minValue && amountValue <= validationConfig.amount.maxValue) {
                        validData[i].classList.add("is-valid");

                    } else {
                        invalidInputStyle(validData[i], validationConfig.amount);
                    };

                } else if (validData[i].type === "checkbox") {

                    if (validData[i].checked === false) {

                        invalidInputStyle(validData[i], validationConfig.checkbox);

                    } else {
                        validData[i].classList.add("is-valid");
                    }
                }
                }

            } else if (validData[i].dataset.state !== "required" && validData[i].value !== '') {

                if (validData[i].name === "email") {

                    validationWithRegularExpresion(validData[i], validationConfig.email);

                } else if (validData[i].name === "pin") {
                    validationWithRegularExpresion(validData[i], validationConfig.pin);
                }
            }

        });

    };

    formEfi.addEventListener("submit", (event) => {
        event.preventDefault();
    });
})();