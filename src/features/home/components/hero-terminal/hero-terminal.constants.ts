type TerminalStep = {
	command: string;
	output: string[];
};

export const TERMINAL_HOST = 'mateusz@ubuntu';

export const TERMINAL_SESSION: TerminalStep[] = [
	{ command: 'whoami', output: ['mateusz'] },
	{ command: 'lsb_release -ds', output: ['Ubuntu 24.04 LTS'] },
	{
		command: 'sudo apt update && sudo apt upgrade -y',
		output: ['All packages are up to date.'],
	},
	{ command: 'ls ~/projects', output: ['powertask  shiftflow  printforge'] },
	{
		command: 'cd ~/projects/shiftflow && git pull',
		output: ['Already up to date.'],
	},
	{ command: 'npm run build', output: ['✓ Compiled successfully'] },
];

export const TYPE_DELAY_MILLISECONDS = 45;
export const TYPE_JITTER_MILLISECONDS = 40;
export const AFTER_COMMAND_DELAY_MILLISECONDS = 350;
export const AFTER_STEP_DELAY_MILLISECONDS = 900;
export const RESTART_DELAY_MILLISECONDS = 6000;
export const START_DELAY_MILLISECONDS = 600;
