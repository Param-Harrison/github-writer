/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

const util = {
	/**
	 * @param page {GitHubPage}
	 * @return {{accept(): Promise<unknown>}}
	 */
	waitForDialog( page ) {
		const promise = new Promise( resolve => {
			page.browserPage.once( 'dialog', resolve );
		} );
		return {
			accept() {
				return promise.then( dialog => dialog.accept() );
			}
		};
	}
};

module.exports = util;
