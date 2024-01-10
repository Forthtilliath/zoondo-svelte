/// <reference types="lucia" />
declare global {
	namespace Lucia {
		type Auth = import('$lib/server/lucia').Auth;
		type DatabaseUserAttributes = {
			name: string;
			email: string;
		};
		type DatabaseSessionAttributes = {};
	}
}

export {};
