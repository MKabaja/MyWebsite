export const languageSwitchStyles = {
	group: 'flex items-center gap-2',
	separator: 'text-inherit opacity-50',
	language:
		'mouse-sm max-lg:min-h-11 max-lg:min-w-11 cursor-pointer text-inherit uppercase transition-opacity disabled:cursor-default',
	languageCurrent: 'opacity-100',
	languageOther: 'opacity-60 hover:opacity-100',
} satisfies Record<string, string>;
