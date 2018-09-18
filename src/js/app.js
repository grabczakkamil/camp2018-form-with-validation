(function () {
    'use strict';

    const validationConfig = {

        username: {
            "RegExpValue": "^[a-z]+$",
            "alert": "Nazwa użytkownika może składać się z małych liter i nie może zawierać spacji"
        },
        email: {
            "RegExpValue": "^[a-zA-Z\\d][\-\\w\.]+@([a-zA-Z\\d]+[\-a-zA-Z\\d]+\.)+[a-zA-Z]+$",
            "alert": "Nieprawidłowy adres e-mail"
        },
        pin: {
            "RegExpValue": "^[0-9]{1,8}$",
            "alert": "Pin musi składać się maksymalnie z 8 cyfr"
        },
        amount: {
            "minValue": "1",
            "maxValue": "100",
            "alert": "Kwota to liczba z przedziału 1-100"
        },
        checkbox: {
            "alert": "Musisz zaznaczyć tę zgodę",
            "submitState": "false"
        },
        otherFields: {
            "alert": "Uzupełnij to pole"
        }
    };

    const formEfi = document.getElementById("form-efi");
    const validData = formEfi.querySelectorAll('input');
    const validDataLength = validData.length;

    function invalidInputStyle(invalidInputValue, invalidConfigValue) {

        invalidInputValue.classList.add("is-invalid");
        invalidInputValue.parentNode.lastChild.innerHTML = invalidConfigValue.alert;
        invalidInputValue.parentNode.lastChild.classList.add('invalid-feedback');
        invalidInputValue.dataset.iscorrect = false;
    };

    function validationWithRegularExpresion(validationInputValue, configValue) {
        let patternFormField = new RegExp(configValue.RegExpValue);

        if (patternFormField.test(validationInputValue.value) === false) {
            invalidInputStyle(validationInputValue, configValue);

        } else {
            validationInputValue.classList.add("is-valid");
            validationInputValue.dataset.iscorrect = true;

        };
    };

    function addDataIsCorrectAtribute(InputType) {
        if (InputType.dataset.state === "required") {
            InputType.setAttribute('data-iscorrect', "false");
        } else {
            InputType.setAttribute('data-iscorrect', "true");
        }
    }

    for (let i = 0; i < validDataLength; i++) {
        const newAlert = document.createElement("p.alert-field");
        validData[i].parentNode.appendChild(newAlert);

        addDataIsCorrectAtribute(validData[i]);

        validData[i].addEventListener('input', function () {

            validData[i].classList.remove('is-invalid');

            if (validData[i].dataset.state === "required") {


                if (validData[i].value === "" && validData[i].type !== "checkbox") {
                    invalidInputStyle(validData[i], validationConfig.otherFields);

                } else if (validData[i].value !== "") {

                    if (validData[i].name === "username") {

                        validationWithRegularExpresion(validData[i], validationConfig.username);

                    } else if (validData[i].name === "amount") {

                        var amountValue = parseInt(validData[i].value);

                        if (amountValue >= validationConfig.amount.minValue && amountValue <= validationConfig.amount.maxValue) {
                            validData[i].classList.add("is-valid");
                            validData[i].dataset.iscorrect = true;

                        } else {
                            invalidInputStyle(validData[i], validationConfig.amount);
                        };

                    }
                } else if (validData[i].type === "checkbox") {

                    if (validData[i].checked === false) {

                        invalidInputStyle(validData[i], validationConfig.checkbox);

                    } else {
                        validData[i].classList.add("is-valid");
                        validData[i].dataset.iscorrect = true;

                    }
                }

            } else if (validData[i].dataset.state !== "required") {
                validData[i].classList.remove('is-invalid');

                if (validData[i].value !== '') {

                    if (validData[i].name === "email") {

                        validationWithRegularExpresion(validData[i], validationConfig.email);

                    } else if (validData[i].name === "pin") {
                        validationWithRegularExpresion(validData[i], validationConfig.pin);
                    }
                } else if (validData[i].value === '') {
                    validData[i].classList.remove('is-invalid');
                    validData[i].classList.remove('is-valid');
                }
            }

        });

    };

    formEfi.addEventListener("submit", (event) => {
        event.preventDefault();
    });
})();