import { type ZodError, z } from 'zod';

type TreeifiedZodError = {
	errors: unknown[];
	properties?: Record<string, TreeifiedZodError>;
	items?: Array<TreeifiedZodError | undefined>;
};

function humanizeEnvError(message: string) {
	if (message.includes('expected string, received undefined')) {
		return 'variável obrigatória não informada';
	}

	if (message.includes('expected number, received undefined')) {
		return 'variável numérica obrigatória não informada';
	}

	if (message.includes('expected boolean, received undefined')) {
		return 'variável booleana obrigatória não informada';
	}

	if (message.includes('received undefined')) {
		return 'variável obrigatória não informada';
	}

	return message;
}

function formatTreeifiedZodError(
	tree: TreeifiedZodError,
	parentPath = ''
): string[] {
	const lines: string[] = [];

	for (const error of tree.errors) {
		const path = parentPath || 'ENV';
		lines.push(`- ${path}: ${humanizeEnvError(String(error))}`);
	}

	if (tree.properties) {
		for (const [key, value] of Object.entries(tree.properties)) {
			const path = parentPath ? `${parentPath}.${key}` : key;
			lines.push(...formatTreeifiedZodError(value, path));
		}
	}

	if (tree.items) {
		tree.items.forEach((value, index) => {
			if (!value) return;

			const path = `${parentPath}[${index}]`;
			lines.push(...formatTreeifiedZodError(value, path));
		});
	}

	return lines;
}

export function formatEnvValidationError(error: ZodError) {
	const tree = z.treeifyError(error) as TreeifiedZodError;
	const formattedErrors = formatTreeifiedZodError(tree);

	return [
		'Configuração de ambiente inválida!',
		'',
		'Foram encontrados os seguintes problemas:',
		...formattedErrors.map(line => `  ${line}`),
		'',
		'Por favor, verifique seu arquivo .env e tente novamente.',
	].join('\n');
}