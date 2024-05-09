export async function validate(sys_user: string, password: string) {
    const errors: { sys_user?: string; password?: string } = {};

    if (!sys_user) {
        errors.sys_user = "Ingrese nombre de administrador válido";
    }

    if (!password) {
        errors.password = "Ingrese contraseña válida";
    }

    return Object.keys(errors).length ? errors : null;
}
