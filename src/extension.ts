import * as vscode from 'vscode';
import SidebarProvider from './sidebarProvider';
import { refreshSidebar, modifySidebar } from './commandHandlers/sidebarCommands';
import * as fs from 'fs';


export function activate(context: vscode.ExtensionContext) {
    console.log('Extension "Button Snippets" is now active!');

    // 自定义命令
    context.subscriptions.push(
        vscode.commands.registerCommand('button-snippets.refreshSidebar', () => refreshSidebar(context)),
        vscode.commands.registerCommand('button-snippets.modifySidebar', () => modifySidebar(context))
    );

    context.subscriptions.push(
        vscode.window.registerWebviewViewProvider(
            'bottonSnippets',
            new SidebarProvider(context.extensionUri)
        )
    );

}


export function deactivate() {
    console.log('Extension "Button Snippets" is now deactived!');
}
