export async function validate(email: string, password: string) {
    const errors: { email?: string; password?: string } = {};

    if (!email) {
        errors.email = "Ingrese su email";
    } else if (!email.includes("@")) {
        errors.email = "Por favor, ingrese un email valido";
    }

    if (!password) {
        errors.password = "Ingrese su contraseña";
    } else if (password.length < 8) {
        errors.password = "La contraseña debe tener al menos 8 caracteres";
    }

    console.log(errors);

    return Object.keys(errors).length ? errors : null;
}
