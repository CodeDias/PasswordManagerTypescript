import * as inquirer from 'inquirer';
import { Credential } from '../models/credential';

export class Senhamestre {
    /**
     * Mostra o menu principal e retorna a opção escolhida pelo usuário.
     */
    async showSenhaMestre(): Promise<string> {


        const { mestre = "123"} = await inquirer.prompt([
            { //defina mestre como "123"
                type: 'input',
                name: 'mestre',
                message: 'Digite a senha mestre para acessar',
                mask: '•',
            },
        ])
        return mestre;
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