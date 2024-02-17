"use strict";
let Validator = {
    handleSubmit: (event) => {
        event.preventDefault();
        let send = true;
        let inputs = form.querySelectorAll("input");
        Validator.clearErrors();
        for (let input of inputs) {
            let check = Validator.checkInput(input);
            if (check != true) {
                send = false;
                //exibir o erro
                Validator.showError(input, check);
            }
        }
        if (send) {
            form.submit();
        }
    },
    checkInput: (input) => {
        let rules = input.getAttribute("data-rules");
        if (rules != null) {
            let auxRules = rules.split("|");
            for (let i of auxRules) {
                let rDatails = i.split("=");
                switch (rDatails[0]) {
                    case "required":
                        if (input.value == "") {
                            return "Campo não pode ser vazio";
                        }
                        break;
                    case "min":
                        if (input.value.length < Number(rDatails[1])) {
                            return `Campo deve ter no minimo ${rDatails[1]} caracteres`;
                        }
                        break;
                }
            }
        }
        return true;
    },
    showError: (input, error) => {
        var _a;
        input.style.borderColor = "red";
        let errorElement = document.createElement("div");
        errorElement.classList.add("error");
        errorElement.innerHTML = error;
        // input.parentElement?.appendChild(errorElement);
        (_a = input.parentElement) === null || _a === void 0 ? void 0 : _a.insertBefore(errorElement, input.nextElementSibling);
    },
    clearErrors: () => {
        let errorElements = document.querySelectorAll(".error");
        errorElements.forEach((error) => {
            var _a;
            var errorFather = (_a = error.parentElement) === null || _a === void 0 ? void 0 : _a.querySelector("input");
            errorFather.style.borderColor = "#999";
            error.remove();
        });
    },
};
let form = document.querySelector(".validator");
form.addEventListener("submit", Validator.handleSubmit);
