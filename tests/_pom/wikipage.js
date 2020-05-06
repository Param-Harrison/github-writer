/*
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

const GitHubPage = require( './githubpage' );
const util = require( './util' );

class WikiPage extends GitHubPage {
	constructor( name ) {
		super( 'wiki/' + name );
	}

	/**
	 * @return {Promise<String>}
	 */
	async getContentHtml() {
		return await this.browserPage.evaluate( () => {
			const element = document.querySelector( '.markdown-body' );
			return element.innerHTML.replace( /^\s+|\s+$/g, '' );
		} );
	}

	/**
	 * @return {Promise<GitHubPage>}
	 */
	async deleteWiki() {
		// Click the editor button.
		await this.browserPage.click( '.gh-header-actions :nth-child(2)' );

		// Wait for the delete button.
		await this.browserPage.waitFor( '.btn-danger' );

		// Click the button and confirm the alert dialog.
		await this.waitForNavigation(
			util.waitForDialog( this ).accept(),
			this.browserPage.click( '.btn-danger' )
		);

		return await GitHubPage.getCurrentPage();
	}
}

module.exports = WikiPage;

GitHubPage.addUrlResolver( url => {
	const [ , name ] = url.match( /\/wiki\/([^/]+)$/ ) || [];

	if ( name ) {
		return new WikiPage( name );
	}
} );

