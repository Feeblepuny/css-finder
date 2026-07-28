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
			
	
				cssFiles.forEach(async (fileUri) => {
					const cssText = await vscode.workspace.openTextDocument(fileUri);
					const text = cssText.getText();
	
					const search = new RegExp(`${text}`).toString();
					
					console.log(search);

					if(selectRegexp.test(search)){
						console.log("found")
					} else {
						console.log("no findings :(")
					};

				});
				
				
			
			console.log(selection);
		}});

	context.subscriptions.push(provider);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate,
}
