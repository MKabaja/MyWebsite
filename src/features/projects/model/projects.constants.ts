import { drivebookProject } from './drivebook.project';
import { linkerProject } from './linker.project';
import { powertaskProject } from './powertask.project';
import type { Project } from './projects.types';
import { shiftflowProject } from './shiftflow.project';

export const projects: Project[] = [
	drivebookProject,
	shiftflowProject,
	linkerProject,
	powertaskProject,
];
