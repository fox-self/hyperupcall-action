import * as fs from 'fs'

import * as core from '@actions/core'
import Handlebars from 'handlebars'

const input = core.getInput('what')
console.log('input', input)

const repo = {
	owner: {
		username: 'hyperupcall',
		name: 'Edwin Kofler',
		email: 'edwin@kofler.dev',
	},
	name: 'bash-object',
	description: 'Description',
}

const ctx = {
	url: {
		api: `https://api.github.com/repos/${repo.owner.username}/${repo.name}`,
		site: `https://${repo.owner.username}.github.io/${repo.name}`,
		repo: `https://github.com/${repo.owner.username}/${repo.name}`,
	},

	docsDirInput: 'docs',
	docsDirOutput: 'site',

	gitRemote: 'origin',
	branchStart: 'main',
	branchEnd: 'site',
	repo,

	options: {
		mkdocs: {
			theme: {
				name: 'readthedocs',
				locale: 'en',
			},
			use_directory_urls: true,
			strict: false,
		},
	},
}

await renderTemplate('mkdocs', ctx)

async function renderTemplate(
	/** @type {string} */ templateName,
	/** @type {Record<string, unknown>} */ ctx
) {
	const inputFile = `./configs/${templateName}.yml.hbs`
	const outputFile = `./configs/${templateName}.yml`

	const inputText = await fs.promises.readFile(inputFile, 'utf-8')

	const template = Handlebars.compile(inputText, {
		noEscape: true,
		strict: true,
	})
	const outputText = template({ ctx })

	await fs.promises.writeFile(outputFile, outputText)
}
