// Usuario
const regExpNombre = /^[A-ZÁ-ÚÑ]{1}[a-zá-úñ]{1,30}([\s\-][A-ZÁ-ÚÑ]{1}[a-zá-úñ]{1,30})*$/;
const regExpEmail = /^(([^<>()\[\]\\.,;:\s@”]+(\.[^<>()\[\]\\.,;:\s@”]+)*)|(“.+”))@((\[[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}\.[0–9]{1,3}])|(([a-zA-Z\-0–9]+\.)+[a-zA-Z]{2,}))$/;

export {
    regExpNombre, regExpEmail
}