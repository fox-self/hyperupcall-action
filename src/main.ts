import * as core from '@actions/core'
import * as github from '@actions/github'

async function run(): Promise<void> {
	try {
		const ms: string = core.getInput('milliseconds')
		console.log(`Waiting ${ms} milliseconds ...`)
		core.setOutput('time', new Date().toTimeString())

		const myToken = core.getInput('myToken')
		console.log('myToken.length', myToken.length)
		const octokit = github.getOctokit(myToken)

		const { data: slug } = await octokit.rest.apps.getAuthenticated()
		console.log(slug)
		// const { data: pullRequest } = await octokit.rest.pulls.get({
		// 	owner: 'octokit',
		// 	repo: 'rest.js',
		// 	pull_number: 123,
		// 	mediaType: {
		// 		format: 'diff',
		// 	},
		// })
		// console.log(pullRequest)
	} catch (error) {
		if (error instanceof Error) {
			core.setFailed(error.message)
		} else {
			core.setFailed('Unknown error')
		}
	}
}

run()
