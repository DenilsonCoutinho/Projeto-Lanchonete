export default function maskCpf(cpf) {
    const cleanCPF = cpf.replace(/\D/g, '');

    // Adiciona a máscara ao CPF
    return cleanCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}