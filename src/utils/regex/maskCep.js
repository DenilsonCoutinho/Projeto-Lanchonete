export default function maskCep(cep) {
    return cep.replace(/[^0-9]/g, '').replace(/(\d{5})(\d{3})/, '$1-$2');
}