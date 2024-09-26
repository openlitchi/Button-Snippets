import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';


export default class SidebarProvider {
    constructor(private readonly extensionUri: vscode.Uri) { }

    async resolveWebviewView(webviewView: vscode.WebviewView) {
        webviewView.webview.options = {
            enableScripts: true,
            localResourceRoots: [this.extensionUri]
        };

        // load html in sidebar
        webviewView.webview.html = await this.getHtmlForWebview(webviewView.webview);

        // 监听消息
        webviewView.webview.onDidReceiveMessage(message => {
            const editor = vscode.window.activeTextEditor!;

            if ("snippets" in message) {
                let text = message.snippets;
                editor.edit((build) => {
                    // 将传回snippets粘贴到编辑器中
                    build.insert(editor.selection.end, text);
                });
            }

            return;
        });

    }

    async getHtmlForWebview(webview: vscode.Webview) {
        // 读取外部html文件
        const filePath = path.join(this.extensionUri.fsPath, 'snippets', 'snippets.html');
        let html = fs.readFileSync(filePath, 'utf8');

        return html;
    }
}