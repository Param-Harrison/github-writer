/**
 * @license Copyright (c) 2003-2020, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

import PageManager from './pagemanager';

/**
 * Controls the application execution.
 */
export default class App {
	/**
	 * Runs the application in the page.
	 *
	 * The job of the application can be defined in this few steps:
	 *   1. Find the main markdown editor available in the page, if any, and inject a RTE editor around it.
	 *   2. Setup triggers in the page so RTE editors are created on demand (e.g. when editing comments).
	 *   3. Quit silently, letting the editor do its job.
	 *
	 * Just a single call to run is allowed. Any subsequent call will result in error. Without any interference in the page.
	 *
	 * @returns {Promise<Editor>} A promise which resolves once the main editor injected in the page is ready.
	 */
	static run() {
		// Control if run() has been already called earlier.
		if ( App.pageManager ) {
			throw new Error( 'The application is already running.' );
		}

		App.pageManager = new PageManager();

		return App.pageManager.init();
	}
}
