const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	console.log('Up and running!');

	const provider = vscode.languages.registerDefinitionProvider({ scheme: 'file', language: 'html' }, {
		async provideDefinition(document, position, token) {
			const range = document.getWordRangeAtPosition(position);
			const selection = document.getText(range);

			if(!selection) {
				return null;
			}

			const cssFiles = await vscode.workspace.findFiles('**/*.css');

			cssFiles.forEach(async (fileUri) => {
				const cssText = await vscode.workspace.openTextDocument(fileUri);
				const rawText = cssText.getText();
				console.log(fileUri.fsPath + " " + rawText);
			})



		}});

	context.subscriptions.push(provider);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate,
}
