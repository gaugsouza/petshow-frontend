import { FormControl, Validators } from '@angular/forms';

export const telefoneFormControl = new FormControl('', [
    Validators.required
]);
export const cpfFormControl = new FormControl('', [
    Validators.required
]);
export const nomeFormControl = new FormControl('', [
    Validators.required,
    Validators.min(3)
]);

export const emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email
]);

export const senhaFormControl = new FormControl('', [
    Validators.required,
    Validators.min(8)
]);

export const enderecoFormControl = new FormControl('', [
    Validators.required
]);
