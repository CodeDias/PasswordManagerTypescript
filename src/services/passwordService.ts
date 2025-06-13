import * as fs from 'fs';
import * as chalk from 'chalk';
import { Credential } from '../models/credential';

const DB_FILE = 'passwords.json';

export class PasswordService {
    
    private encode = (str: string): string => Buffer.from(str).toString('base64');
    private decode = (str: string): string => Buffer.from(str, 'base64').toString('utf-8');

    // Lê todas as credenciais do arquivo e as retorna descriptografadas.

    getCredentials(): Credential[] {
        if (!fs.existsSync(DB_FILE)) {
            return [];
        }
        const fileContent = fs.readFileSync(DB_FILE, 'utf-8');
        const credentials: Credential[] = JSON.parse(fileContent);

        return credentials.map(c => ({
            ...c,
            password: this.decode(c.password!),
        }));
    }

    // Salva a lista completa de credenciais no arquivo, criptografando as senhas.

    private saveAllCredentials(credentials: Credential[]): void {
        const encryptedCredentials = credentials.map(c => ({
            ...c,
            password: this.encode(c.password!),
        }));
        fs.writeFileSync(DB_FILE, JSON.stringify(encryptedCredentials, null, 2));
    }

    // SALVA NOVA CREDENCIAL

    saveCredential(newCredential: Credential): void {
        this.checkForWeakPassword(newCredential.password!);
        const credentials = this.getCredentials();
        credentials.push(newCredential);
        this.saveAllCredentials(credentials);
    }

    // Edita uma credencial existente.
    editCredential(serviceName: string, updatedData: Credential): void {
        this.checkForWeakPassword(updatedData.password!);
        const credentials = this.getCredentials();
        const credentialIndex = credentials.findIndex(c => c.service === serviceName);
        
        if (credentialIndex > -1) {
            credentials[credentialIndex] = updatedData;
            this.saveAllCredentials(credentials);
        }
    }

    // Apaga uma credencial com base no nome do serviço.
    deleteCredential(serviceNameToDelete: string): void {
        const credentials = this.getCredentials();
        const updatedCredentials = credentials.filter(c => c.service !== serviceNameToDelete);

        if (credentials.length === updatedCredentials.length) {
            throw new Error(`Serviço "${serviceNameToDelete}" não encontrado.`);
        }

        this.saveAllCredentials(updatedCredentials);
    }
    
    // Alerta simples para senhas fracas.
    private checkForWeakPassword(password: string): void {
        if (password.length < 8) {
            console.warn('⚠️ Alerta: Senha fraca! Considere usar uma senha com 8 ou mais caracteres.');
        }
    }
}