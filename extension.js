const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	const provider = vscode.languages.registerDefinitionProvider({ scheme: 'file', language: 'html' }, {
		async provideDefinition(document, position) {
			const range = document.getWordRangeAtPosition(position);
			const selection = document.getText(range);

			const selectRegexp = new RegExp(`${selection}`);

			if(!selection) {
				return null;
			}

			const cssFiles = await vscode.workspace.findFiles('**/*.css');
	
			for(const oneFile of cssFiles){
				const cssText = await vscode.workspace.openTextDocument(oneFile);
				const text = cssText.getText();
				
				const search = new RegExp(`${text}`).toString();

				if(!selectRegexp.test(search)){
					return null;
				} else {
					const index = search.search(selectRegexp);
	

					return new vscode.Location(oneFile, cssText.positionAt(index));
				}; 
			}
		}});

	context.subscriptions.push(provider);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate,
}
