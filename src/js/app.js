(function () {
    'use strict';

    const validationConfig = {

        username: {
            "RegExp": "^[a-z]+$",
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
            "minValue": "1",
            "maxValue": "100",
            "alert": "Kwota to liczba z przedziału 1-100"
        },
        checkbox: {
            "alert": "Musisz zaznaczyć tę zgodę"
        },
        noCheckbox: {
            "alert": "Uzupełnij to pole"
        }
    };

    function validationWithRegularExpresion(validationInputValue, regularExpresionValue) {
        let patternFormField = new RegExp(regularExpresionValue);

        if (patternFormField.test(validationInputValue.value) === false) {
            validationInputValue.classList.add("is-invalid");

        } else {
            validationInputValue.classList.add("is-valid");
        };
    };

    const formEfi = document.getElementById("form-efi");
    const validData = formEfi.querySelectorAll('input');
    const validDataLength = validData.length;


    for (let i = 0; i < validDataLength; i++) {
        const newAlert = document.createElement("p.alert-field");
        validData[i].parentNode.appendChild(newAlert);

        validData[i].addEventListener('change', function () {

            validData[i].classList.remove('is-invalid');

            if (validData[i].dataset.state === "required") {

                if (validData[i].type !== "checkbox" && validData[i].value === "") {

                    validData[i].classList.add("is-invalid");
                    validData[i].parentNode.lastChild.innerHTML = validationConfig.noCheckbox.alert;
                    validData[i].parentNode.lastChild.classList.add('invalid-feedback');

                } else if (validData[i].name === "username") {

                    validationWithRegularExpresion(validData[i], validationConfig.username.RegExp);

                    validData[i].parentNode.lastChild.innerHTML = validationConfig.username.alert;
                    validData[i].parentNode.lastChild.classList.add('invalid-feedback');

                } else if (validData[i].name === "amount") {

                    var amountValue = parseInt(validData[i].value);

                    if (amountValue >= validationConfig.amount.minValue && amountValue <= validationConfig.amount.maxValue) {
                        validData[i].classList.add("is-valid");
                    } else {
                        validData[i].classList.add("is-invalid");
                    };
                    validData[i].parentNode.lastChild.innerHTML = validationConfig.amount.alert;
                    validData[i].parentNode.lastChild.classList.add('invalid-feedback');

                } else if (validData[i].type === "checkbox") {

                    if (validData[i].checked === false) {
                        validData[i].classList.add("is-invalid");

                        validData[i].parentNode.lastChild.innerHTML = validationConfig.checkbox.alert;
                        validData[i].parentNode.lastChild.classList.add('invalid-feedback');

                    } else {
                        validData[i].classList.add("is-valid");
                    }
                }


            } else if (validData[i].dataset.state !== "required" && validData[i].value !== '') {

                if (validData[i].name === "email") {

                    validationWithRegularExpresion(validData[i], validationConfig.email.RegExp);

                    validData[i].parentNode.lastChild.innerHTML = validationConfig.email.alert;
                    validData[i].parentNode.lastChild.classList.add('invalid-feedback');

                } else if (validData[i].name === "pin") {
                    validationWithRegularExpresion(validData[i], validationConfig.pin.RegExp);

                    validData[i].parentNode.lastChild.innerHTML = validationConfig.pin.alert;
                    validData[i].parentNode.lastChild.classList.add('invalid-feedback');

                }
            }
        });
    };

    //    formEfi.addEventListener("submit", (event) => {
    //        event.preventDefault();
    //    });
})();