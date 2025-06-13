import { PasswordService } from './services/passwordService';
import { UIService } from './services/uiService';
import { Senhamestre } from './services/senhamestre';
import * as chalk from 'chalk';

class PasswordManager {
    private passwordService = new PasswordService();
    private uiService = new UIService();
    private senhamestre = new Senhamestre();

    // INICIA LOOP APP
    async run() {
        console.log(chalk.blue('Bem-vindo ao Gerenciador de Senhas! 🔑'));

        console.log('\n');
        
        const senha = await this.senhamestre.showSenhaMestre();

        if (senha !== '123') {
            console.log(chalk.red('Senha mestre incorreta. Tente novamente.'));
            //retornar para tentar senha novamente
            console.log('\n');
            console.log(chalk.blue('Deseja tentar novamente? (S/N)'));
            const tentar = await this.senhamestre.askForConfirmation('Tente novamente?');
            if (!tentar) {
                console.clear();
                console.log(chalk.green('Obrigado por usar o gerenciador. Até logo!'));
                return;
            }
            await this.run();
        }else{

        while (true) {
            const option = await this.uiService.showMainMenu();
            console.log('\n');

            switch (option) {
                case 'create':
                    await this.createPassword();
                    break;
                case 'list':
                    this.listPasswords();
                    break;
                case 'edit':
                    await this.editPassword();
                    break;
                case 'delete':
                    await this.deletePassword();
                    break;
                case 'exit':
                    console.log(chalk.green('Obrigado por usar o gerenciador. Até logo!'));
                    return;
            }
            console.log('\n');
        }
    }
}

    // CRIAÇÃO DE NOVA SENHA
    private async createPassword() {
        const credentials = await this.uiService.askForCredentialDetails();
        if (credentials.service && credentials.login && credentials.password) {
            this.passwordService.saveCredential(credentials);
            console.log(chalk.green(`Senha para o serviço "${credentials.service}" salva com sucesso!`));
        } else {
            console.log(chalk.red('Operação cancelada. Todos os campos são necessários.'));
        }
    }

    // LISTAR SENHAS 
    private listPasswords() {
        const credentials = this.passwordService.getCredentials();
        if (credentials.length === 0) {
            console.log(chalk.yellow('Nenhuma senha salva.'));
            return;
        }
        console.log(chalk.blue('--- Suas Credenciais ---'));
        credentials.forEach(c => {
            console.log(`› Serviço: ${chalk.blue(c.service)} | Login: ${c.login} | Tipo: ${c.tipo} | Senha: ${c.password}`);
        });
    }

    // EDITAR SENHA
    private async editPassword() {
        const allCredentials = this.passwordService.getCredentials();
        const serviceToEdit = await this.uiService.askToChooseCredential(allCredentials);

        if (serviceToEdit) {
            const credentialToEdit = allCredentials.find(c => c.service === serviceToEdit)!;
            console.log(chalk.yellow(`\nEditando credencial para "${serviceToEdit}"...`));
            
            const updatedCredentials = await this.uiService.askForCredentialDetails(credentialToEdit);

            if (updatedCredentials.password) {
                this.passwordService.editCredential(serviceToEdit, updatedCredentials);
                console.log(chalk.green(`Credencial para "${serviceToEdit}" atualizada com sucesso!`));
            } else {
                console.log(chalk.red('A nova senha não pode ser vazia. Operação cancelada.'));
            }
        }
    }

    // EXCLUIR SENHA
    private async deletePassword() {
        console.log(chalk.red('--- Apagar Senha ---'));
        try {
            const allCredentials = this.passwordService.getCredentials();
            const serviceToDelete = await this.uiService.askToChooseCredential(allCredentials);

            if (serviceToDelete) {
                const confirmed = await this.uiService.askForConfirmation(
                    `Você tem CERTEZA que quer apagar a senha do serviço "${serviceToDelete}"? Essa ação não pode ser desfeita.`
                );

                if (confirmed) {
                    this.passwordService.deleteCredential(serviceToDelete);
                    console.log(chalk.green(`Senha para "${serviceToDelete}" apagada com sucesso!`));
                } else {
                    console.log(chalk.yellow('Operação cancelada.'));
                }
            }
        } catch (error: any) {
            console.error(chalk.red(`\nErro ao apagar senha: ${error.message}`));
        }
    }
}

// RODAR APP
const manager = new PasswordManager();
manager.run();