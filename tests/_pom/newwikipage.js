/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

const GitHubPage = require( './githubpage' );
const Editor = require( './editor' );

class NewWikiPage extends GitHubPage {
	constructor() {
		super( 'wiki/_new' );
	}

	/**
	 * @param title {String}
	 * @return {Promise<void>}
	 */
	async setTitle( title ) {
		const page = this.browserPage;
		await page.type( '[name="wiki[name]"]', title );
	}

	/**
	 * @returns {Promise<MainEditor>}
	 */
	async getMainEditor() {
		const selector = 'form[name="gollum-editor"][data-github-writer-id]';

		// Wait for the editor to be created.
		await this.browserPage.waitFor( selector, { visible: true } );

		return await this.getEditorByRoot( selector, MainEditor );
	}

	/**
	 * @returns {Promise<NewWikiPage>}
	 */
	static async getPage() {
		return GitHubPage.getPage.call( this );
	}
}

module.exports = NewWikiPage;

class MainEditor extends Editor {

	/**
	 *
	 * @return {Promise<WikiPage>}
	 */
	async submit() {
		await this.page.waitForNavigation( super.submit() );
		return await GitHubPage.getCurrentPage();
	}
}
