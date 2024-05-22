export async function validate(
    name: string,
    DNI: string,
    birth: Date,
    kids: number,
    address: string,
    tel: string,
    obvs: string,
    ant: Date,
    cond: string,
    studies: string,
    studies_grade: string,
    area: string,
    disp: string
) {
    const errors: {
        name?: string;
        DNI?: string;
        birth?: string;
        kids?: string;
        address?: string;
        tel?: string;
        obvs?: string;
        ant?: string;
        cond?: string;
        studies?: string;
        studies_grade?: string;
        area?: string;
        disp?: string;
    } = {};

    if (!name) {
        errors.name = "Introduzca nombre y apellido";
    }

    if (!DNI || DNI.length !== 8) {
        errors.DNI = "Introduzca un DNI valido, sin puntos";
    }

    if (!birth) {
        errors.birth = "Introduzca una fecha de nacimiento";
    } else if (!(birth instanceof Date)) {
        errors.birth = "Introduzca una fecha valida";
    }

    if (kids < 0) {
        errors.kids = "Ingrese un número valido de hijos";
    }

    if (!address) {
        errors.address = "Ingrese un domicilio";
    }

    if (!tel) {
        errors.tel = "Ingrese un número de teléfono";
    }

    if (!ant) {
        errors.ant = "Ingrese la antigüedad";
    }

    if (!cond) {
        errors.cond = "Seleccione una condición";
    }

    if (!studies) {
        errors.studies = "Seleccione un nivel de estudios";
    }

    if (!area) {
        errors.area = "Seleccione un area";
    }

    if (!disp) {
        errors.disp = "Ingrese la disponibilidad horaria";
    }

    return Object.keys(errors).length ? errors : null;
}
