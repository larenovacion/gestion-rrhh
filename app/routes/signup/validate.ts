import { userExists } from "./queries";

export async function validate(name: string, email: string, password: string) {
    const errors: { email?: string; name?: string; password?: string } = {};

    if (!name) {
        errors.name = "Ingrese un nombre";
    }

    if (!email) {
        errors.email = "Ingrese un email";
    } else if (!email.includes("@")) {
        errors.email = "Por favor, ingrese un email valido";
    }

    if (!password) {
        errors.password = "Ingrese una contraseña";
    } else if (password.length < 8) {
        errors.password = "La contraseña debe tener al menos 8 caracteres";
    }

    if (await userExists(email)) {
        errors.email = "Un usuario ya está registrado con este email";
    }

    return Object.keys(errors).length ? errors : null;
}
