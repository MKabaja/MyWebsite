export type ContactField = 'name' | 'email' | 'subject' | 'message';

export type ValidationError =
	| 'empty'
	| 'tooShort'
	| 'illegalChar'
	| 'invalidEmail'
	| 'messageTooShort';
