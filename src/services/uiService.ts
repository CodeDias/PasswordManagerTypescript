import * as inquirer from 'inquirer';
import { Credential } from '../models/credential';

export class UIService {
    /**
     * Mostra o menu principal e retorna a opção escolhida pelo usuário.
     */
    async showMainMenu(): Promise<'create' | 'list' | 'edit' | 'delete' | 'exit'> {
        const { option } = await inquirer.prompt([
            {
                type: 'list',
                name: 'option',
                message: 'O que você deseja fazer?',
                choices: [
                    { name: 'Criar nova senha', value: 'create' },
                    { name: 'Listar senhas salvas', value: 'list' },
                    { name: 'Editar uma senha', value: 'edit' },
                    { name: 'Apagar uma senha', value: 'delete' },
                    new inquirer.Separator(),
                    { name: 'Sair', value: 'exit' },
                ],
            },
        ]);
        return option;
    }

    /**
     * Pede ao usuário os detalhes para criar ou editar uma credencial.
     */
    async askForCredentialDetails(defaults: Credential = { service: '', login: '', tipo: '' }): Promise<Credential> {
        return inquirer.prompt([
            {
                type: 'input',
                name: 'service',
                message: 'Nome do serviço (ex: Google, Facebook):',
                default: defaults.service,
            },
            {
                type: 'input',
                name: 'login',
                message: 'Login (ex: seu.email@provedor.com):',
                default: defaults.login,
            },
            {
                type: 'password',
                name: 'password',
                message: 'Senha:',
                mask: '•',
            },
            {
                type: 'input',
                name: 'tipo',
                message: 'Tipo (ex: Email):',
                default: defaults.tipo,
            },
        ]);
    }

    // Pede ao usuário para escolher uma credencial de uma lista.
    async askToChooseCredential(credentials: Credential[]): Promise<string | null> {
        if (credentials.length === 0) {
            console.log('\nNenhuma senha cadastrada para esta ação.');
            return null;
        }
        const { service } = await inquirer.prompt([
            {
                type: 'list',
                name: 'service',
                message: 'Qual credencial você deseja selecionar?',
                choices: credentials.map(c => c.service),
            },
        ]);
        return service;
    }
    
    // Pede uma confirmação Sim/Não ao usuário.

    async askForConfirmation(message: string): Promise<boolean> {
        const { confirmed } = await inquirer.prompt([
            {
                type: 'confirm',
                name: 'confirmed',
                message: message,
                default: false,
            },
        ]);
        return confirmed;
    }
}