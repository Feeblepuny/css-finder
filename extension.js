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

			const selectRegexp = new RegExp(`${selection}`);

			if(!selection) {
				return null;
			}

			const cssFiles = await vscode.workspace.findFiles('**/*.css');
			
	
			for(const oneFile of cssFiles){
				const cssText = await vscode.workspace.openTextDocument(oneFile);
				const text = cssText.getText();


				if(text.search(selectRegexp)){
					console.log("found")
				} else {
					console.log("no findings :(")
					vscode.window.showInformationMessage(`Found no elements named: ${selectRegexp}!`);
				};
				
				return new vscode.Location(oneFile, cssText.positionAt(1));

			}
					
		}});

	context.subscriptions.push(provider);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate,
}
